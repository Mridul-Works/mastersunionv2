import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import logoWhite from "@/assets/logo-2.png.asset.json";

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="min-w-0 md:col-span-2 lg:col-span-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[11px] sm:tracking-[0.22em]">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="block text-[12px] leading-snug text-white/70 transition-colors hover:text-white sm:text-[13px]">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PlacementsFooter() {
  return (
    <footer className="border-t border-black/10 bg-black pb-[max(5.5rem,env(safe-area-inset-bottom))] text-white md:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 py-9 sm:px-6 sm:py-11 md:px-10 md:py-12">
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:grid-cols-12 md:gap-x-6 md:gap-y-10">
          <div className="col-span-2 border-b border-white/10 pb-8 sm:col-span-3 md:col-span-5 md:border-b-0 md:pb-0">
            <img
              decoding="async"
              loading="lazy"
              src={logoWhite.url}
              alt="Masters' Union"
              className="h-8 w-auto brightness-0 invert sm:h-10 md:h-12"
            />
            <p className="mt-5 max-w-sm text-[12px] leading-relaxed text-white/55 sm:mt-6 sm:text-[13px]">
              DLF Cyberpark, Phase III
              <br />
              Gurugram 122002, India
              <br />
              hello@mastersunion.org
            </p>
            <div className="mt-5 flex items-center gap-2.5 sm:mt-6">
              {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={["Instagram", "LinkedIn", "YouTube", "X"][i]}
                  className="flex size-10 shrink-0 items-center justify-center rounded-none border border-white/15 text-white/60 transition-colors hover:border-white hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Programs"
            links={[
              "PGP in Tech & Business Management",
              "PGP in Quantitative Finance",
              "UG in Tech & Business Management",
              "Executive Programs",
            ]}
          />
          <FooterCol
            title="Campus"
            links={["Faculty", "Mentors", "Outclass", "Food Lab", "MU Ventures"]}
          />
          <FooterCol
            title="Connect"
            links={["Admissions", "Press & Media", "Careers at MU", "Brochure (PDF)"]}
          />
        </div>

        <div className="mt-9 grid gap-4 border-t border-white/10 pt-6 text-[9px] uppercase leading-relaxed tracking-[0.16em] text-white/40 sm:text-[10px] md:mt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 md:pt-7 md:text-[11px] md:tracking-[0.18em]">
          <span className="min-w-0">&copy; 2026 Masters&apos; Union Education Pvt. Ltd.</span>
          <div className="flex min-w-0 flex-wrap gap-x-5 gap-y-2 md:justify-end">
            <a href="#" className="hover:text-white/80">
              Privacy
            </a>
            <a href="#" className="hover:text-white/80">
              Terms
            </a>
            <a href="#" className="hover:text-white/80">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PlacementsFooter;
