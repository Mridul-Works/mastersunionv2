import { useState } from "react";
import { brandLogoUrl, type Brand } from "@/lib/brand-logos";

/**
 * Small, premium brand mark for a faculty member's primary affiliation.
 * Renders nothing when no logo asset is available so the card layout stays
 * clean rather than showing a broken or distorted image.
 */
export default function BrandLogo({ brand, className = "" }: { brand: Brand; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = brandLogoUrl(brand.domain, 128);
  if (!src || failed) return null;

  return (
    <span
      className={`inline-flex h-8 max-w-[132px] items-center justify-center rounded-[5px] border border-white/12 bg-white/[0.06] px-2.5 ${className}`}
    >
      <img
        src={src}
        alt={`${brand.name} logo`}
        loading="lazy"
        draggable={false}
        onError={() => setFailed(true)}
        className="h-4 w-auto max-w-full select-none object-contain opacity-80 grayscale contrast-125"
      />
    </span>
  );
}
