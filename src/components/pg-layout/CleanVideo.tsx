import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

/**
 * Poster tile that opens the YouTube video in a lightbox popup on click.
 * Nothing is embedded until the user opens the dialog.
 */
export function CleanVideo({
  videoId,
  className = "",
  title = "Video",
  poster,
  hidePlayButton = false,
}: {
  videoId: string;
  className?: string;
  title?: string;
  poster?: string;
  hidePlayButton?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play ${title}`}
        className={`group relative block overflow-hidden bg-black ${className}`}
      >
        {poster && (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            width={1280}
            height={720}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        {!hidePlayButton && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
            <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 size-4 fill-current" strokeWidth={1} />
            </span>
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-white/90 text-black"
          >
            <X className="size-4" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="aspect-video w-full max-w-[1000px] overflow-hidden bg-black shadow-2xl"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </div>
        </div>
      )}
      </>
  );
}
