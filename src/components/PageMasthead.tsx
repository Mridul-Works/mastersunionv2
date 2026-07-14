const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export function PageMasthead({
  title,
  eyebrow = "Masters' Union",
  caption,
}: {
  title: string;
  eyebrow?: string;
  caption?: string;
}) {
  return (
    <section className="w-full border-b border-black/10 bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-8 pt-10 md:px-10 md:pb-14 md:pt-16">
        <div
          className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-black/55"
          style={{ fontFamily: MONO }}
        >
          <span>{eyebrow}</span>
          <span>{new Date().getFullYear()} · Vol. 01</span>
        </div>
        <h1
          className="mt-6 select-none text-balance font-black uppercase leading-[0.82] tracking-[-0.045em] text-black"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "clamp(3.5rem, 15vw, 13rem)",
            fontWeight: 900,
          }}
        >
          {title}
        </h1>
        {caption ? (
          <div className="mt-6 flex items-end justify-between gap-6 border-t border-black/10 pt-4">
            <p
              className="max-w-[46ch] text-[11px] uppercase leading-[1.5] tracking-[0.22em] text-black/60"
              style={{ fontFamily: MONO }}
            >
              {caption}
            </p>
            <span
              className="hidden shrink-0 text-[10px] uppercase tracking-[0.3em] text-black/45 md:inline"
              style={{ fontFamily: MONO }}
            >
              — The Masters' Union
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PageMasthead;
