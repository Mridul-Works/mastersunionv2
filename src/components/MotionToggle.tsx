import { useMotionMode } from "@/lib/motion-mode";

/**
 * Small floating control that switches between the full parallax experience and
 * the lighter transform-only mode. Auto-detected on low-end devices; this only
 * lets the visitor override that guess.
 */
export default function MotionToggle({ className = "" }: { className?: string }) {
  const { mode, ready, setMode } = useMotionMode();
  if (!ready) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-[70] flex items-center gap-1 rounded-full border border-white/15 bg-black/70 p-1 text-[0.6rem] uppercase tracking-[0.18em] text-white/60 backdrop-blur-md ${className}`}
      role="group"
      aria-label="Motion quality"
    >
      <span className="hidden pl-2 pr-1 sm:inline">Motion</span>
      {(["full", "lite"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => setMode(m)}
          aria-pressed={mode === m}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            mode === m ? "bg-white text-black" : "text-white/55 hover:text-white"
          }`}
        >
          {m === "full" ? "Full" : "Lite"}
        </button>
      ))}
    </div>
  );
}
