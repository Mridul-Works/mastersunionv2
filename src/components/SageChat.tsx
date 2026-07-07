import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles } from "lucide-react";

export type SageContext = {
  /** Short label shown in the header, e.g. "Homepage" or "PGP in Tech & Business Mgmt" */
  scope: string;
  /** Preset suggestion chips */
  suggestions: string[];
  /** Dummy answer bank keyed by lowercased keyword match */
  answers: Array<{ match: RegExp; reply: string }>;
  /** Fallback when nothing matches */
  fallback: string;
};

type Msg = { role: "user" | "sage"; text: string };

export function SageChat({
  open,
  onClose,
  context,
}: {
  open: boolean;
  onClose: () => void;
  context: SageContext;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      // seed with a greeting when opening on a new context
      setMessages([
        {
          role: "sage",
          text: `Hi, I'm SAGE. Ask me anything about ${context.scope}. I'll try to keep it brief.`,
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, context.scope]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    const hit = context.answers.find((a) => a.match.test(q.toLowerCase()));
    const reply = hit ? hit.reply : context.fallback;
    window.setTimeout(
      () => {
        setMessages((m) => [...m, { role: "sage", text: reply }]);
        setThinking(false);
      },
      500 + Math.random() * 500,
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-full bg-black text-white">
            <Sparkles className="size-4" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold leading-none">SAGE</p>
            <p className="mt-1 truncate text-[10.5px] uppercase tracking-[0.14em] text-black/50">
              {context.scope}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close SAGE"
          className="grid size-9 place-items-center rounded-full text-black/60 hover:bg-black/5 hover:text-black"
        >
          <X className="size-5" strokeWidth={1.8} />
        </button>
      </header>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto flex max-w-[560px] flex-col gap-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              {m.role === "user" ? (
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-black px-4 py-2.5 text-[14px] leading-relaxed text-white">
                  {m.text}
                </div>
              ) : (
                <div className="max-w-[85%] text-[14.5px] leading-relaxed text-black">
                  {m.text}
                </div>
              )}
            </div>
          ))}
          {thinking && (
            <div className="flex items-center gap-1.5 text-black/50">
              <span className="size-1.5 animate-bounce rounded-full bg-black/40 [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-black/40 [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-black/40" />
            </div>
          )}

          {messages.length <= 1 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {context.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-black/15 bg-white px-3 py-1.5 text-[12.5px] text-black/75 transition hover:bg-black hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-black/10 bg-white px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-3"
      >
        <div className="mx-auto flex max-w-[560px] items-end gap-2 rounded-2xl border border-black/15 bg-white px-3 py-2 focus-within:border-black/40">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder={`Ask SAGE about ${context.scope}…`}
            className="max-h-32 flex-1 resize-none bg-transparent text-[14.5px] outline-none placeholder:text-black/40"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-black text-white disabled:opacity-40"
          >
            <Send className="size-4" strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SageChat;
