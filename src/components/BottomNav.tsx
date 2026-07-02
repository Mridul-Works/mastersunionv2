import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Home, GraduationCap, Users, Building2, Sparkles } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/programmes/pgp-tbm", label: "PGP", icon: GraduationCap },
  { to: "/faculty", label: "Faculty", icon: Users },
  { to: "/campus", label: "Campus", icon: Building2 },
  { to: "/life-at-mu", label: "Life", icon: Sparkles },
] as const;

export function BottomNav({ applyHref = "#apply" }: { applyHref?: string }) {
  const { pathname } = useLocation();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center px-3 pb-3 sm:pb-5">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex w-full max-w-[560px] items-center gap-1 rounded-full border border-black/10 bg-white/85 p-1.5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:max-w-[620px]"
      >
        <ul className="flex flex-1 items-center justify-around gap-0.5">
          {ITEMS.map(({ to, label, icon: Icon }) => {
            const active =
              to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/");
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  className={
                    "group flex flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors " +
                    (active
                      ? "bg-black/5 text-black"
                      : "text-black/55 hover:bg-black/5 hover:text-black")
                  }
                >
                  <Icon className="size-[15px]" strokeWidth={1.75} />
                  <span className="hidden text-[9.5px] sm:inline">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <a
          href={applyHref}
          className="inline-flex items-center gap-1 rounded-full bg-black px-3.5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.03] active:scale-[0.97] sm:px-4"
        >
          Apply
          <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
        </a>
      </nav>
    </div>
  );
}

export default BottomNav;
