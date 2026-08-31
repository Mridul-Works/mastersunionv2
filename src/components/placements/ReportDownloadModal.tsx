import { X, Download, Check, ChevronDown } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import modalStudents from "@/assets/modal-students.webp.asset.json";
import report2025 from "@/assets/placement-reports/report-2025.pdf.asset.json";

const MONO = "var(--font-mono-tech)";
const INTER = "var(--font-display)";

/* ------------------------------- context -------------------------------- */

const ReportModalContext = createContext<{ open: () => void }>({ open: () => {} });

export function useReportModal() {
  return useContext(ReportModalContext);
}

/* ------------------------------ field bits ------------------------------ */

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50"
      style={{ fontFamily: MONO }}
    >
      {children}
    </label>
  );
}

const inputClass =
  "w-full border border-white/15 bg-transparent px-4 py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[var(--accent)]";

const EXPERIENCE_OPTIONS = [
  "Less than or equal to 11 months",
  "More than 11 months",
];

const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+65", "+971"];

function ExperienceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const selectedIndex = EXPERIENCE_OPTIONS.indexOf(value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open, value]);

  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) =>
        (current + direction + EXPERIENCE_OPTIONS.length) % EXPERIENCE_OPTIONS.length,
      );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(EXPERIENCE_OPTIONS[activeIndex] ?? EXPERIENCE_OPTIONS[0]);
      else setOpen(true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id="rpr-exp"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="rpr-exp-options"
        aria-activedescendant={open ? `rpr-exp-${activeIndex}` : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
        className={`${inputClass} flex cursor-pointer items-center justify-between bg-[#0B1215] pr-4 text-left ${
          value ? "text-white" : "text-white/30"
        }`}
      >
        <span>{value || "Select your experience"}</span>
        <ChevronDown
          className={`size-3.5 shrink-0 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id="rpr-exp-options"
          role="listbox"
          aria-label="Current Total Work Experience"
          className="absolute inset-x-0 top-[calc(100%+4px)] z-30 max-h-56 overflow-y-auto border border-white/15 bg-[#0B1215] shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
        >
          {EXPERIENCE_OPTIONS.map((option, index) => {
            const selected = option === value;
            return (
              <button
                id={`rpr-exp-${index}`}
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(option)}
                className={`experience-option flex w-full items-center justify-between px-4 py-2.5 text-left text-[14px] transition-colors duration-200 focus:outline-none ${
                  selected || activeIndex === index ? "bg-accent text-black" : "bg-[#0B1215] text-white"
                }`}
              >
                <span>{option}</span>
                {selected && <Check className="size-3.5" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------------------- modal --------------------------------- */

function ReportModal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  /* entrance */
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  /* scroll lock + escape */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setVisible(false);
    window.setTimeout(onClose, 320);
  }, [closing, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !experience) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    window.open(report2025.url, "_blank", "noopener");
    requestClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Download placement report"
      className={`placements-ug-v2 fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ease-out md:p-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* backdrop */}
      <button
        aria-label="Close"
        onClick={requestClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-md"
      />

      {/* panel */}
      <div
        className={`report-modal-outer relative grid w-full max-w-[880px] grid-cols-1 overflow-hidden p-3 gap-3 transition-all duration-300 ease-out md:grid-cols-[38%_62%] ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.97] opacity-0"
        }`}
        style={{ fontFamily: INTER }}
      >
        {/* close */}
        <button
          onClick={requestClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center border border-white/15 text-white/60 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <X className="size-4" />
        </button>

        {/* left: image area */}
        <div className="report-modal-inner report-modal-image relative hidden min-h-[420px] overflow-hidden md:block">
          <img
            src={modalStudents.url}
            alt="Masters' Union student reading on campus"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/12" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 via-45% to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div
              className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]"
              style={{ fontFamily: MONO }}
            >
              Placement report
            </div>
            <p className="text-[20px] font-medium leading-snug text-white">
              Five cohorts. Audited, published, <em className="font-serif-italic">verified.</em>
            </p>
          </div>
        </div>

        {/* right: form */}
        <div className="report-modal-inner px-6 py-8 md:px-10 md:py-10">
          <div
            className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50"
            style={{ fontFamily: MONO }}
          >
            Careers · Masters&apos; Union
          </div>
          <h3 className="text-[26px] font-medium leading-tight tracking-[-0.01em] text-white md:text-[30px]">
            Download the <em className="font-serif-italic">placement report.</em>
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-white/60">
            Tell us a little about yourself and the full audited report is yours.
          </p>

          <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
            <div>
              <FieldLabel htmlFor="rpr-name">Full Name*</FieldLabel>
              <input
                id="rpr-name"
                ref={firstFieldRef}
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel htmlFor="rpr-email">Email Id*</FieldLabel>
              <input
                id="rpr-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel htmlFor="rpr-phone">Mobile Number*</FieldLabel>
              <div className="flex gap-2">
                <select
                  aria-label="Country code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`${inputClass} w-[92px]! shrink-0 cursor-pointer appearance-none bg-[#0B1215] text-center`}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c} value={c} className="bg-[#0B1215]">
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  id="rpr-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="rpr-exp">Current Total Work Experience*</FieldLabel>
              <ExperienceSelect value={experience} onChange={setExperience} />
            </div>

            {error && (
              <p className="text-[12px] tracking-wide text-[var(--accent)]" role="alert">
                {error}
              </p>
            )}

            <div className="pt-1">
              <button
                type="submit"
                className="hero-sweep-button group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-white px-8 py-4.5 text-[11px] uppercase tracking-[0.22em] text-black"
                style={{ fontFamily: MONO }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 z-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span className="hero-sweep-button-content relative z-10 inline-flex items-center gap-2 transition-colors duration-500">
                  <Download className="size-3.5 transition-all duration-500 group-hover:translate-y-0.5" />
                  Download report
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- provider ------------------------------- */

export function ReportModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <ReportModalContext.Provider value={{ open }}>
      {children}
      {isOpen && <ReportModal onClose={close} />}
    </ReportModalContext.Provider>
  );
}
