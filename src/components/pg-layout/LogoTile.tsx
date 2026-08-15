import { cn } from "@/lib/utils";

type Props = {
  name: string;
  src?: string | null;
  /** Visual density of the tile. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Renders a brand logo inside a neutral tile. Falls back to the brand name
 * when no logo asset is mapped for that entry.
 */
export function LogoTile({ name, src, size = "md", className }: Props) {
  return (
    <div
      title={name}
      className={cn(
        "no-img-zoom flex items-center justify-center rounded-[6px] border border-border bg-secondary/30 px-3 transition-colors hover:bg-secondary/60",
        size === "sm" ? "h-12" : size === "lg" ? "h-24" : "h-16",
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          className={cn(
            "w-auto max-w-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100",
            size === "sm" ? "max-h-6" : size === "lg" ? "max-h-12" : "max-h-8",
          )}
        />
      ) : (
        <span className="text-center text-[12px] font-medium text-foreground/80">{name}</span>
      )}
    </div>
  );
}

export default LogoTile;
