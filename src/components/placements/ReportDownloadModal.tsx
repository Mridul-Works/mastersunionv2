import { X, Download, ArrowUpRight } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import cover2025 from "@/assets/placement-reports/cover-2025.png.asset.json";
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
  "Fresher",
  "0 – 1 year",
  "1 – 3 years",
  "3 – 5 years",
  "5 – 8 years",
  "8+ years",
];

const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+65", "+971"];

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
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ease-out md:p-8 ${
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
        className={`relative grid w-full max-w-[880px] grid-cols-1 overflow-hidden border border-white/12 bg-[#0B1215] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out md:grid-cols-[38%_62%] ${
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
        <div className="relative hidden min-h-[420px] overflow-hidden bg-black/40 md:block">
          <img
            src={cover2025.url}
            alt="Placement report preview"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215] via-transparent to-transparent" />
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
        <div className="px-6 py-8 md:px-10 md:py-10">
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
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="rpr-exp">Current Total Work Experience*</FieldLabel>
              <div className="relative">
                <select
                  id="rpr-exp"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className={`${inputClass} cursor-pointer appearance-none bg-[#0B1215] pr-10 ${
                    experience ? "text-white" : "text-white/30"
                  }`}
                >
                  <option value="" disabled className="bg-[#0B1215]">
                    Select your experience
                  </option>
                  {EXPERIENCE_OPTIONS.map((o) => (
                    <option key={o} value={o} className="bg-[#0B1215] text-white">
                      {o}
                    </option>
                  ))}
                </select>
                <ArrowUpRight className="pointer-events-none absolute right-4 top-1/2 size-3.5 -translate-y-1/2 rotate-135 text-white/40" />
              </div>
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
