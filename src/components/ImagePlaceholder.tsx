export function ImagePlaceholder({
  label,
  className,
  aspect = "4/3",
}: {
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={
        "flex w-full items-center justify-center border border-black/10 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300" +
        (className ? " " + className : "")
      }
      style={{ aspectRatio: aspect }}
    >
      {label ? (
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
          {label}
        </span>
      ) : (
        <span className="block h-1 w-1 rounded-full bg-black/30" />
      )}
    </div>
  );
}

export function ImagePlaceholderMini({
  label,
  className,
  aspect = "16/9",
}: {
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={
        "flex w-full items-center justify-center border border-black/10 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300" +
        (className ? " " + className : "")
      }
      style={{ aspectRatio: aspect }}
    >
      {label ? (
        <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-black/40">
          {label}
        </span>
      ) : (
        <span className="block h-0.5 w-0.5 rounded-full bg-black/30" />
      )}
    </div>
  );
}
