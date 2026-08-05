import { Reveal } from "@/components/pg-layout/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pgpFaq as faq } from "@/lib/pgp-tbm-content";

export function PgFaq() {
  return (
    <section id="faq" className="relative scroll-mt-24 section-edge py-12 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <Reveal>
            <p className="eyebrow text-bottle">{faq.eyebrow}</p>
            <h2 className="mt-3 font-display text-[clamp(1.55rem,3.2vw,2.4rem)] font-semibold leading-[1.04]">
              {faq.title[0]}
              <span className="text-gradient-brand"> {faq.title[1]}</span>
            </h2>
          </Reveal>

          <Reveal delay={60}>
            <Accordion type="single" collapsible defaultValue="faq-0" className="flex flex-col">
              {faq.items.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${i}`}
                  className="border-b border-bottle/30 bg-transparent first:border-t first:border-t-bottle/30"
                >
                  <AccordionTrigger className="py-5 text-left hover:no-underline">
                    <span className="flex min-w-0 items-baseline gap-4 pr-2">
                      <span className="font-tech text-[10px] tracking-[0.24em] text-bottle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[15px] font-semibold leading-snug sm:text-[17px]">
                        {item.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="max-w-2xl pb-6 pl-9 text-[13px] leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
