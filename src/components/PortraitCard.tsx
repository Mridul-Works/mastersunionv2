import type { ReactNode } from "react";

const SERIF = "'Fraunces', 'Times New Roman', serif";

type Props = {
  name: string;
  img?: string;
  chip?: string;
  variant?: number;
  className?: string;
};

function scribble(v: number): ReactNode {
  switch (v % 6) {
    case 0:
      // circle loop
      return (
        <path
          d="M55,140 C35,70 140,35 190,70 C240,105 220,190 145,200 C75,210 50,155 65,120 C80,88 145,80 185,115"
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
        />
      );
    case 1:
      // squiggle underline
      return (
        <path
          d="M25,195 Q55,155 90,195 T160,195 T225,195"
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
        />
      );
    case 2:
      // bracket frame
      return (
        <>
          <path d="M40,35 L20,35 L20,220 L45,220" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M200,35 L220,35 L220,220 L195,220" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 3:
      // star burst
      return (
        <path
          d="M180,60 L200,90 M200,60 L180,90 M188,50 L192,100 M165,75 L215,75"
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
        />
      );
    case 4:
      // zigzag lightning
      return (
        <path
          d="M30,180 L70,140 L110,185 L150,140 L195,190 L225,155"
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    default:
      // spiral scribble
      return (
        <path
          d="M120,120 m-70,0 a70,70 0 1,0 140,0 a70,70 0 1,0 -140,0 M120,120 m-40,0 a40,40 0 1,0 80,0"
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
        />
      );
  }
}

export function PortraitCard({ name, img, chip = "MU", variant = 0, className = "" }: Props) {
  const initials = name
    .replace(/^(Dr|Captain|Prof)\s+/i, "")
    .replace(/^@/, "")
    .split(/[\s.·&·]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`relative aspect-square w-full overflow-hidden bg-[#ececec] ${className}`}>
      {img ? (
        <img
          src={img}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.04em] text-black/25"
          style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500 }}
        >
          {initials}
        </div>
      )}

      {/* Handwritten-style name, top-left */}
      <div
        className="pointer-events-none absolute left-3 top-2.5 z-10 max-w-[70%] leading-[0.92]"
        style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500 }}
      >
        <div className="text-[clamp(1rem,1.7vw,1.35rem)] text-black">{name}</div>
      </div>

      {/* MU chip, top-right */}
      <div
        className="pointer-events-none absolute right-2.5 top-2.5 z-10 rounded-sm bg-white/85 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-black/80 backdrop-blur"
      >
        {chip}
      </div>



    </div>
  );
}

export default PortraitCard;
