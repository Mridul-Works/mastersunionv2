import { cn } from "@/lib/utils";

export type GridCard = {
  id: string;
  image?: string;
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  href?: string;
};

function Card({ card }: { card: GridCard }) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
      {card.image ? (
        <div className="aspect-[16/10] w-full overflow-hidden bg-black/5">
          <img
            src={card.image}
            alt={card.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        {card.eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
            {card.eyebrow}
          </p>
        ) : null}

        <h3 className="text-lg font-medium leading-snug tracking-tight text-black md:text-xl">
          {card.title}
        </h3>

        <p className="text-sm leading-relaxed text-black/60 md:text-[0.95rem]">
          {card.description}
        </p>

        {card.actionLabel ? (
          <div className="mt-auto pt-4">
            <a
              href={card.href ?? "#"}
              className="inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black/85 sm:w-auto"
            >
              {card.actionLabel}
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function ResponsiveCardGrid({
  cards,
  title,
  subtitle,
  className,
}: {
  cards: GridCard[];
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  if (!cards.length) {
    return (
      <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
        <div className="grid min-h-[40svh] place-items-center rounded-2xl border border-dashed border-black/15 p-8 text-center text-sm text-black/50">
          Nothing to show here yet.
        </div>
      </div>
    );
  }

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
        {title || subtitle ? (
          <header className="mb-6 grid grid-cols-[minmax(0,1fr)] gap-2 sm:mb-8">
            {title ? (
              <h2 className="truncate text-xl font-medium tracking-tight text-black md:text-2xl lg:text-3xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="max-w-[70ch] text-sm leading-relaxed text-black/55 md:text-base">
                {subtitle}
              </p>
            ) : null}
          </header>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {cards.map((c) => (
            <Card key={c.id} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
