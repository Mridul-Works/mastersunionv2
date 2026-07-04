import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  GraduationCap,
  Rocket,
  Briefcase,
  Users,
  Mic,
  ChefHat,
  Building2,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ShoppingCart,
  Bot,
  Coffee,
  UsersRound,
  Footprints,
  Flame,
  Check,
  User,
  X,
} from "lucide-react";



import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

import founderPhoto from "@/assets/founder-pratham-cutout.webp";
import logoWhite from "@/assets/logo-4.png.asset.json";
import pathwaySchool from "@/assets/pathways/school.webp";
import pathwayCollege from "@/assets/pathways/college.webp";
import pathwayWork from "@/assets/pathways/work.webp";
import pathwayOwner from "@/assets/pathways/owner.webp";
import edExecutive from "@/assets/programs/editorial-executive.jpg.asset.json";
import edVentures from "@/assets/programs/editorial-ventures.jpg.asset.json";
import edB2B from "@/assets/programs/editorial-b2b.jpg.asset.json";
import edGlobal from "@/assets/programs/editorial-global.jpg.asset.json";
import edPostgrad from "@/assets/programs/editorial-postgraduate.jpg.asset.json";
import edAI from "@/assets/programs/editorial-ai.jpg.asset.json";
import edImmersions from "@/assets/programs/editorial-immersions.jpg.asset.json";
import edFamily from "@/assets/programs/editorial-family-business.jpg.asset.json";

type Programme = { title: string; duration: string; format: string; href?: string };
type Pathway = {
  key: string;
  label: string;
  headline: string;
  subhead: string;
  programmes: Programme[];
  viewAllHref: string;
  theme: string;
  image: string;
};

const ADMISSIONS_CONNECT_SESSIONS = [
  {
    id: "chai-alum",
    title: "Chai with an Alum",
    tagline: "Honest answers over a casual cup.",
    description: "A recent grad walks you through their first year, the workload, the cohort, and what surprised them.",
    icon: Coffee,
    format: "Virtual",
    duration: "45 min",
    nextDate: "2026-07-08",
    nextTime: "06:00 PM",
    timezone: "IST",
    audience: "Students & parents",
    spotsLeft: 12,
  },
  {
    id: "parents-speak",
    title: "Parents Speak",
    tagline: "Hear it from the families who went through it.",
    description: "Current and past parents share what worried them, how the transition worked, and the ROI they saw.",
    icon: UsersRound,
    format: "Virtual",
    duration: "60 min",
    nextDate: "2026-07-11",
    nextTime: "11:00 AM",
    timezone: "IST",
    audience: "Parents & guardians",
    spotsLeft: 8,
  },
  {
    id: "campus-walk",
    title: "Campus Walkthrough",
    tagline: "See the spaces where the learning happens.",
    description: "A guided tour of the Gurugram campus, labs, studios and hostel blocks — led by a current student.",
    icon: Footprints,
    format: "In-person",
    duration: "90 min",
    nextDate: "2026-07-12",
    nextTime: "10:00 AM",
    timezone: "IST",
    audience: "Prospective students",
    spotsLeft: 15,
  },
  {
    id: "faculty-fireside",
    title: "Faculty Fireside",
    tagline: "A 1:1 conversation with a professor.",
    description: "Bring your doubts about curriculum, careers or specialisation. 15 minutes, no pitch, just clarity.",
    icon: Flame,
    format: "Virtual",
    duration: "30 min",
    nextDate: "2026-07-09",
    nextTime: "05:00 PM",
    timezone: "IST",
    audience: "Serious applicants",
    spotsLeft: 6,
  },
  {
    id: "admissions-office-hours",
    title: "Admissions Office Hours",
    tagline: "A private 1:1 with the admissions team.",
    description: "Bring your application, eligibility, documents or fee questions. No group, no script — just direct answers.",
    icon: User,
    format: "Virtual",
    duration: "20 min",
    nextDate: "2026-07-10",
    nextTime: "04:00 PM",
    timezone: "IST",
    audience: "Applicants",
    spotsLeft: 10,
  },
  {
    id: "cohort-preview",
    title: "Cohort Preview Day",
    tagline: "Sit in a real class and ask the cohort anything.",
    description: "Attend a live session on campus, meet the current batch, and get an honest read on the culture.",
    icon: GraduationCap,
    format: "In-person",
    duration: "120 min",
    nextDate: "2026-07-18",
    nextTime: "10:00 AM",
    timezone: "IST",
    audience: "Serious applicants",
    spotsLeft: 20,
  },
] as const;

type Session = (typeof ADMISSIONS_CONNECT_SESSIONS)[number];

