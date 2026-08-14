import { useState } from "react";
import { brandLogoUrl, type Brand } from "@/lib/brand-logos";

/**
 * Premium brand mark for a faculty member's primary affiliation.
 * Renders nothing when no logo asset is available so the card layout stays
 * clean rather than showing a broken or distorted image.
 */
export default function BrandLogo({
  brand,
  className = "",
  imgClassName = "h-[clamp(22px,4.2vw,34px)] w-auto max-w-full select-none object-contain opacity-90 grayscale contrast-125",
}: {
  brand: Brand;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = brandLogoUrl(brand.domain, 256);
  if (!src || failed) return null;

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt={`${brand.name} logo`}
        loading="lazy"
        draggable={false}
        onError={() => setFailed(true)}
        className={imgClassName}
      />
    </span>
  );
}
