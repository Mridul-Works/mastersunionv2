// Industry Practitioner portraits + verified designations.
// Portraits sourced from the Masters' Union faculty drive; roles verified
// against mastersunion.org/masterspage and the published course roster.

import gurneesh from "@/assets/industry/gurneesh-khurana.png.asset.json";
import barkha from "@/assets/industry/barkha-dutt.png.asset.json";
import satish from "@/assets/industry/satish-krishnan.png.asset.json";
import naveen from "@/assets/industry/naveen-munjal.png.asset.json";
import jamshed from "@/assets/industry/jamshed-daboo.png.asset.json";
import subhonil from "@/assets/industry/subhonil-ghoshal.png.asset.json";
import rahulW from "@/assets/industry/rahul-wadhawan.png.asset.json";
import monica from "@/assets/industry/monica-jasuja.png.asset.json";
import thomas from "@/assets/industry/thomas-kuruvilla.png.asset.json";
import nitinG from "@/assets/industry/nitin-gaur.png.asset.json";
import jadhav from "@/assets/industry/narendra-jadhav.png.asset.json";
import avantika from "@/assets/industry/avantika-tomar.png.asset.json";
import arjunV from "@/assets/industry/arjun-vaidya.png.asset.json";
import edward from "@/assets/industry/edward-rogers.png.asset.json";

export type IndustryPractitioner = {
  name: string;
  role: string;
  company: string;
  img: string;
  blurb: string;
};

export const INDUSTRY_PRACTITIONERS: IndustryPractitioner[] = [
  {
    name: "Naveen Munjal",
    role: "Managing Director",
    company: "Hero Electric",
    img: naveen.url,
    blurb:
      "Teaches the business of electric vehicles — strategy, supply chains and category creation — from the front seat of India's EV transition.",
  },
  {
    name: "Arjun Vaidya",
    role: "Founder",
    company: "Dr. Vaidya's · V3 Ventures",
    img: arjunV.url,
    blurb:
      "Teaches D2C brand building and consumer psychology. Built and exited a modern ayurveda brand to a Fortune 500 group in his early thirties.",
  },
  {
    name: "Thomas Kuruvilla",
    role: "Managing Partner",
    company: "Arthur D. Little, Middle East",
    img: thomas.url,
    blurb:
      "Teaches management and strategy as a Master-in-Residence, drawing on global consulting mandates across the Gulf and Europe.",
  },
  {
    name: "Dr Edward W. Rogers",
    role: "Former Chief Knowledge Officer",
    company: "NASA",
    img: edward.url,
    blurb:
      "Teaches the art of managing complexity, innovation systems and organisational learning. His previous employer sent people to space.",
  },
  {
    name: "Satish Krishnan",
    role: "Former Managing Director",
    company: "Standard Chartered",
    img: satish.url,
    blurb:
      "Teaches derivatives and structured products from two decades on global banking and markets desks.",
  },
  {
    name: "Nitin Gaur",
    role: "Former Director, Financial Sciences & Digital Assets",
    company: "IBM",
    img: nitinG.url,
    blurb:
      "Teaches DeFi, digital assets and blockchain architecture from the team that built IBM's digital currency research division.",
  },
  {
    name: "Barkha Dutt",
    role: "Former Editor",
    company: "NDTV",
    img: barkha.url,
    blurb:
      "Teaches women in leadership, public narrative and media strategy — one of India's most recognised journalists.",
  },
  {
    name: "Gurneesh Khurana",
    role: "Former Sales Director",
    company: "General Motors",
    img: gurneesh.url,
    blurb:
      "Teaches sales strategy and enterprise selling from a career leading large automotive sales organisations.",
  },
  {
    name: "Jamshed K Daboo",
    role: "Former Managing Director",
    company: "Star Bazaar (Trent · Tata)",
    img: jamshed.url,
    blurb:
      "Teaches the ins and outs of retail — formats, margins and merchandising — from running a national grocery chain.",
  },
  {
    name: "Dr Avantika Tomar",
    role: "Partner",
    company: "EY-Parthenon",
    img: avantika.url,
    blurb:
      "Teaches strategic human resource management and organisation design, advising boards on talent and transformation.",
  },
  {
    name: "Rahul Wadhawan",
    role: "Expert Associate Partner",
    company: "McKinsey & Company",
    img: rahulW.url,
    blurb:
      "Teaches digital strategy and marketing analytics from consulting engagements across consumer and technology sectors.",
  },
  {
    name: "Monica Jasuja",
    role: "Former Head of Product, Emerging Markets",
    company: "Mastercard",
    img: monica.url,
    blurb:
      "Teaches payments, fintech and digital financial infrastructure from inside one of the world's largest payment networks.",
  },
  {
    name: "Subhonil Ghoshal",
    role: "Managing Director",
    company: "Trafigura India",
    img: subhonil.url,
    blurb:
      "Teaches commodity markets, trading and global supply chains from one of the world's largest physical commodity traders.",
  },
  {
    name: "Dr Narendra Jadhav",
    role: "Former Chief Economist, RBI",
    company: "Former Member, Planning Commission of India",
    img: jadhav.url,
    blurb:
      "Teaches macroeconomics and public policy from a career at the centre of India's monetary and planning institutions.",
  },
];

export const INDUSTRY_PHOTOS: Record<string, string> = Object.fromEntries(
  INDUSTRY_PRACTITIONERS.map((p) => [p.name, p.img]),
);