const PATHWAYS: Pathway[] = [
  {
    key: "school",
    label: "I'm in School",
    headline: "School",
    subhead: "For students in Grade 11 & 12 ready to skip the textbook detour and start building.",
    viewAllHref: "https://mastersunion.org/undergraduate",
    theme: "linear-gradient(135deg, #e8f0f5 0%, #d6e6e8 35%, #f0e6d8 70%, #e6d5c5 100%)",
    image: pathwaySchool,
    programmes: [
      { title: "UG in Technology & Business Management", duration: "4 Yrs", format: "On Campus" },
      { title: "UG in Psychology & Marketing", duration: "4 Yrs", format: "On Campus" },
      { title: "UG in Data Science & Artificial Intelligence", duration: "4 Yrs", format: "On Campus" },
      { title: "UG in Finance & Economics (CA/CFA Pathway)", duration: "4 Yrs", format: "On Campus" },
      { title: "UG Programme in Design (MUDS)", duration: "4 Yrs", format: "On Campus" },
      { title: "UG Global Track — Illinois Tech, US", duration: "3+1 Yrs", format: "Dual Campus" },
      { title: "UG Global Track — Griffith University, Australia", duration: "2+2 Yrs", format: "Dual Campus" },
      { title: "Bharat Summer Fellowship", duration: "6 Wks", format: "Travel" },
    ],
  },
  {
    key: "college",
    label: "I'm in College",
    headline: "College",
    subhead: "For undergraduates and fresh graduates trading the placement queue for real ventures.",
    viewAllHref: "https://mastersunion.org/postgraduate",
    theme: "linear-gradient(135deg, #f5e6f0 0%, #f7d9c4 25%, #f8e8d4 50%, #d4e6e0 100%)",
    image: pathwayCollege,
    programmes: [
      { title: "PGP in Technology & Business Management — Young Leaders Cohort", duration: "24 Mo", format: "On Campus" },
      { title: "PGP in Applied AI & Agentic Systems", duration: "15 Mo", format: "On Campus" },
      { title: "PGP in UI/UX & AI Product Design", duration: "12 Mo", format: "On Campus" },
      { title: "PGP in Human Resources & Organisation Strategy", duration: "16 Mo", format: "On Campus" },
      { title: "PGP in Sports Management & Gaming", duration: "16 Mo", format: "On Campus" },
      { title: "PGP in Sustainability & Business Management", duration: "16 Mo", format: "On Campus" },
      { title: "PGP Bharat", duration: "24 Wks", format: "Travel + Hybrid" },
      { title: "PGP TBM Summer School", duration: "Summer Intensive", format: "On Campus" },
    ],
  },
  {
    key: "work",
    label: "I'm at Work",
    headline: "Work",
    subhead: "For working professionals levelling up — without pausing the paycheque.",
    viewAllHref: "https://mastersunion.org/executive-education",
    theme: "linear-gradient(135deg, #e6e8f0 0%, #d4dbe8 40%, #c8d5e8 70%, #b8c9e0 100%)",
    image: pathwayWork,
    programmes: [
      { title: "PGP in Technology & Business Management (flagship)", duration: "16 Mo", format: "On Campus" },
      { title: "PGP Rise: General Management", duration: "1 Yr", format: "Blended Weekend" },
      { title: "PGP Rise: General Management (Global)", duration: "1 Yr", format: "Online" },
      { title: "PGP in Capital Markets & Trading", duration: "1 Yr", format: "Online/In-Person Weekend" },
      { title: "Applied Markets & Bloomberg Equity Research", duration: "12–36 Mo", format: "Blended" },
      { title: "Executive Leadership Programme in AI & GCC Transformation", duration: "6 Mo", format: "Weekend" },
      { title: "AI First Operator Programme", duration: "Short-form", format: "Online/Hybrid" },
    ],
  },
  {
    key: "owner",
    label: "I'm a Business Owner",
    headline: "Business Owner",
    subhead: "For founders, promoters and next-gen leaders scaling the business they already run.",
    viewAllHref: "https://mastersunion.org/family-business",
    theme: "linear-gradient(135deg, #f5ebe0 0%, #ede3d5 35%, #e2d2c0 65%, #d6c2b0 100%)",
    image: pathwayOwner,
    programmes: [
      { title: "PGP Rise: Owners & Promoters Management", duration: "1 Yr", format: "Blended Weekend" },
      { title: "PGP in Entrepreneurship & Business Acceleration", duration: "9 Mo", format: "Blended" },
      { title: "D2C Brand Bootcamp", duration: "Short-form", format: "Intensive Bootcamp" },
    ],
  },
];

type RegistrationRole = "" | "student" | "parent" | "working-professional" | "school-counselor" | "other";
type RegistrationFormValues = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  sessionId: string;
  role: RegistrationRole;
  questions?: string;
};

const registrationSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name is too long" }),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255, { message: "Email is too long" }),
  phone: z.string().trim().min(10, { message: "Please enter a valid phone number" }).max(20, { message: "Phone number is too long" }),
  whatsapp: z.string().trim().min(10, { message: "Please enter a valid WhatsApp number" }).max(20, { message: "WhatsApp number is too long" }),
  sessionId: z.string().min(1, { message: "Please select a session" }),
  role: z.enum(["", "student", "parent", "working-professional", "school-counselor", "other"] as const).refine((v) => v !== "", { message: "Please select who you are" }),
  questions: z.string().trim().max(500, { message: "Please keep it under 500 characters" }).optional(),
});

function formatSessionDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function RegistrationDialog({
  open,
  onOpenChange,
  defaultSessionId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultSessionId?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      sessionId: defaultSessionId ?? "",
      role: "",
      questions: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        sessionId: defaultSessionId ?? "",
        role: "",
        questions: "",
      });
      setSubmitted(false);
    }
  }, [open, defaultSessionId, form]);

  const onSubmit = (values: RegistrationFormValues) => {
    // In a real flow, this is where you send the data to a server function or CRM.
    console.log("Session registration:", values);
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-none border border-black bg-[#F5F3EE] p-0 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
        <div className="border-b border-black/10 bg-black px-6 py-4">
          <DialogHeader>
            <DialogTitle className="text-[13px] font-bold uppercase tracking-[0.2em] text-white">
              Register for a session
            </DialogTitle>
            <DialogDescription className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
              We will send the calendar invite and Zoom link within 24 hours.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 flex size-14 items-center justify-center border border-black bg-black text-white">
                <Check className="size-6" />
              </div>
              <h3 className="text-[15px] font-semibold text-black">You're on the list</h3>
              <p className="mt-2 max-w-[26ch] text-[13px] leading-relaxed text-black/65">
                Check your inbox for the invite. If you don't see it, check spam or WhatsApp.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  form.reset();
                  onOpenChange(false);
                }}
                className="mt-6 rounded-none border border-black bg-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-black/80"
              >
                Close
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="sessionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/60">Session</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none border-black/20 bg-white text-[13px] text-black focus:ring-black">
                            <SelectValue placeholder="Select a session" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none border-black/20 bg-[#F5F3EE]">
                          {ADMISSIONS_CONNECT_SESSIONS.map((s) => (
                            <SelectItem key={s.id} value={s.id} className="text-[13px] text-black focus:bg-black/5">
                              {s.title} — {formatSessionDate(s.nextDate)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[11px]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/60">Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Aryan Sharma" className="rounded-none border-black/20 bg-white text-[13px] text-black placeholder:text-black/30 focus-visible:ring-black" {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/60">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="aryan@email.com" className="rounded-none border-black/20 bg-white text-[13px] text-black placeholder:text-black/30 focus-visible:ring-black" {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/60">Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+91 98765 43210" className="rounded-none border-black/20 bg-white text-[13px] text-black placeholder:text-black/30 focus-visible:ring-black" {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/60">WhatsApp</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Same as phone" className="rounded-none border-black/20 bg-white text-[13px] text-black placeholder:text-black/30 focus-visible:ring-black" {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/60">Who are you?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none border-black/20 bg-white text-[13px] text-black focus:ring-black">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none border-black/20 bg-[#F5F3EE]">
                          <SelectItem value="student" className="text-[13px] text-black focus:bg-black/5">Student</SelectItem>
                          <SelectItem value="parent" className="text-[13px] text-black focus:bg-black/5">Parent / Guardian</SelectItem>
                          <SelectItem value="working-professional" className="text-[13px] text-black focus:bg-black/5">Working professional</SelectItem>
                          <SelectItem value="school-counselor" className="text-[13px] text-black focus:bg-black/5">School counselor</SelectItem>
                          <SelectItem value="other" className="text-[13px] text-black focus:bg-black/5">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[11px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/60">What do you want to ask? <span className="font-normal normal-case text-black/40">(optional)</span></FormLabel>
                      <FormControl>
                        <textarea
                          rows={3}
                          placeholder="Curriculum, hostel, placements, fees..."
                          className="w-full resize-none rounded-none border border-black/20 bg-white px-3 py-2 text-[13px] text-black placeholder:text-black/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[11px]" />
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-2">
                  <Button
                    type="submit"
                    className="w-full rounded-none border border-black bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-black/80"
                  >
                    Confirm registration
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AdmissionsConnect() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | undefined>(undefined);
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const openFor = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setDialogOpen(true);
  };

  const featured = ADMISSIONS_CONNECT_SESSIONS;

  return (
    <div className="col-span-12 mt-14 border-t-2 border-black pt-12">
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/50">
          Admissions Connect
        </p>
        <h2
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-black"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Don’t believe AI?{" "}
          <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Talk to humans.
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] font-medium leading-snug text-black/70">
          Join live, small-group sessions with alumni, parents, faculty and current students.
          Ask the questions search engines can’t answer and get honest answers from people who’ve been through it.
        </p>
      </header>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="overflow-hidden" ref={(el) => {
          if (el) {
            carouselRef.current = el;
          }
        }}>
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {featured.map((s) => (
              <div
                key={s.id}
                className="w-[92%] flex-shrink-0 px-2 md:w-[88%] md:px-4 lg:w-[84%]"
              >
                <article className="group relative mx-auto aspect-[16/9] max-h-[420px] w-full max-w-[980px] overflow-hidden rounded-none bg-[#E5E0D5]/60 shadow-lg transition-transform duration-500 hover:scale-[1.01]">
                  <div className="absolute inset-0">
                    <ImagePlaceholder aspect="auto" className="h-full w-full" label="Session" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white md:p-10">
                    <div className="mb-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                          {formatSessionDate(s.nextDate)} • {s.nextTime}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-widest text-white/80">
                          {s.spotsLeft} spots left
                        </span>
                      </div>
                      <h3
                        className="mb-2 max-w-[720px] text-[clamp(1.5rem,4vw,3rem)] leading-tight"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      >
                        {s.title}
                      </h3>
                      <p className="max-w-[620px] text-sm font-light leading-relaxed text-white/80 md:text-base">
                        {s.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openFor(s.id)}
                        className="rounded-none bg-white px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#F5F3EE]"
                      >
                        Register for Session
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrent((c) => (c - 1 + featured.length) % featured.length)}
            aria-label="Previous session"
            className="flex size-10 items-center justify-center rounded-none border border-black/15 text-black/70 transition-all hover:bg-black hover:text-white"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2">
            {featured.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                aria-label={`Go to session ${i + 1}`}
                className="h-[3px] w-8 cursor-pointer overflow-hidden bg-black/15"
              >
                <span
                  className="block h-full origin-left bg-black transition-transform duration-500 ease-out"
                  style={{ transform: `scaleX(${i === current ? 1 : 0})` }}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrent((c) => (c + 1) % featured.length)}
            aria-label="Next session"
            className="flex size-10 items-center justify-center rounded-none border border-black/15 text-black/70 transition-all hover:bg-black hover:text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => {
            setSelectedSessionId(undefined);
            setDialogOpen(true);
          }}
          className="inline-flex items-center border-b-2 border-black/20 pb-1 text-sm font-semibold text-black/60 transition-all hover:border-black hover:text-black"
        >
          View all sessions
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <p className="mt-8 text-center text-[12px] leading-relaxed text-black/50">
        Can’t find a slot? Drop a note to{" "}
        <a
          href="mailto:admissions@mastersunion.org"
          className="font-semibold text-black underline decoration-black/30 underline-offset-2"
        >
          admissions@mastersunion.org
        </a>{" "}
        and we’ll arrange a private call.
      </p>

      <RegistrationDialog open={dialogOpen} onOpenChange={setDialogOpen} defaultSessionId={selectedSessionId} />
    </div>
  );
}


function Programs() {
  const [activeKey, setActiveKey] = useState<string>(PATHWAYS[0].key);
  const active = PATHWAYS.find((p) => p.key === activeKey) ?? PATHWAYS[0];
  const admissionsScrollRef = useRef<HTMLDivElement>(null);
  const [sageProgram, setSageProgram] = useState<string | null>(null);

  return (
    <section id="programs" className="border-t border-black/10 bg-[#F5F3EE]">

      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-6 py-20 md:px-10 md:py-28">
        {/* Editorial intro */}
        <div className="col-span-12 lg:col-span-4">
          <h2 className="mb-8 inline-block border-b border-black pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.32em]">
            Programme Finder
          </h2>
          <h1
            className="mb-6 text-[clamp(3.5rem,8vw,6rem)] font-black leading-[0.85] tracking-tighter text-black"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            FIND <br /> YOUR <br />
            <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              Path.
            </span>
          </h1>
          <p className="max-w-xs text-[15px] font-medium leading-snug text-black/75">
            Tell us where you are. We'll tell you where to go next — every Masters' Union programme, organised by who you are today.
          </p>

          {/* Persona switcher (small) */}
          <div className="mt-10 flex flex-wrap gap-2">
            {PATHWAYS.map((p, i) => {
              const isActive = p.key === activeKey;
              return (
                <button
                  key={p.key}
                  onClick={() => setActiveKey(p.key)}
                  className={`border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                    isActive
                      ? "border-black bg-black text-[#F5F3EE]"
                      : "border-black/20 bg-transparent text-black hover:border-black"
                  }`}
                >
                  <span className="mr-2 font-mono text-black/40">{String(i + 1).padStart(2, "0")}</span>
                  {p.label.replace("I'm ", "").replace("a ", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial grid */}
        <div className="relative col-span-12 grid grid-cols-1 gap-4 md:grid-cols-5 lg:col-span-8">
          {/* Feature tile — editorial poster */}
          <div
            key={active.key}
            className="group relative col-span-1 flex h-[640px] flex-col overflow-hidden md:col-span-2 border border-black"
            style={{ background: active.theme }}
          >
            <img
              src={active.image}
              alt={active.headline}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center animate-[fadeIn_0.6s_ease-out]"
            />
            {/* Full-height dark scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/55" />

            {/* Top content — small, in the image's negative space */}
            <div className="relative z-10 p-6 md:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/70">
                Currently viewing
              </p>
              <h3
                className="mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {active.headline}.
              </h3>
            </div>

            {/* Bottom content — compact, sits above the subject */}
            <div className="relative z-10 mt-auto p-6 md:p-8">
              <div className="border-l-2 border-white/40 pl-4">
                <p className="max-w-[32ch] text-[13px] font-medium leading-snug text-white/90">
                  {active.subhead}
                </p>
              </div>
            </div>
          </div>

          {/* Programmes tile — taller, scrollable list */}
          <div className="relative col-span-1 flex h-[640px] flex-col overflow-hidden border border-black bg-[#F5F3EE] p-6 md:col-span-3">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-black/50">
                  Browse the list
                </p>
                <h3
                  className="text-[clamp(1.8rem,3vw,2.5rem)] font-black uppercase leading-[0.9] text-black"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Programmes
                </h3>
              </div>
              <span className="shrink-0 border border-black/30 px-3 py-1 text-[10px] uppercase tracking-widest text-black">
                {String(active.programmes.length).padStart(2, "0")} Total
              </span>
            </div>

            <ul className="flex-1 min-h-0 space-y-0 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar]:w-1.5 hover:[scrollbar-width:thin] hover:[&::-webkit-scrollbar-thumb]:bg-black/40">
              {active.programmes.map((pg, i) => (
                <li key={pg.title}>
                  <a
                    href={pg.href ?? active.viewAllHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group/row grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 border-b border-black/10 py-3 transition hover:border-black"
                  >
                    <span className="mt-1 font-mono text-[10px] text-black/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-[13px] font-semibold leading-snug text-black">
                      {pg.title}
                      <span className="mt-1 block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black/45">
                        {pg.duration} · {pg.format}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-1 size-3.5 shrink-0 opacity-30 transition group-hover/row:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Scroll prompt */}
            <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4">
              <div className="h-px flex-1 bg-black/10" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">
                Scroll to explore
              </span>
              <div className="h-px flex-1 bg-black/10" />
            </div>
          </div>
        </div>

        {/* Admissions · Cohort 2026 */}
        <div className="col-span-12 mt-28 border-t-2 border-black pt-20">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">
                Admissions · Cohort 2026
              </p>
              <h2
                className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[0.95] tracking-tight text-black"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Programmes Accepting
                <br />
                <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                  Applications.
                </span>
              </h2>
            </div>
            <p className="max-w-[28ch] text-[13px] font-medium leading-snug text-black/60">
              Round-based deadlines. Rolling reviews. Apply before seats fill.
            </p>
          </div>

          <div className="relative">
            <div
              ref={admissionsScrollRef}
              className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            >
              {PROGRAMS.map((p) => (
                <article
                  key={p.title}
                  className="group w-[calc(24%-12px)] flex-shrink-0 snap-start bg-[#F5F3EE] p-5 transition-all duration-300 hover:-translate-y-1 pastel-fill"
                >
                  <div className="overflow-hidden">
                    <ImagePlaceholder
                      aspect="4/3"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                    <span>{p.mode}</span>
                    <span className="text-black/25">·</span>
                    <span>{p.duration}</span>
                    <span className="text-black/25">·</span>
                    <span className="text-black/40">{p.round}</span>
                  </div>

                  <h3
                    className="mt-3 text-[18px] font-semibold leading-[1.25] tracking-tight text-black"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {p.title}
                  </h3>

                  <div className="mt-4 pt-4">
                    <div className="flex items-center gap-2 text-xs text-black/60">
                      <span className="font-semibold text-black">{p.status}</span>
                      <span className="text-black/30">·</span>
                      <span>
                        Closes in <DaysRemaining target={p.deadline} /> days
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <a
                        href="#"
                        className="text-[11px] font-semibold uppercase tracking-widest text-black underline underline-offset-4 decoration-black/20 transition-colors hover:decoration-black"
                      >
                        Apply Now
                      </a>
                      <button
                        type="button"
                        onClick={() => setSageProgram(p.title)}
                        className="text-[11px] font-semibold text-black/50 underline underline-offset-4 decoration-black/20 transition-colors hover:text-black hover:decoration-black"
                      >
                        Ask S.A.G.E.
                      </button>
                    </div>
                  </div>
                </article>
              ))}


            </div>

            <AdmissionsConnect />
          </div>
        </div>
      </div>

      <SageSheet
        program={sageProgram}
        onOpenChange={(open) => !open && setSageProgram(null)}
      />
    </section>
  );
}

const NEWS = [
  { tag: "Press", month: "Jun", day: "15", time: "09:00 AM", title: "Masters' Union ranked among India's top new-age B-schools", source: "Forbes India" },
  { tag: "Cohort", month: "May", day: "22", time: "11:30 AM", title: "PGP 2026 applications cross 18,000 — admit rate drops to 4%", source: "Inside MU" },
  { tag: "Founders", month: "Apr", day: "08", time: "02:15 PM", title: "Six student ventures featured on Shark Tank India S5", source: "Sony LIV" },
  { tag: "Faculty", month: "Mar", day: "29", time: "10:00 AM", title: "Kunal Shah joins as Distinguished Practitioner-in-Residence", source: "ET Now" },
];

const PROGRAMS = [
  { mode: "ON CAMPUS", duration: "2 YEARS", title: "PGP in Technology & Business Management", round: "Round 1", status: "Applications Open", deadline: "2026-08-15T23:59:59" },
  { mode: "ON CAMPUS", duration: "1 YEAR", title: "PGP in Quantitative Finance & Business", round: "Round 2", status: "Applications Open", deadline: "2026-09-30T23:59:59" },
  { mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Technology & Business Management", round: "Round 3", status: "Applications Open", deadline: "2026-10-31T23:59:59" },
  { mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Psychology & Marketing", round: "Round 4", status: "Applications Open", deadline: "2026-11-15T23:59:59" },
  { mode: "ON CAMPUS", duration: "4 YEARS", title: "UG in Data Science & Artificial Intelligence", round: "Round 5", status: "Applications Open", deadline: "2026-12-01T23:59:59" },
];

function formatDeadline(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function useCountdown(target: string) {
  const [remaining, setRemaining] = useState(() => {
    const diff = new Date(target).getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return { days, hours, minutes, seconds, total: remaining };
}

function Countdown({ target }: { target: string }) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, "0");
  const blocks = [
    { value: days, label: "DAYS" },
    { value: pad(hours), label: "HRS" },
    { value: pad(minutes), label: "MIN" },
    { value: pad(seconds), label: "SEC" },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {blocks.map((b, i) => (
        <div key={b.label} className="flex items-center gap-1.5">
          <div className="text-center">
            <div className="font-mono text-[13px] font-bold leading-none tracking-tight text-black">
              {b.value}
            </div>
            <div className="font-mono text-[6px] font-bold uppercase tracking-[0.18em] text-black/40">
              {b.label}
            </div>
          </div>
          {i < blocks.length - 1 && (
            <span className="font-mono text-[11px] font-bold leading-none text-black/20">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

function DaysRemaining({ target }: { target: string }) {
  const { days } = useCountdown(target);
  return <span className="tabular-nums">{days}</span>;
}





const PEDAGOGY = [
  { icon: GraduationCap, tag: "01 · Faculty", title: "Taught by the people building the companies you study.", body: "40% of faculty are sitting CEOs, MDs and CXOs. 30% visiting from Harvard, Wharton, Kellogg and Booth. The slides update on Monday morning.", stats: [{ value: "40%", label: "Industry practitioners" }, { value: "200+", label: "Visiting experts" }, { value: "30%", label: "Ivy-league visiting" }], cta: "Meet the faculty", route: "/faculty", image: edExecutive.url, bg: "#E6DFF5" },
  { icon: Rocket, tag: "02 · Entrepreneurship", title: "30+ ventures. ₹593 Cr in combined valuation.", body: "An on-campus venture studio that handles incorporation, hiring, and warm intros to Sequoia, Blume and Y Combinator. Six alumni on Shark Tank India.", stats: [{ value: "30+", label: "Active startups" }, { value: "₹593 Cr", label: "Combined valuation" }, { value: "6", label: "On Shark Tank India" }], cta: "See the startups", route: "/startups", image: edVentures.url, bg: "#F4D9C4" },
  { icon: Briefcase, tag: "03 · Career", title: "100% placement. ₹61.98L highest CTC.", body: "28% of grads join as Founder's Office or Chief of Staff. 3× average pre-MBA salary jump and 10–20% annual growth post-grad.", stats: [{ value: "₹61.98L", label: "Highest CTC" }, { value: "3×", label: "Average salary jump" }, { value: "100%", label: "Placement" }], cta: "Read the report", route: "/placements", image: edB2B.url, bg: "#DCE5D4" },
  { icon: Users, tag: "04 · Mentor Union", title: "500+ operators. Median response under an hour.", body: "Founders mid-build, investors mid-cheque, CMOs mid-quarter. No office hours, no waiting lists — just answers when you need them.", stats: [{ value: "500+", label: "Mentors" }, { value: "<1 hr", label: "Median response" }, { value: "On demand", label: "Always on" }], cta: "Browse mentors", route: "/mentors", image: edGlobal.url, bg: "#F0E5B8" },
  { icon: ShoppingCart, tag: "05 · D2C Challenge", title: "Real revenue. Real stores. Real P&L.", body: "Students launch live dropshipping stores and get graded on the market, not the memo. In the PGP TBM 2025 cohort, 75 days of selling produced ₹3.3 Cr+ in revenue and the top store hit ₹45.4 L.", stats: [{ value: "₹3.3 Cr+", label: "Cohort revenue" }, { value: "₹45.4 L", label: "Top team" }, { value: "75 days", label: "Challenge sprint" }], cta: "See the scoreboard", route: "/how-we-teach", image: edPostgrad.url, bg: "#D6E4EE" },
  { icon: Mic, tag: "06 · Creator Challenge", title: "Build your brand. Win the creator challenge.", body: "A full content studio on campus where students grow personal brands on YouTube, Instagram and LinkedIn. Recent winners hit 1.2M impressions and 120K unique viewers.", stats: [{ value: "1.2M+", label: "Impressions" }, { value: "120K", label: "Unique viewers" }, { value: "₹2 L", label: "Winner prize" }], cta: "See the creators", route: "/creator-challenge", image: edAI.url, bg: "#F0D5D8" },
  { icon: ChefHat, tag: "07 · Food Lab", title: "A commercial kitchen inside a B-school.", body: "Lexi's went from a classroom concept to Gurgaon's highest-rated sandwich brand. FSSAI-certified production line, 4.5★ on Zomato, ₹1 Cr+ ARR.", stats: [{ value: "4.5★", label: "Zomato rating" }, { value: "₹1 Cr+", label: "Student brand ARR" }, { value: "FSSAI", label: "Certified" }], cta: "Tour the lab", route: "/food-lab", image: edImmersions.url, bg: "#E4C9B8" },
  { icon: Building2, tag: "08 · MU Ventures", title: "The fund that backs cohorts before convocation.", body: "An in-house venture arm that writes pre-seed cheques into student companies — and opens the door to a 200+ investor network for the next round.", stats: [{ value: "200+", label: "Investor network" }, { value: "Pre-seed", label: "Cheques written" }, { value: "On campus", label: "Venture arm" }], cta: "Pitch the fund", route: "/startups", image: edFamily.url, bg: "#D8E8DD" },
] as const;

export default function HomeSections() {
  const [applyOpen, setApplyOpen] = useState(false);
  return (
    <div className="bg-white text-black" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* NEWS */}
      <section id="news" className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">
                The Dispatch · Newsroom
              </p>
              <h2
                className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[0.95] tracking-tight text-black"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Latest from
                <br />
                <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                  the campus.
                </span>
              </h2>
            </div>
            <div className="flex items-end justify-between gap-4 md:flex-col md:items-end">
              <p className="max-w-[28ch] text-[13px] font-medium leading-snug text-black/60">
                Press mentions, cohort milestones, and founder wins — refreshed weekly.
              </p>
              <div className="flex gap-2">
                <button type="button" className="p-2 border border-black/10 transition-colors hover:bg-black/5">
                  <ChevronLeft className="size-4 text-black/60" />
                </button>
                <button type="button" className="p-2 border border-black/10 transition-colors hover:bg-black/5">
                  <ChevronRight className="size-4 text-black/60" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {NEWS.map((n) => (
                <article
                  key={n.title}
                  className="group w-[calc(25%-12px)] min-w-[260px] flex-shrink-0 snap-start p-5 transition-all duration-300 hover:-translate-y-1 pastel-fill"
                >
                  <div className="flex items-center gap-2">
                    <span className="bg-black px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                      {n.tag}
                    </span>
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-black/50">
                      {n.month} {n.day} · {n.time}
                    </span>
                  </div>

                  <ImagePlaceholder aspect="16/9" className="mt-3" />

                  <h3
                    className="mt-4 text-[1rem] font-medium leading-[1.25] tracking-tight text-black"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {n.title}
                  </h3>

                  <div className="mt-5 pt-4">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-black/60">
                      Source · {n.source}
                    </p>
                  </div>

                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-black underline underline-offset-4 decoration-black/20 transition-colors hover:decoration-black"
                  >
                    Read Story
                    <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#"
              className="font-sans border-b-2 border-black pb-1 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-colors hover:border-black/50 hover:text-black/60"
            >
              Enter Full Archive
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <Programs />

      {/* FOUNDER'S MESSAGE */}
      <section id="founders" className="border-t border-black/10 bg-[#F5F3EE]">
        <div className="mx-auto max-w-[1280px] px-6 pb-6 md:px-10 md:pb-8">
          <div
            className="relative overflow-hidden rounded-none min-h-[520px] md:min-h-[640px] grid grid-cols-1 lg:grid-cols-2 pastel-gradient"
          >
            {/* Quote side */}
            <div className="relative z-10 flex flex-col justify-end p-6 md:p-8 lg:p-12">
              <div className="max-w-[40ch]">
                <Quote className="mb-4 size-6 text-black/40" />
                <h2
                  className="text-3xl leading-[1.05] tracking-tight text-black md:text-4xl lg:text-[48px]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  "If education was working, we wouldn't have built{" "}
                  <span className="italic text-black/70" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                    Masters' Union.
                  </span>
                  "
                </h2>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-10 bg-black/30" />
                  <div>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-black/80">
                      Pratham Mittal
                    </p>
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-black/55">
                      Founder, Masters' Union
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo side */}
            <div className="relative h-64 lg:h-auto">
              <img
                src={founderPhoto}
                alt="Pratham Mittal"
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-contain object-[bottom_right]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--pastel-start)]/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* PEDAGOGY */}
      <section id="pedagogy" className="border-t border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <SectionHead eyebrow="The pedagogy" title={<>How Masters' Union <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>actually</span> teaches.</>} lede="Eight systems that work in concert — built so theory never outpaces practice." />

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PEDAGOGY.map((p, i) => {
              const Icon = p.icon;
              // Bento: card 0 spans 2 cols; card 4 spans 2 cols
              const span = i === 0 || i === 4 ? "lg:col-span-2" : "";
              return (
                <Link
                  key={p.tag}
                  to={p.route}
                  className={`group relative flex flex-col overflow-hidden rounded-[8px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] ${span}`}
                  style={{ backgroundColor: p.bg }}
                >
                  {/* Top: tag + icon + title on colored background */}
                  <div className="flex items-start justify-between gap-4 p-6 md:p-7">
                    <span className="inline-flex items-center rounded-md bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/75 backdrop-blur-sm">
                      {p.tag}
                    </span>
                    <div className="flex size-8 items-center justify-center rounded-md bg-black/10 text-black/70">
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <div className="px-6 md:px-7">
                    <h3
                      className="text-[1.35rem] font-semibold leading-[1.15] tracking-tight text-black md:text-[1.6rem]"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.6] text-black/70 line-clamp-3">
                      {p.body}
                    </p>
                  </div>

                  {/* Bottom: large image with CTA overlay */}
                  <div className="relative mt-6 mx-3 mb-3 overflow-hidden rounded-[6px]">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                        i === 0 || i === 4 ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
                        {p.cta}
                      </span>
                      <div className="flex size-10 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Apply now — high-conversion grid closer */}
            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="group relative flex flex-col overflow-hidden rounded-[8px] bg-black text-left text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-start justify-between gap-4 p-6 md:p-7">
                <span className="inline-flex items-center rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                  Admissions
                </span>
                <div className="flex size-8 items-center justify-center rounded-md bg-white/10 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
              <div className="px-6 md:px-7">
                <h3
                  className="text-[1.6rem] font-semibold leading-[1.1] tracking-tight text-white md:text-[2rem]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Apply now.
                </h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-white/70">
                  Cohort 2026 is filling up. Submit your profile and get a decision in 48 hours.
                </p>
              </div>
              <div className="relative mx-3 mb-3 mt-6 flex flex-1 flex-col justify-end overflow-hidden rounded-[6px] bg-white/10 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Round 2 closes soon
                </p>
                <span className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-transform group-hover:translate-x-1">
                  Start application
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </button>

            <RegistrationDialog open={applyOpen} onOpenChange={setApplyOpen} />
          </div>

        </div>
      </section>


      {/* FOOTER */}
      <footer className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <img
                src={logoWhite.url}
                alt="Masters' Union"
                className="h-12 w-auto brightness-0 invert md:h-14"
              />
              <p className="mt-8 max-w-sm text-[13px] leading-relaxed text-white/55">
                DLF Cyberpark, Phase III<br />
                Gurugram 122002, India<br />
                hello@mastersunion.org
              </p>
              <div className="mt-8 flex items-center gap-3">
                {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="flex size-10 items-center justify-center rounded-none border border-white/15 text-white/60 transition-colors hover:border-white hover:text-white">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <FooterCol title="Programs" links={["PGP in Tech & Business Management", "PGP in Quantitative Finance", "UG in Tech & Business Management", "Executive Programs"]} />
            <FooterCol title="Campus" links={["Faculty", "Mentors", "Outclass", "Food Lab", "MU Ventures"]} />
            <FooterCol title="Connect" links={["Admissions", "Press & Media", "Careers at MU", "Brochure (PDF)"]} />
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.22em] text-white/40 md:flex-row md:items-center">
            <span>© 2026 Masters' Union Education Pvt. Ltd.</span>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white/80">Privacy</a>
              <a href="#" className="hover:text-white/80">Terms</a>
              <a href="#" className="hover:text-white/80">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, title, lede, icon: Icon }: { eyebrow: string; title: React.ReactNode; lede: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="size-4 text-black/70" />}
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">{eyebrow}</p>
        </div>
        <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[0.95] tracking-tight text-black md:text-[clamp(2.5rem,5vw,4rem)]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          {title}
        </h2>
      </div>
      <p className="max-w-sm text-[15px] leading-relaxed text-black/60">{lede}</p>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-[13px] text-white/70 transition-colors hover:text-white">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

type SageMsg = { role: "user" | "sage"; text: string; kind?: "story" | "stat" | "fact" | "text" };

const SAGE_SUGGESTIONS = [
  "Tell me a student success story",
  "Did you know — hit me with a fun stat",
  "Break down the fees & scholarships",
  "What does a typical week look like?",
  "Which companies recruit here?",
  "How do I strengthen my application?",
];

const SAGE_STORIES = [
  "Meet Aarav — walked in from a Tier-3 town, zero coding background. Two years later he's shipping ML infra at a YC-backed fintech in SF. His secret? He built 14 side projects during the programme. His words: 'Masters' Union didn't teach me to pass exams. It taught me to ship.'",
  "Riya joined straight out of college with a ₹0 startup idea. She used the Founder's Office elective to pitch to a visiting VC in week 6. By graduation she had ₹1.2Cr in pre-seed and 3 co-founders from her cohort. The cohort IS the network.",
  "Kabir was a chartered accountant chasing 'safer' options. He took the Quant Finance track, cracked a role at a Singapore hedge fund, and 3x'd his previous CTC in his first year. He calls the switch 'the least risky bet of my life.'",
];

const SAGE_FACTS = [
  "Did you know? 92% of the last graduating cohort had an offer in hand before their final semester ended.",
  "Fun stat: The average student here interacts with 40+ working practitioners as faculty — CXOs, founders, investors — not career academics.",
  "Wild but true: Student-founded ventures from campus have collectively raised over ₹200Cr in the last 24 months.",
  "Did you know? The median compensation jump for career-switchers is 2.4x. For engineers moving into product/finance roles, it's often higher.",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function SageSheet({ program, onOpenChange }: { program: string | null; onOpenChange: (open: boolean) => void }) {
  const open = program !== null;
  const [messages, setMessages] = useState<SageMsg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);


  // Push page content aside — shrink the site instead of overlaying.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    if (open) {
      body.style.transition = "padding-right 300ms ease";
      body.style.paddingRight = "440px";
    } else {
      body.style.paddingRight = "";
    }
    return () => {
      body.style.paddingRight = "";
    };
  }, [open]);

  // Close with Escape key.
  useEffect(() => {
    if (typeof document === "undefined" || !open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open && program) {
      setMessages([
        {
          role: "sage",
          kind: "text",
          text: `Hey! I'm S.A.G.E ✨ Think of me as your slightly over-caffeinated guide to ${program}. I've got receipts — student stories, hiring data, curriculum secrets. What do you want to unlock first?`,
        },
        {
          role: "sage",
          kind: "fact",
          text: pickRandom(SAGE_FACTS),
        },
      ]);
      setInput("");
      setThinking(false);
    }
  }, [open, program]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const ql = q.toLowerCase();
      const replies: SageMsg[] = [];

      if (ql.includes("stor") || ql.includes("alum") || ql.includes("student")) {
        replies.push({ role: "sage", kind: "story", text: pickRandom(SAGE_STORIES) });
        replies.push({ role: "sage", kind: "text", text: `Want another one — maybe from ${program} specifically? Or should I show you what the placement report actually looks like?` });
      } else if (ql.includes("did you know") || ql.includes("stat") || ql.includes("fun")) {
        replies.push({ role: "sage", kind: "fact", text: pickRandom(SAGE_FACTS) });
        replies.push({ role: "sage", kind: "fact", text: pickRandom(SAGE_FACTS) });
        replies.push({ role: "sage", kind: "text", text: "Told you it was fun. Want the outcome data by role? Or by company?" });
      } else if (ql.includes("fee") || ql.includes("cost") || ql.includes("scholar")) {
        replies.push({ role: "sage", kind: "text", text: `Real talk on ${program}: think of tuition as a bet on your next 10 years. Merit + need-based scholarships cover up to 40% for qualifying applicants, and we run an income-share style deferral for a slice of every cohort. The ROI benchmark: most graduates recover the full programme cost inside 18 months post-placement.` });
        replies.push({ role: "sage", kind: "stat", text: "Median payback period across the last 3 cohorts: 14 months. Fastest recorded: 6 months (a founder who raised pre-seed before graduating)." });
      } else if (ql.includes("elig") || ql.includes("apply") || ql.includes("appli") || ql.includes("strong")) {
        replies.push({ role: "sage", kind: "text", text: `For ${program}: recognised bachelor's (or final year), a valid aptitude score, and — honestly — a portfolio of proof-of-work. Side projects, cohorts you built, revenue you made, code you shipped. Grades matter less than momentum.` });
        replies.push({ role: "sage", kind: "text", text: "Pro tip from admissions: candidates who submit a 2-min Loom talking about a problem they can't stop thinking about get short-listed 3x more often." });
      } else if (ql.includes("plac") || ql.includes("recruit") || ql.includes("comp") || ql.includes("salar") || ql.includes("job")) {
        replies.push({ role: "sage", kind: "stat", text: "150+ recruiters last year. Median CTC in the top quartile crossed ₹42 LPA. Top offer: ₹1.1Cr. And ~18% chose entrepreneurship over placements." });
        replies.push({ role: "sage", kind: "text", text: "Names on the list: Goldman Sachs, McKinsey, Bain, Flipkart, Zomato, Razorpay, Meesho, Cred, plus a growing pipeline of YC and Sequoia-backed startups hiring founding team members." });
      } else if (ql.includes("week") || ql.includes("day") || ql.includes("life") || ql.includes("schedule") || ql.includes("curric")) {
        replies.push({ role: "sage", kind: "text", text: `A week in ${program}: Mon–Wed you're in intense practitioner-led modules (think an ex-Meta PM breaking down 0-to-1). Thu is Founder's Studio — you ship. Fri is 'Real World Day' — live pitches, investor AMAs, or client sprints. Weekends? Cohort chaos. Hackathons, dinners, sometimes both.` });
        replies.push({ role: "sage", kind: "fact", text: "Fun fact: the average student here logs 60+ hours a week — because it stops feeling like work by month 2." });
      } else {
        replies.push({ role: "sage", kind: "text", text: `Great question on ${program}. Here's the honest answer: the programme is designed so you leave with three things — proof-of-work, a network of practitioners, and an offer. Everything else (fees, curriculum, hostel life) is engineered around those three outcomes.` });
        replies.push({ role: "sage", kind: "fact", text: pickRandom(SAGE_FACTS) });
      }

      setMessages((m) => [...m, ...replies]);
      setThinking(false);
    }, 900);
  };

  if (!open) return null;

  const kindStyles: Record<NonNullable<SageMsg["kind"]>, string> = {
    story: "border-l-4 border-orange-400/70 bg-orange-50/70 text-black",
    stat: "border-l-4 border-emerald-500/70 bg-emerald-50/70 text-black",
    fact: "border-l-4 border-sky-500/70 bg-sky-50/70 text-black",
    text: "border border-black/10 bg-white text-black",
  };

  const kindLabel: Record<NonNullable<SageMsg["kind"]>, string | null> = {
    story: "🎓 Alum Story",
    stat: "📈 By the numbers",
    fact: "💡 Did you know",
    text: null,
  };

  if (!mounted) return null;

  return createPortal(
    <aside className="fixed right-0 top-0 z-[110] flex h-screen w-[440px] flex-col border-l border-black/10 bg-[#FBFAF6] shadow-[-8px_0_40px_-12px_rgba(0,0,0,0.15)] animate-slide-in-right">
      <header className="relative flex items-center border-b border-black/10 bg-white px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5 pr-20">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-500/60">
            <Bot className="size-4.5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-black">S.A.G.E</span>
              <span className="rounded-sm bg-orange-600/50 px-1 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">AI</span>
              <span className="ml-1 flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                online
              </span>
            </div>
            <p className="truncate text-[10px] uppercase tracking-[0.14em] text-black/50">
              Talking about · {program}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-black/10 bg-white px-2 py-1.5 text-[11px] font-medium text-black/60 transition-colors hover:border-black/20 hover:bg-black/5 hover:text-black"
          aria-label="Close chat"
        >
          <X className="size-3.5" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </header>



      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
        {messages.map((m, i) => {
          const kind = m.kind ?? "text";
          const label = m.role === "sage" ? kindLabel[kind] : null;
          return (
            <div key={i} className={cn("flex animate-fade-in", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[88%] whitespace-pre-wrap px-3.5 py-2.5 text-[13px] leading-relaxed",
                  m.role === "user"
                    ? "bg-black text-white"
                    : kindStyles[kind]
                )}
              >
                {label && (
                  <div className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-black/50">
                    {label}
                  </div>
                )}
                {m.text}
              </div>
            </div>
          );
        })}

        {thinking && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 border border-black/10 bg-white px-3.5 py-3">
              <span className="size-1.5 animate-bounce rounded-full bg-orange-500/60 [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-orange-500/60 [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-orange-500/60" />
              <span className="ml-1 text-[11px] text-black/50">S.A.G.E is digging through the data…</span>
            </div>
          </div>
        )}

        {!thinking && (
          <div className="pt-2">
            <p className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
              Quick prompts
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SAGE_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="border border-black/10 bg-white px-2.5 py-1.5 text-left text-[11px] text-black/70 transition-colors hover:border-orange-400/50 hover:bg-orange-50/60 hover:text-black"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-black/10 bg-white p-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder={`Ask about ${program ?? "this programme"}…`}
            rows={2}
            className="min-h-[44px] flex-1 resize-none border border-black/15 bg-white px-3 py-2 text-[13px] text-black placeholder:text-black/40 focus:border-orange-400/60 focus:outline-none"
          />
          <Button
            type="submit"
            disabled={!input.trim() || thinking}
            className="h-[44px] shrink-0 rounded-none bg-orange-500/70 px-3 text-white hover:bg-orange-500/90"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-black/35">
          S.A.G.E may make mistakes · Verify with admissions
        </p>
      </form>
    </aside>,
    document.body
  );

}
