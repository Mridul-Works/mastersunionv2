import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";

const MONO = "var(--font-mono)";

const WAVEFORM = [
  6, 12, 9, 18, 24, 14, 30, 20, 11, 26, 34, 17, 9, 21, 29, 13, 8, 19, 27, 15, 10, 23, 31, 16, 7,
  20, 28, 12, 9, 17, 25, 11, 6, 14, 22, 10,
];

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

/** Loads the YouTube IFrame API once per page. */
function loadYouTubeApi() {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve) => {
    if (window.YT?.Player) return resolve();
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(h > 0 ? m : m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Spoken-friendly time for screen readers, e.g. "3 minutes 12 seconds". */
function spoken(seconds: number) {
  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m} minute${m === 1 ? "" : "s"} ${s} second${s === 1 ? "" : "s"}`;
}

/**
 * Podcast player card with a fully keyboard-accessible transport:
 * play/pause button, ±10s skip buttons and a range-slider scrubber.
 */
export function PodcastPlayerCard({
  videoId,
  title,
  eyebrow,
}: {
  videoId: string;
  title: string;
  eyebrow: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const [status, setStatus] = useState("");

  // Poll playback position while a player exists.
  useEffect(() => {
    if (!ready) return;
    const t = window.setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      if (!scrubbing) setCurrent(p.getCurrentTime() ?? 0);
      const d = p.getDuration() ?? 0;
      if (d && d !== duration) setDuration(d);
    }, 250);
    return () => window.clearInterval(t);
  }, [ready, scrubbing, duration]);

  useEffect(() => () => playerRef.current?.destroy(), []);

  const createPlayer = useCallback(async () => {
    if (playerRef.current || !hostRef.current) return;
    setStarted(true);
    await loadYouTubeApi();
    if (!window.YT?.Player || !hostRef.current) return;
    playerRef.current = new window.YT.Player(hostRef.current, {
      videoId,
      playerVars: { autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1 },
      events: {
        onReady: (e: { target: YTPlayer }) => {
          setReady(true);
          setDuration(e.target.getDuration() ?? 0);
          e.target.playVideo();
        },
        onStateChange: (e: { data: number }) => {
          const S = window.YT?.PlayerState;
          if (!S) return;
          if (e.data === S.PLAYING) {
            setPlaying(true);
            setStatus("Playing");
          } else if (e.data === S.PAUSED) {
            setPlaying(false);
            setStatus("Paused");
          } else if (e.data === S.ENDED) {
            setPlaying(false);
            setStatus("Episode ended");
          }
        },
      },
    });
  }, [videoId]);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) {
      void createPlayer();
      return;
    }
    if (playing) p.pauseVideo();
    else p.playVideo();
  }, [createPlayer, playing]);

  const seekTo = useCallback((seconds: number) => {
    const p = playerRef.current;
    if (!p) return;
    const clamped = Math.min(Math.max(0, seconds), duration || seconds);
    p.seekTo(clamped, true);
    setCurrent(clamped);
    setStatus(`Seeked to ${fmt(clamped)}`);
  }, [duration]);

  const skip = useCallback((delta: number) => seekTo(current + delta), [current, seekTo]);

  const pct = duration ? Math.min(100, (current / duration) * 100) : 0;
  const disabled = !ready;

  return (
    <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)]">
      {/* Artwork / player stage */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div ref={hostRef} className="h-full w-full" />
        </div>

        {!started && (
          <button
            type="button"
            onClick={() => void createPlayer()}
            aria-label={`Play podcast: ${title}`}
            className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />

            <span
              className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md"
              style={{ fontFamily: MONO }}
            >
              {eyebrow}
            </span>

            <span className="absolute inset-0 grid place-items-center">
              <span className="relative grid size-[74px] place-items-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition duration-500 group-hover:scale-[1.08] group-hover:bg-white group-hover:text-black">
                <span className="absolute inset-0 rounded-full border border-white/25 transition duration-700 group-hover:scale-125 group-hover:opacity-0" />
                <Play className="ml-0.5 size-5 fill-current" strokeWidth={1} />
              </span>
            </span>

            <span className="absolute bottom-5 left-5 right-5 flex items-end gap-[3px]">
              {WAVEFORM.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-full bg-white/45 transition-colors group-hover:bg-white/70"
                  style={{ height: `${h}px` }}
                />
              ))}
            </span>
          </button>
        )}
      </div>

      {/* Transport chrome — keyboard accessible */}
      <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pause podcast: ${title}` : `Play podcast: ${title}`}
            aria-pressed={playing}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-black text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            {playing ? (
              <Pause className="size-4 fill-current" strokeWidth={1} />
            ) : (
              <Play className="ml-0.5 size-4 fill-current" strokeWidth={1} />
            )}
          </button>

          <button
            type="button"
            onClick={() => skip(-10)}
            disabled={disabled}
            aria-label="Rewind 10 seconds"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-black/15 text-black transition hover:border-black disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <RotateCcw className="size-4" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => skip(10)}
            disabled={disabled}
            aria-label="Forward 10 seconds"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-black/15 text-black transition hover:border-black disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <RotateCw className="size-4" strokeWidth={1.5} />
          </button>

          <div className="min-w-0 flex-1">
            <div className="relative flex h-4 items-center">
              {/* Visual rail */}
              <div className="pointer-events-none absolute inset-x-0 h-[3px] overflow-hidden rounded-full bg-black/10">
                <div className="h-full rounded-full bg-black" style={{ width: `${pct}%` }} />
              </div>
              <div
                className="pointer-events-none absolute top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                style={{ left: `${pct}%` }}
              />
              {/* Native range input: full keyboard seek (arrows, Home/End, PageUp/Down) */}
              <input
                type="range"
                min={0}
                max={Math.max(1, Math.floor(duration))}
                step={1}
                value={Math.floor(current)}
                disabled={disabled}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setCurrent(v);
                  if (scrubbing) return;
                  seekTo(v);
                }}
                onPointerDown={() => setScrubbing(true)}
                onPointerUp={(e) => {
                  setScrubbing(false);
                  seekTo(Number((e.target as HTMLInputElement).value));
                }}
                onKeyUp={(e) => seekTo(Number((e.target as HTMLInputElement).value))}
                aria-label="Seek podcast position"
                aria-valuetext={`${spoken(current)} of ${spoken(duration)}`}
                className="relative z-10 h-4 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent"
                style={{ WebkitTapHighlightColor: "transparent" }}
              />
            </div>
            <div
              className="mt-2 flex items-center justify-between text-[9.5px] uppercase tracking-[0.2em] text-black/45"
              style={{ fontFamily: MONO }}
            >
              <span>{fmt(current)}</span>
              <span>{duration ? `Full episode · ${fmt(duration)}` : "Full episode"}</span>
            </div>
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {status}
        </p>
      </div>
    </div>
  );
}
