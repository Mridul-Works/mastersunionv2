const SERIF = "'Fraunces', 'Times New Roman', serif";

type Props = {
  name: string;
  img?: string;
  chip?: string;
  variant?: number;
  className?: string;
};


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
