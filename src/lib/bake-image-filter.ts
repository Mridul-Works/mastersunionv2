/**
 * Bakes a CSS filter into an image's pixels once, then clears the CSS filter.
 *
 * Why: a `filter` on an element that is transformed every frame (parallax)
 * forces Chrome to re-run the filter pass on every composited frame, which
 * roughly doubles frame cost on large viewports. Baking the exact same
 * contrast/saturate into the bitmap keeps the visual result identical while
 * making scroll frames pure compositor work.
 */
export function bakeImageFilter(img: HTMLImageElement, filter: string): () => void {
  let cancelled = false;
  let objectUrl: string | null = null;

  const run = async () => {
    try {
      if (cancelled || !img.currentSrc) return;
      const source = new Image();
      source.crossOrigin = "anonymous";
      source.decoding = "async";
      source.src = img.currentSrc;
      await source.decode();
      if (cancelled) return;

      const canvas = document.createElement("canvas");
      canvas.width = source.naturalWidth;
      canvas.height = source.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx || !("filter" in ctx)) return;
      ctx.filter = filter;
      ctx.drawImage(source, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/webp", 0.95),
      );
      if (cancelled || !blob) return;

      objectUrl = URL.createObjectURL(blob);
      const baked = new Image();
      baked.decoding = "async";
      baked.src = objectUrl;
      await baked.decode();
      if (cancelled) return;

      // Swap in the pre-toned bitmap and drop the per-frame filter pass.
      img.src = objectUrl;
      img.style.filter = "none";
    } catch {
      // Tainted canvas / unsupported codec: keep the CSS filter as-is.
    }
  };

  if (img.complete && img.naturalWidth > 0) {
    void run();
  } else {
    img.addEventListener("load", () => void run(), { once: true });
  }

  return () => {
    cancelled = true;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  };
}
