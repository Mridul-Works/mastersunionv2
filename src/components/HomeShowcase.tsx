import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { ArrowUpRight, Download, Quote } from "lucide-react";
import { Link } from "@tanstack/react-router";
import founderPhoto from "@/assets/founder-pratham-cutout.webp";

import venturesFilm from "@/assets/ventures-film.mp4.asset.json";

import { FULL_TIME_FACULTY } from "@/lib/full-time-faculty";
import MastersVideos from "@/components/MastersVideos";
import { INDUSTRY_PRACTITIONERS } from "@/lib/industry-practitioners";

// Faculty
import bhupesh from "@/assets/faculty/bhupesh.png.asset.json";
import nandini from "@/assets/faculty/nandini.png.asset.json";
import garima from "@/assets/faculty/garima.png.asset.json";
import manoj from "@/assets/faculty/manoj.png.asset.json";
import raghuRaman from "@/assets/faculty/raghu-raman.png.asset.json";
import havish from "@/assets/faculty/havish-madhvapaty.png.asset.json";
import ekhlaque from "@/assets/faculty/ekhlaque-bari.png.asset.json";
import sumit from "@/assets/faculty/sumit-shukla.png.asset.json";
import aditya from "@/assets/faculty/aditya-turalapati.png.asset.json";
import parikshit from "@/assets/faculty/parikshit-khanna.png.asset.json";
import karmanya from "@/assets/faculty/karmanya-suri.png.asset.json";
import gauravA from "@/assets/faculty/gaurav-arora.png.asset.json";
import daveLewis from "@/assets/faculty/dave-lewis.png.asset.json";
// Visiting faculty portraits
import vfKaushal from "@/assets/faculty/visiting/kaushal-bhagat.png.asset.json";
import vfUtkarsh from "@/assets/faculty/visiting/utkarsh-majmudar.png.asset.json";
import vfAkash from "@/assets/faculty/visiting/akash-krishnan.png.asset.json";
import vfThomas from "@/assets/faculty/visiting/thomas-joseph.png.asset.json";
import vfSouvik from "@/assets/faculty/visiting/souvik-dutta.png.asset.json";
import vfRadhika from "@/assets/faculty/visiting/radhika-narayanan.png.asset.json";
import vfPratap from "@/assets/faculty/visiting/pratap-giri.png.asset.json";
import vfPradeep from "@/assets/faculty/visiting/pradeep-hota.png.asset.json";
import vfHarshali from "@/assets/faculty/visiting/harshali-damle.png.asset.json";
import vfAmit from "@/assets/faculty/visiting/amit-shrivastava.png.asset.json";
import vfMihir from "@/assets/faculty/visiting/mihir-mankad.png.asset.json";
import vfShruti from "@/assets/faculty/visiting/shruti-mantri.png.asset.json";
import vfAlireza from "@/assets/faculty/visiting/alireza-kabirian.png.asset.json";
import vfSundar from "@/assets/faculty/visiting/sundar-venkatesh.png.asset.json";
import vfDaniel from "@/assets/faculty/visiting/daniel-vandervliet.png.asset.json";
import vfKrishanu from "@/assets/faculty/visiting/krishanu-rakshit.png.asset.json";
import vfLanMa from "@/assets/faculty/visiting/lan-ma.png.asset.json";
import vfRajat from "@/assets/faculty/visiting/rajat-baijal.png.asset.json";
import vfBenjamin from "@/assets/faculty/visiting/benjamin-dunford.png.asset.json";
import vfMeenakshi from "@/assets/faculty/visiting/meenakshi-rishi.png.asset.json";
import vfVijaya from "@/assets/faculty/visiting/vijaya-marisetty.png.asset.json";
import vfShad from "@/assets/faculty/visiting/shad-morris.png.asset.json";
import vfZal from "@/assets/faculty/visiting/zal-phiroz.png.asset.json";
import vfGarrick from "@/assets/faculty/visiting/garrick-hileman.png.asset.json";
import vfJyotsna from "@/assets/faculty/visiting/jyotsna-bhatnagar.png.asset.json";
import vfVishnu from "@/assets/faculty/visiting/vishnuprasad-n.png.asset.json";
import vfRajesh from "@/assets/faculty/visiting/rajesh-bhargave.png.asset.json";

// Career logos
import rMckinsey from "@/assets/recruiter-logos/McKinsey.png.asset.json";
import rBain from "@/assets/recruiter-logos/Bain.png.asset.json";
import rBcg from "@/assets/recruiter-logos/BCG.png.asset.json";
import rAccenture from "@/assets/recruiter-logos/Accenture.png.asset.json";
import rDeloitte from "@/assets/recruiter-logos/Deloitte.png.asset.json";
import rEy from "@/assets/recruiter-logos/EY.png.asset.json";
import rPwc from "@/assets/recruiter-logos/PWC.png.asset.json";
import rKearney from "@/assets/recruiter-logos/Kearney.png.asset.json";
import rOliverWyman from "@/assets/recruiter-logos/OliverWyman.png.asset.json";
import rGoogle from "@/assets/recruiter-logos/Google.png.asset.json";
import rMeta from "@/assets/recruiter-logos/Meta.png.asset.json";
import rMicrosoft from "@/assets/recruiter-logos/Microsoft.png.asset.json";
import rYoutube from "@/assets/recruiter-logos/Youtube.png.asset.json";
import rServicenow from "@/assets/recruiter-logos/Servicenow.png.asset.json";
import rFlipkart from "@/assets/recruiter-logos/Flipkart.png.asset.json";
import rZepto from "@/assets/recruiter-logos/Zepto.png.asset.json";
import rZomato from "@/assets/recruiter-logos/Zomato.png.asset.json";
import rUnacademy from "@/assets/recruiter-logos/Unacademy.png.asset.json";
import rPhysicsWallah from "@/assets/recruiter-logos/PhysicsWallah.png.asset.json";
import rMamaEarth from "@/assets/recruiter-logos/MamaEarth.png.asset.json";
import rIcici from "@/assets/recruiter-logos/ICICI.png.asset.json";
import rHsbc from "@/assets/recruiter-logos/HSBC.png.asset.json";
import rCiti from "@/assets/recruiter-logos/CITI.png.asset.json";
import rAmex from "@/assets/recruiter-logos/AmericanExpress.png.asset.json";
import rRazorpay from "@/assets/recruiter-logos/Razorpay.png.asset.json";
import rPineLabs from "@/assets/recruiter-logos/PineLabs.png.asset.json";
import rCred from "@/assets/recruiter-logos/Cred.png.asset.json";
import rGoodCapital from "@/assets/recruiter-logos/GoodCapital.png.asset.json";
import rWaterbridge from "@/assets/recruiter-logos/Waterbridge.png.asset.json";
import rAntler from "@/assets/recruiter-logos/Antler.png.asset.json";
import rStride from "@/assets/recruiter-logos/StrideVentures.png.asset.json";
import rIpv from "@/assets/recruiter-logos/IPV.png.asset.json";
import rKapture from "@/assets/recruiter-logos/Kapture.png.asset.json";
import rTwyn from "@/assets/recruiter-logos/Twyn.png.asset.json";
import rWebengage from "@/assets/recruiter-logos/Webengage.png.asset.json";
import rZycus from "@/assets/recruiter-logos/Zycus.png.asset.json";
import rMindtickle from "@/assets/recruiter-logos/Mindtickle.png.asset.json";

// Startup / venture logos
import vBambaii from "@/assets/venture-logos/Bambaii.png.asset.json";
import vBanaroma from "@/assets/venture-logos/Banaroma.png.asset.json";
import vBeyondVeda from "@/assets/venture-logos/BeyondVeda.png.asset.json";
import vBlueBrew from "@/assets/venture-logos/BlueBrew.png.asset.json";
import vBullspree from "@/assets/venture-logos/Bullspree.png.asset.json";
import vEight from "@/assets/venture-logos/EIGHT.png.asset.json";
import vEatAtlas from "@/assets/venture-logos/EatAtlas.png.asset.json";
import vEventsa from "@/assets/venture-logos/Eventsa.png.asset.json";
import vFnor from "@/assets/venture-logos/FNOR.png.asset.json";
import vFlourish from "@/assets/venture-logos/FlourishFoods.png.asset.json";
import vGuardex from "@/assets/venture-logos/Guardex.png.asset.json";
import vHiveschool from "@/assets/venture-logos/Hiveschool.png.asset.json";
import vJustMyRoots from "@/assets/venture-logos/JustMyRoots.png.asset.json";
import vKaze from "@/assets/venture-logos/Kaze.png.asset.json";
import vLexis from "@/assets/venture-logos/Lexis.png.asset.json";
import vMoms from "@/assets/venture-logos/Moms.png.asset.json";
import vMonarque from "@/assets/venture-logos/Monarque.png.asset.json";
import vNivara from "@/assets/venture-logos/Nivara.png.asset.json";
import vOfflyn from "@/assets/venture-logos/Offlyn.png.asset.json";
import vPixel from "@/assets/venture-logos/Pixel.png.asset.json";
import vPlaysuper from "@/assets/venture-logos/Playsuper.png.asset.json";
import vSaaha from "@/assets/venture-logos/Saaha.png.asset.json";
import vSeedsAI from "@/assets/venture-logos/SeedsAI.png.asset.json";
import vShrnm from "@/assets/venture-logos/Shrnm.png.asset.json";
import vSpawnRight from "@/assets/venture-logos/SpawnRight.png.asset.json";
import vStartt from "@/assets/venture-logos/Startt.png.asset.json";
import vTrueBrands from "@/assets/venture-logos/TrueBrandsIndia.png.asset.json";
import vVinyasa from "@/assets/venture-logos/Vinyasa.png.asset.json";
import vWittyAdverts from "@/assets/venture-logos/WittyAdverts.png.asset.json";
import vWoodys from "@/assets/venture-logos/WoodysPizzeria.png.asset.json";
import vYango from "@/assets/venture-logos/Yango.png.asset.json";


// Academic partner logos
import wbs from "@/assets/immersion-logos/wbs.png.asset.json";
import imperial from "@/assets/immersion-logos/imperial-1.png.asset.json";
import babson from "@/assets/immersion-logos/babson.png.asset.json";
import ivey from "@/assets/immersion-logos/ivey.png.asset.json";
import escp from "@/assets/immersion-logos/escp.png.asset.json";
import bocconi from "@/assets/immersion-logos/sda-bocconi.png.asset.json";
import cuhk from "@/assets/immersion-logos/cuhk.png.asset.json";
import smu from "@/assets/immersion-logos/smu.png.asset.json";
import nbs from "@/assets/immersion-logos/nbs.png.asset.json";
import foster from "@/assets/immersion-logos/foster.png.asset.json";
import illinois from "@/assets/immersion-logos/illinois-tech.png.asset.json";
import uc from "@/assets/immersion-logos/uc.png.asset.json";
import griffith from "@/assets/immersion-logos/griffith.png.asset.json";

// Corporate immersion logos
import porsche from "@/assets/immersions/global/porsche.png.asset.json";
import philips from "@/assets/immersions/global/philips.png.asset.json";
import heineken from "@/assets/immersions/global/heineken.png.asset.json";
import rabobank from "@/assets/immersions/global/rabobank.png.asset.json";
import rakuten from "@/assets/immersions/global/rakuten.png.asset.json";
import agoda from "@/assets/immersions/global/agoda.png.asset.json";
import nissan from "@/assets/immersions/global/nissan.png.asset.json";
import stationF from "@/assets/immersions/global/station-f.png.asset.json";
import unitedNations from "@/assets/immersions/global/united-nations.png.asset.json";
import godrej from "@/assets/immersions/bharat/godrej.png.asset.json";
import itc from "@/assets/immersions/bharat/itc.png.asset.json";
import infosys from "@/assets/immersions/bharat/infosys.png.asset.json";
import zeptoImm from "@/assets/immersions/bharat/zepto.png.asset.json";
import credImm from "@/assets/immersions/bharat/cred.png.asset.json";
import amul from "@/assets/immersions/bharat/amul.png.asset.json";
import rbi from "@/assets/immersions/bharat/rbi.png.asset.json";
import nse from "@/assets/immersions/bharat/nse.png.asset.json";
import lenskart from "@/assets/immersions/bharat/lenskart.png.asset.json";

// Alumni portraits
import danielNathImg from "@/assets/alumni/daniel-nath.png.asset.json";
import jeneeshaImg from "@/assets/alumni/jeneesha-singh.png.asset.json";
import deepankerImg from "@/assets/alumni/deepanker-mathur.png.asset.json";
import vibhorImg from "@/assets/alumni/vibhor-agarwal.png.asset.json";
import mehulImg from "@/assets/alumni/mehul-soni.png.asset.json";
import anuragImg from "@/assets/alumni/anurag-bansal.png.asset.json";


// Founder portraits + Shark Tank stage
import sharkTankStage from "@/assets/founders/sharktank-stage.jpg.asset.json";
import stHiveschool from "@/assets/sharktank/HiveSchool.png.asset.json";
import stMetaFashion from "@/assets/sharktank/MetaFashion.png.asset.json";
import stHookD from "@/assets/sharktank/HookD.png.asset.json";
import stNexera from "@/assets/sharktank/NexeraHealth.png.asset.json";
import stMemoTag from "@/assets/sharktank/MemoTag.png.asset.json";
import stBullspree from "@/assets/sharktank/Bullspree.png.asset.json";
import vfBullspree from "@/assets/founders/ventures/bullspree.jpg.asset.json";
import vfEight from "@/assets/founders/ventures/eight.jpg.asset.json";
import vfHiveschool from "@/assets/founders/ventures/hiveschool.jpg.asset.json";
import vfLexis from "@/assets/founders/ventures/lexis.jpg.asset.json";
import vfPlaysuper from "@/assets/founders/ventures/playsuper.jpg.asset.json";
import vfSeedsai from "@/assets/founders/ventures/seedsai.jpg.asset.json";
import vfWoodys from "@/assets/founders/ventures/woodys.jpg.asset.json";

type Stat = { value: string; label: string };
type Section = {
  id: string;
  eyebrow: string;
  title: string;
  titleItalic: string;
  lede: string;
  bg: string;
  cta: { label: string; to: string };
  download?: { label: string; href: string };
  stats: Stat[];
};

const FACULTY_ALL: { name: string; role: string; company: string; img?: string; category: "Industry" | "Full-Time" | "Visiting" }[] = [
  // Industry Practitioners — verified roles + portraits
  ...INDUSTRY_PRACTITIONERS.map((p) => ({
    name: p.name,
    role: p.role,
    company: p.company,
    img: p.img,
    category: "Industry" as const,
  })),
  { name: "Manoj Kohli", role: "Former CEO & MD", company: "SoftBank India", img: manoj.url, category: "Industry" },
  { name: "Captain Raghu Raman", role: "Former President", company: "Reliance Industries", img: raghuRaman.url, category: "Industry" },
  { name: "Rajat Mathur", role: "Former Managing Director", company: "Morgan Stanley", category: "Industry" },
  { name: "Rohit Kapoor", role: "CEO, Food Marketplace", company: "Swiggy", category: "Industry" },
  { name: "Malthi Satish", role: "Former Director, Product", company: "PayPal", category: "Industry" },
  { name: "Dr Arvind Mayaram", role: "Former Finance Secretary", company: "Government of India", category: "Industry" },
  { name: "Saurabh Sengupta", role: "Former VP", company: "Zomato", category: "Industry" },
  { name: "Rachel Konrad", role: "Former Director of Communications", company: "Tesla", category: "Industry" },
  { name: "Vivek Gambhir", role: "Former CEO", company: "boAt", category: "Industry" },
  { name: "Sanjiv Bhasin", role: "Former Director", company: "IIFL", category: "Industry" },
  { name: "Dave Lewis", role: "Former Group CEO", company: "Tesco", img: daveLewis.url, category: "Industry" },
  { name: "Havish Madhvapaty", role: "Industry Practitioner", company: "Masters' Union", img: havish.url, category: "Industry" },
  { name: "Ekhlaque Bari", role: "Industry Practitioner", company: "Masters' Union", img: ekhlaque.url, category: "Industry" },
  { name: "Sumit Shukla", role: "Industry Practitioner", company: "Masters' Union", img: sumit.url, category: "Industry" },
  { name: "Aditya Turalapati", role: "Industry Practitioner", company: "Masters' Union", img: aditya.url, category: "Industry" },
  { name: "Parikshit Khanna", role: "Industry Practitioner", company: "Masters' Union", img: parikshit.url, category: "Industry" },
  { name: "Karmanya Suri", role: "Industry Practitioner", company: "Masters' Union", img: karmanya.url, category: "Industry" },
  { name: "Gaurav Arora", role: "Industry Practitioner", company: "Masters' Union", img: gauravA.url, category: "Industry" },


  // Full-Time Faculty (Masters-in-Residence)
  ...FULL_TIME_FACULTY.map((f) => ({
    name: f.name,
    role: f.role,
    company: f.credential,
    img: f.img,
    category: "Full-Time" as const,
  })),


  // Visiting Faculty
  { name: "Dr Zal Phiroz", role: "Adjunct Professor, Supply Chain", company: "Harvard University", img: vfZal.url, category: "Visiting" },
  { name: "Daniel G. Van Der Vliet", role: "Executive Director, Family Business", company: "Cornell University", img: vfDaniel.url, category: "Visiting" },
  { name: "Dr Lan Ma", role: "Adjunct Professor of Business", company: "NYU Stern", img: vfLanMa.url, category: "Visiting" },
  { name: "Mihir Mankad", role: "Senior Lecturer", company: "Harvard Kennedy School", img: vfMihir.url, category: "Visiting" },
  { name: "Dr Rajesh Bhargave", role: "Associate Professor of Marketing", company: "Imperial College London", img: vfRajesh.url, category: "Visiting" },
  { name: "Rajat Baijal", role: "Adjunct Professor, Enterprise Risk", company: "Columbia University", img: vfRajat.url, category: "Visiting" },
  { name: "Dr Shad Morris", role: "Professor of Global Strategy", company: "Brigham Young University", img: vfShad.url, category: "Visiting" },
  { name: "Meenakshi Rishi", role: "Professor of Economics", company: "Seattle University", img: vfMeenakshi.url, category: "Visiting" },
  { name: "Dr Alireza Kabirian", role: "Professor of Data Sciences", company: "USC", img: vfAlireza.url, category: "Visiting" },
  { name: "Benjamin Dunford", role: "Professor of Management", company: "Purdue University", img: vfBenjamin.url, category: "Visiting" },
  { name: "Dr Garrick Hileman", role: "Visiting Fellow", company: "London School of Economics", img: vfGarrick.url, category: "Visiting" },
  { name: "Shruti Mantri", role: "Associate Director", company: "ISB", img: vfShruti.url, category: "Visiting" },
  { name: "Dr Krishanu Rakshit", role: "Professor of Marketing", company: "IIM Calcutta", img: vfKrishanu.url, category: "Visiting" },
  { name: "Dr Jyotsna Bhatnagar", role: "Professor of OB & HRM", company: "MDI Gurgaon", img: vfJyotsna.url, category: "Visiting" },
  { name: "Vijaya Bhaskar Marisetty", role: "Professor of Finance", company: "University of Hyderabad", img: vfVijaya.url, category: "Visiting" },
  { name: "Dr Sundar Venkatesh", role: "Visiting Faculty", company: "Asian Institute of Technology", img: vfSundar.url, category: "Visiting" },
  { name: "Utkarsh Majmudar", role: "Visiting Faculty · Finance", company: "IIM Bangalore", img: vfUtkarsh.url, category: "Visiting" },
  { name: "Kaushal Kumar Bhagat", role: "Visiting Faculty", company: "IIT Kharagpur", img: vfKaushal.url, category: "Visiting" },
  { name: "Dr Thomas Joseph", role: "Visiting Faculty", company: "Masters' Union", img: vfThomas.url, category: "Visiting" },
  { name: "Dr Pratap Giri", role: "Visiting Faculty", company: "Masters' Union", img: vfPratap.url, category: "Visiting" },
  { name: "Dr Harshali Damle", role: "Visiting Faculty", company: "Masters' Union", img: vfHarshali.url, category: "Visiting" },
  { name: "Souvik Dutta", role: "Visiting Faculty", company: "Masters' Union", img: vfSouvik.url, category: "Visiting" },
  { name: "Radhika Narayanan", role: "Visiting Faculty", company: "Masters' Union", img: vfRadhika.url, category: "Visiting" },
  { name: "Akash Krishnan", role: "Visiting Faculty", company: "Masters' Union", img: vfAkash.url, category: "Visiting" },
  { name: "Pradeep Hota", role: "Visiting Faculty", company: "Masters' Union", img: vfPradeep.url, category: "Visiting" },
  { name: "Amit Shrivastava", role: "Visiting Faculty", company: "Masters' Union", img: vfAmit.url, category: "Visiting" },
  { name: "Dr Vishnuprasad N.", role: "Visiting Faculty", company: "Masters' Union", img: vfVishnu.url, category: "Visiting" },
];


const FACULTY_MIX = [
  { key: "Industry", pct: "50%", title: "Industry Practitioners", body: "CEOs, founders and operators teaching what they're building today." },
  { key: "Full-Time", pct: "30%", title: "Full-Time Faculty", body: "PhDs from India's and the world's top institutions. FT50 / A* research." },
  { key: "Visiting", pct: "20%", title: "Visiting Faculty", body: "Professors from Harvard, Stanford, Wharton, Kellogg, Columbia, NYU, Cornell, Imperial." },
];

const CAREER_GROUPS = [
  { label: "Consulting", logos: [rMckinsey, rBain, rBcg, rAccenture, rDeloitte, rEy, rPwc, rKearney, rOliverWyman] },
  { label: "Large Tech", logos: [rGoogle, rMeta, rMicrosoft, rYoutube, rServicenow] },
  { label: "Consumer Tech", logos: [rFlipkart, rZomato, rZepto, rUnacademy, rPhysicsWallah, rMamaEarth] },
  { label: "BFSI", logos: [rIcici, rHsbc, rCiti, rAmex, rRazorpay, rPineLabs, rCred] },
  { label: "Venture Capital", logos: [rGoodCapital, rWaterbridge, rAntler, rStride, rIpv] },
  { label: "Emerging Tech", logos: [rKapture, rTwyn, rWebengage, rZycus, rMindtickle] },
];

const VENTURE_GROUPS = [
  { label: "Food & Beverage", logos: [vBlueBrew, vEatAtlas, vFlourish, vMoms, vWoodys, vBeyondVeda, vSaaha, vJustMyRoots, vBanaroma, vVinyasa] },
  { label: "Consumer Brands", logos: [vBambaii, vKaze, vLexis, vMonarque, vNivara, vFnor, vTrueBrands, vGuardex, vShrnm, vYango] },
  { label: "Tech & Platforms", logos: [vOfflyn, vPlaysuper, vSeedsAI, vHiveschool, vSpawnRight, vBullspree, vEventsa, vWittyAdverts, vPixel, vStartt, vEight] },
];

const PARTNER_GROUPS = [
  { label: "Academic", logos: [wbs, escp, bocconi, nbs, babson, ivey, foster, illinois, uc, smu, griffith] },
  { label: "Corporate", logos: [porsche, philips, heineken, rabobank, rakuten, agoda, nissan, stationF, unitedNations, godrej, itc, infosys, zeptoImm, credImm, amul, nse, lenskart] },
];

const FACULTY_SECTION: Section = {
  id: "faculty",
  eyebrow: "Faculty",
  title: "Taught by people who ",
  titleItalic: "actually did it.",
  lede: "Our faculty is a deliberate 50 / 30 / 20 mix of industry practitioners, tenured PhDs and visiting global professors. CXOs, founders and operators lead the majority of classes, while academic rigour is anchored by researchers from Ivy+ and top global schools.",
  bg: "bg-white",
  cta: { label: "Meet the faculty", to: "/faculty" },
  stats: [
    { value: "500+", label: "Faculty" },
    { value: "60+", label: "PhDs" },
    { value: "12", label: "Ivy+ schools" },
  ],
};

const CAREER_SECTION: Section = {
  id: "career",
  eyebrow: "Career Outcomes",
  title: "Placed where ",
  titleItalic: "decisions are made.",
  lede: "Students graduate into consulting, product, finance and venture roles at the firms shaping the next decade — from McKinsey and Bain to Meta, Flipkart and Bloomberg. Every batch is supported by a dedicated placements team, live recruiter access and year-round industry projects.",
  bg: "bg-[#F5F3EE]",
  cta: { label: "Placements", to: "/placements" },
  download: { label: "Download placement report", href: "/placement-report.pdf" },
  stats: [],
};

type RichStat = { value: string; label: string; note?: string; delta?: string };

const CAREER_RICH_STATS: RichStat[] = [
  { value: "96%", label: "Placement rate", note: "Across last 3 cohorts", delta: "▲ 2%" },
  { value: "₹32.4L", label: "Median CTC", note: "Full-time offers", delta: "▲ 11%" },
  { value: "₹1.1Cr", label: "Highest CTC", note: "International offer" },
  { value: "400+", label: "Recruiters", note: "Hiring on campus" },
  { value: "60+", label: "Roles / batch", note: "Product · Consulting · Finance" },
  { value: "18", label: "Countries", note: "Where alumni work today" },
];

const VENTURES_RICH_STATS: RichStat[] = [
  { value: "120+", label: "Student startups", note: "Launched during programme", delta: "▲ 24 YoY" },
  { value: "₹85 Cr+", label: "Raised by alumni", note: "Seed & pre-seed rounds" },
  { value: "$10M", label: "In-house fund", note: "Deployed via MU Ventures" },
  { value: "40+", label: "Founder mentors", note: "Unicorn & YC operators" },
  { value: "6", label: "Shark Tank features", note: "On-air deals & offers" },
  
];

const VENTURES_SECTION: Section = {
  id: "entrepreneurship",
  eyebrow: "Entrepreneurship",
  title: "Companies started ",
  titleItalic: "before graduation.",
  lede: "Entrepreneurship at Masters' Union isn't a club — it's an operating system. Students access pre-seed capital, in-house founder studios and GTM labs, and launch real companies while they study, backed by mentors who have built and scaled ventures themselves.",
  bg: "bg-white",
  cta: { label: "MU Ventures", to: "/mu-ventures" },
  download: {
    label: "Download entrepreneurship report",
    href: "/entrepreneurship-report.pdf",
  },
  stats: [],
};

function StatsBand({ stats, tone = "light" }: { stats: RichStat[]; tone?: "light" | "cream" }) {
  const border = tone === "cream" ? "border-black/10" : "border-black/10";
  const bg = tone === "cream" ? "bg-white" : "bg-[#F5F3EE]";
  const n = stats.length;
  return (
    <div className={`mb-5 overflow-hidden rounded-2xl border ${border} ${bg}`}>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:[grid-template-columns:var(--stat-cols)]"
        style={{ ["--stat-cols" as string]: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`relative px-4 py-3 md:px-4 md:py-3.5 ${
              i % 2 === 1 ? "border-l border-black/10" : ""
            } ${i >= 2 ? "border-t border-black/10 md:border-t-0" : ""} ${
              i % 3 !== 0 ? "md:border-l md:border-black/10" : ""
            } ${i >= 3 ? "md:border-t md:border-black/10 lg:border-t-0" : ""} ${
              i !== 0 ? "lg:border-l lg:border-black/10" : "lg:border-l-0"
            }`}
          >

            <div className="flex items-baseline gap-1.5">
              <div
                className="text-[clamp(1.25rem,1.7vw,1.6rem)] font-semibold leading-none tracking-tight text-black"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {s.value}
              </div>
              {s.delta && (
                <span className="rounded-full bg-[#DDE7D6] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#3F5B33]">
                  {s.delta}
                </span>
              )}
            </div>
            <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-black/70">
              {s.label}
            </div>
            {s.note && (
              <div className="mt-0.5 text-[10px] leading-snug text-black/50">{s.note}</div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}


const PARTNERS_SECTION: Section = {
  id: "partnerships",
  eyebrow: "Academic Partnerships",
  title: "Immersions across ",
  titleItalic: "the world's best schools.",
  lede: "Every Masters' Union student spends weeks studying on the campuses of the world's leading business schools — Warwick, Imperial, Babson, Ivey, ESCP, SDA Bocconi and more. Alongside academics, we partner deeply with India's most iconic companies to bring real boardrooms, factories and trading floors into the classroom.",
  bg: "bg-[#F5F3EE]",
  cta: { label: "Immersion programmes", to: "/immersions" },
  stats: [
    { value: "13", label: "Partner schools" },
    { value: "9", label: "Countries" },
    { value: "4 wks", label: "Avg. immersion" },
  ],
};

function ShowcaseShell({
  section,
  children,
  aside,
}: {
  section: Section;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section id={section.id} className={`border-t border-black/10 ${section.bg}`}>
      <div className="mx-auto max-w-[1280px] px-5 py-7 md:px-10 md:py-9">
        <div className="mb-6 flex flex-col gap-5 md:mb-8 md:flex-row md:items-end md:justify-between">

          <div className="max-w-[52ch]">
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-black/50">
              {section.eyebrow}
            </p>
            <h2
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-tight text-black"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {section.title}
              <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                {section.titleItalic}
              </span>
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-black/60">{section.lede}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to={section.cta.to}
                className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black/85"
              >
                {section.cta.label}
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {section.download && (
                <a
                  href={section.download.href}
                  download
                  className="group inline-flex items-center gap-2 border-b border-black/25 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition hover:border-black"
                >
                  <Download className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                  {section.download.label}
                </a>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-5 md:w-auto md:items-end">
            {aside && <div className="w-full md:w-[380px] lg:w-[420px]">{aside}</div>}

            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:gap-8 md:text-right">
              {section.stats.map((s) => (
                <div key={s.label} className="min-w-0">
                  <dd
                    className="text-xl font-semibold tracking-tight text-black md:text-2xl"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {s.value}
                  </dd>
                  <dt className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/50">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

        </div>
        {children}
      </div>
    </section>
  );
}

type Logo = { url: string; original_filename: string };
type LogoGroup = { label: string; logos: Logo[] };

// Renders a logo sized so its bounding width is roughly uniform across the wall.
// Wide logos shrink in height; short/square logos grow in height (within limits)
// so a tall-narrow mark doesn't look smaller than a wide wordmark.
function NormalizedLogo({ src, alt, size = "md" }: { src: string; alt: string; size?: "sm" | "md" | "lg" }) {
  const boost = /meta|microsoft/i.test(alt)
    ? 1.6
    : /servicenow|ipv/i.test(alt)
    ? 0.42
    : /amul|infosys|zepto|nse|youtube|flipkart|google|physics.?wallah|mamaearth|antler|stride|inflection|webengage/i.test(alt)
    ? 0.6
    : 1;
  const initial = (size === "sm" ? 28 : size === "lg" ? 60 : 44) * boost;
  const [h, setH] = useState<number>(initial);
  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / Math.max(1, img.naturalHeight);
    const targetWidth = (size === "sm" ? 80 : size === "lg" ? 160 : 120) * boost;
    const raw = targetWidth / Math.max(0.4, ratio);
    const baseRange: [number, number] = size === "sm" ? [18, 40] : size === "lg" ? [40, 84] : [28, 64];
    const [min, max] = [baseRange[0] * boost, baseRange[1] * boost];
    const clamped = Math.max(min, Math.min(max, raw));
    setH(clamped);
  };
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={onLoad}
      style={{ height: `${h}px` }}
      className="w-auto max-w-full object-contain opacity-95 transition duration-300 hover:opacity-100"
    />
  );
}




function CategorizedLogos({ groups, withFilter = false, size = "md" }: { groups: LogoGroup[]; withFilter?: boolean; size?: "sm" | "md" | "lg" }) {
  const [active, setActive] = useState<string>("All");
  const total = groups.reduce((sum, g) => sum + g.logos.length, 0);
  const tabs = [{ label: "All", count: total }, ...groups.map((g) => ({ label: g.label, count: g.logos.length }))];
  const visible: Logo[] = !withFilter || active === "All"
    ? groups.flatMap((g) => g.logos)
    : groups.find((g) => g.label === active)?.logos ?? [];

  const gridCls = size === "sm"
    ? "grid grid-cols-4 gap-x-4 gap-y-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8"
    : size === "lg"
    ? "grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    : "grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6";
  const cellCls = size === "sm"
    ? "flex h-14 items-center justify-center rounded-md border border-black/[0.05] bg-white px-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition hover:border-black/15 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
    : size === "lg"
    ? "flex h-28 items-center justify-center rounded-lg border border-black/[0.06] bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition hover:border-black/15 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
    : "flex h-20 items-center justify-center rounded-lg border border-black/[0.06] bg-white px-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition hover:border-black/15 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]";

  return (
    <div>
      {withFilter && (
        <div className="mb-6 flex flex-wrap items-center gap-1.5">
          {tabs.map((t) => {
            const isActive = t.label === active;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setActive(t.label)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-tight transition ${
                  isActive ? "bg-black text-white" : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
                }`}
              >
                {t.label}
                <span className={`font-mono text-[10px] ${isActive ? "text-white/60" : "text-black/40"}`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className={gridCls}>
        {visible.map((l) => {
          const name = l.original_filename.replace(/\.png$/i, "");
          return (
            <div key={l.url} title={name} className={cellCls}>
              <NormalizedLogo src={l.url} alt={name} size={size} />
            </div>
          );
        })}
      </div>

    </div>
  );
}


function FacultyBlock() {
  const [active, setActive] = useState<string>("Industry");

  // Only show faculty with an actual portrait — avoids empty placeholder tiles.
  const withPhotos = FACULTY_ALL.filter((f) => Boolean(f.img));
  const visible = active === "All" ? withPhotos : withPhotos.filter((f) => f.category === active);

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {/* Left: vertical mix (clickable filters) */}
      <div className="flex flex-col">
        <div className="flex items-baseline justify-between border-b border-black/10 pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/40">
            The 50 / 30 / 20 mix
          </span>
          {active !== "All" && (
            <button
              type="button"
              onClick={() => setActive("All")}
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45 transition hover:text-black"
            >
              Show all
            </button>
          )}
        </div>

        <div className="divide-y divide-black/10 border-b border-black/10">
          {FACULTY_MIX.map((m) => {
            const isActive = active === m.key;
            const count = withPhotos.filter((f) => f.category === m.key).length;
            return (
              <button
                key={m.title}
                type="button"
                onClick={() => setActive(isActive ? "All" : m.key)}
                aria-pressed={isActive}
                className={`group relative w-full overflow-hidden px-4 py-5 text-left transition-colors duration-300 md:px-5 ${
                  isActive ? "bg-[#111]" : "bg-transparent hover:bg-black/[0.03]"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-[3px] transition-all duration-300 ${
                    isActive ? "bg-[#C9A84C]" : "bg-transparent group-hover:bg-black/15"
                  }`}
                />
                <div className="flex items-start gap-5">
                  <span
                    className={`min-w-[74px] text-[34px] font-semibold leading-none tracking-tight transition-colors md:text-[40px] ${
                      isActive ? "text-white" : "text-black"
                    }`}
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {m.pct}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className={`text-[13px] font-semibold tracking-tight ${
                          isActive ? "text-white" : "text-black"
                        }`}
                      >
                        {m.title}
                      </h3>
                      <span
                        className={`shrink-0 font-mono text-[10px] tabular-nums ${
                          isActive ? "text-white/45" : "text-black/35"
                        }`}
                      >
                        {count} profiles
                      </span>
                    </div>
                    <p
                      className={`mt-1.5 text-[12px] leading-snug ${
                        isActive ? "text-white/65" : "text-black/55"
                      }`}
                    >
                      {m.body}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>


      {/* Right: faculty images with designations */}
      <FacultyPager key={active} items={visible} />
    </div>
  );
}

function FacultyPager({ items }: { items: typeof FACULTY_ALL }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const PER_PAGE = 12; // 4 cols x 3 rows
  const pages: typeof FACULTY_ALL[] = [];
  for (let i = 0; i < items.length; i += PER_PAGE) pages.push(items.slice(i, i + PER_PAGE));
  const totalPages = Math.max(1, pages.length);

  const go = (dir: 1 | -1) => {
    const next = Math.min(totalPages - 1, Math.max(0, page + dir));
    setPage(next);
    const el = scrollerRef.current;
    if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          const p = Math.round(el.scrollLeft / el.clientWidth);
          if (p !== page) setPage(p);
        }}
      >
        {pages.map((pageItems, pi) => (
          <div key={pi} className="w-full flex-shrink-0 snap-start">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4">
              {pageItems.map((f) => (
                <figure key={f.name} title={f.name} className="group flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
                    {f.img ? (
                      <img
                        src={f.img}
                        alt={f.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.04]"
                      />

                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-2xl tracking-tight text-black/35"
                        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                      >
                        {f.name.replace(/^Dr\s+|^Captain\s+/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-2">
                    <div className="text-[11px] font-semibold leading-tight tracking-tight text-black">
                      {f.name}
                    </div>
                    <div className="mt-0.5 text-[10px] leading-tight text-black/60">{f.role}</div>
                    <div className="text-[10px] leading-tight text-black/45">{f.company}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
            {page + 1} / {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={page === 0}
              aria-label="Previous faculty"
              className="flex h-9 w-9 items-center justify-center border border-black/15 text-black transition hover:border-black disabled:opacity-30 disabled:hover:border-black/15"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={page >= totalPages - 1}
              aria-label="Next faculty"
              className="flex h-9 w-9 items-center justify-center border border-black/15 text-black transition hover:border-black disabled:opacity-30 disabled:hover:border-black/15"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


const ALUM_STORIES = [
  { name: "Daniel Nath", role: "Strategy Lead", company: "Google", photo: danielNathImg.url, quote: "MU's live projects put me across the table from real operators before I'd graduated." },
  { name: "Jeneesha Singh", role: "Consultant", company: "Bain & Company", photo: jeneeshaImg.url, quote: "Case work with practitioner faculty rewired how I structure a problem end to end." },
  { name: "Deepankar Mathur", role: "Founder's Office", company: "Zerodha", photo: deepankerImg.url, quote: "Two years of live capital markets work at MU is why the founder's office felt like home." },
  { name: "Vibhor Agarwal", role: "Founder's Office", company: "Hike", photo: vibhorImg.url, quote: "I shipped product from Day 1 at MU — that's the only reason I could ship from Day 1 at Hike." },
  { name: "Mehul Soni", role: "Quantitative Trader", company: "Avirom Capital", photo: mehulImg.url, quote: "The quant electives at MU are the reason I could sit a trading desk interview and hold my own." },
  { name: "Anurag Bansal", role: "Founder's Office", company: "Zerodha", photo: anuragImg.url, quote: "MU made the leap from classroom to a 12-person founder's team feel like the next class, not a jump." },
];


function AlumStories() {
  const items = ALUM_STORIES.length >= 6
    ? ALUM_STORIES.slice(0, 6)
    : ALUM_STORIES.concat(ALUM_STORIES).slice(0, 6);

  return (
    <div className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-8">
        {items.map((alum, i) => (
          <figure key={`${alum.name}-${i}`} className="flex flex-col">
            <div className="relative w-full aspect-[2/5] overflow-hidden bg-neutral-200">
              <img
                src={alum.photo}
                alt={alum.name}
                className="absolute inset-0 h-full w-full object-cover object-top grayscale contrast-[1.05]"
              />
            </div>
            <figcaption className="mt-3 pr-1">
              <p className="text-[13px] font-semibold text-black leading-tight">
                {alum.name}.
              </p>
              <p className="mt-2 text-[11px] leading-[1.5] text-neutral-700 italic">
                &ldquo;{alum.quote}&rdquo;
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-neutral-500 not-italic">
                {alum.role}, {alum.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}




const FOUNDER_STORIES = [
  {
    name: "Dharmil Bavishi",
    role: "Founder & CEO",
    company: "Bullspree",
    photo: vfBullspree.url,
    quote: "Built India's favourite stock-market playground out of the MU Ventures studio — from prototype to Shark Tank in under two years.",
    tag: "Fintech · Seed",
  },
  {
    name: "Nikhil Gaur",
    role: "Founder & CEO",
    company: "Hiveschool",
    photo: vfHiveschool.url,
    quote: "India's first sales school. The GTM lab put my first 100 hires and my first 100 customers in the same room.",
    tag: "EdTech · Series A",
  },
  {
    name: "Sarthak Bakshi",
    role: "Co-founder",
    company: "PlaySuper",
    photo: vfPlaysuper.url,
    quote: "Building the rewards layer for India's gaming ecosystem — pre-seed cheque closed the same week we pitched the in-house fund.",
    tag: "Gaming · Pre-seed",
  },
  {
    name: "The Lexi's team",
    role: "Founding team",
    company: "Lexi's",
    photo: vfLexis.url,
    quote: "Four co-founders, one cohort. Lexi's was born in an MU studio and shipped its first 1,000 orders from the campus food court.",
    tag: "D2C · Consumer",
  },
  {
    name: "The SeedsAI founders",
    role: "Co-founders",
    company: "SeedsAI",
    photo: vfSeedsai.url,
    quote: "Applied-AI for the next billion enterprises — from a class project to a paid pilot in one semester.",
    tag: "AI · Pre-seed",
  },
  {
    name: "Ansh Somani",
    role: "Founder",
    company: "Woody's Pizzeria",
    photo: vfWoodys.url,
    quote: "One oven, one MU cohort of taste-testers, and a first store that broke even in six weeks.",
    tag: "F&B · Bootstrapped",
  },
];

function FounderFilmstrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 12 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className="pt-1 pb-2">
      <div className="mb-3 flex items-end justify-between gap-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-black/50">
          Founders in the making
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous founder"
            className="flex size-8 items-center justify-center rounded-full border border-black/15 bg-white text-black/70 transition hover:bg-black hover:text-white"
          >
            <span className="text-sm leading-none">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next founder"
            className="flex size-8 items-center justify-center rounded-full border border-black/15 bg-white text-black/70 transition hover:bg-black hover:text-white"
          >
            <span className="text-sm leading-none">→</span>
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FOUNDER_STORIES.map((f, i) => (
          <figure
            key={`${f.company}-${i}`}
            data-card
            className="group relative flex shrink-0 snap-start basis-[65%] flex-col sm:basis-[38%] md:basis-[25%]"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">
              <img
                src={f.photo}
                alt={`${f.name} — ${f.company}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center grayscale contrast-[1.05] transition duration-500 group-hover:grayscale-0"
              />
              <span className="absolute left-2 top-2 bg-black/70 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white">
                {f.tag}
              </span>
            </div>
            <figcaption className="mt-2 pr-1">
              <p className="text-[11px] font-semibold text-black leading-tight">{f.company}.</p>
              <p className="mt-1 text-[10.5px] leading-[1.45] text-neutral-700 italic line-clamp-2">
                &ldquo;{f.quote}&rdquo;
              </p>
              <p className="mt-1 text-[9.5px] uppercase tracking-wider text-neutral-500 not-italic">
                {f.name} · {f.role}
              </p>
            </figcaption>
          </figure>
        ))}

      </div>
    </div>
  );
}


const SHARK_TANK_PITCHES: Array<{
  company: string;
  founder: string;
  cohort: string;
  season: string;
  pitch: string;
  logo?: { url: string; original_filename: string };
  cardImg: string;
}> = [
  {
    company: "Nexera Health",
    founder: "Himanshu Rajpurohit",
    cohort: "CEO Challenge",
    season: "S4",
    pitch: "Redefining workplace wellness for India's fastest-growing companies.",
    logo: stNexera,
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/Frame16188739811.webp",
  },
  {
    company: "HookD",
    founder: "Dia Goel",
    cohort: "PGP TBM '23",
    season: "S5",
    pitch: "India's first ready-to-eat non-vegetarian snacking brand.",
    logo: stHookD,
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/Frame1618873983.webp",
  },
  {
    company: "Meta Fashion",
    founder: "Arjun Goel",
    cohort: "UG TBM '28",
    season: "S5",
    pitch: "Phygital commerce — connecting in-game discovery with real-world fashion.",
    logo: stMetaFashion,
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/SharkTankCard.webp",
  },
  {
    company: "Bullspree",
    founder: "Dharmil Bavishi",
    cohort: "PGP TBM '21",
    season: "S2",
    pitch: "India's favourite stock market playground for learning and investing.",
    logo: stBullspree,
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/Frame1618873979.webp",
  },
  {
    company: "HiveSchool",
    founder: "Nikhil Gaur",
    cohort: "PGP TBM '24",
    season: "S4",
    pitch: "India's first Sales School — training the next generation of GTM operators.",
    logo: stHiveschool,
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/Frame1618873982.webp",
  },
  {
    company: "MemoTag",
    founder: "Reyansh Juneja",
    cohort: "UG TBM '28",
    season: "S4",
    pitch: "AI-driven wearable purpose-built for dementia care.",
    logo: stMemoTag,
    cardImg: "https://images.mastersunion.link/uploads/25032026/v1/SharkTankCard16.webp",
  },
];

function SharkTankLogoBar() {
  return (
    <div className="relative overflow-hidden rounded-none border border-black/10 bg-[#F6F2E9] text-black">
      {/* warm editorial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 8% 0%, rgba(46,139,230,0.10) 0%, rgba(46,139,230,0) 55%), radial-gradient(90% 80% at 100% 100%, rgba(242,194,48,0.16) 0%, rgba(242,194,48,0) 60%)",
        }}
      />
      {/* hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-10 md:p-8">

        <div className="relative shrink-0 md:max-w-[300px]">

          <div className="relative">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-black/75">
              Featured on
            </p>
            <h4
              className="mt-2 text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.01em]"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                textShadow: "0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <span style={{ color: "#2E8BE6" }}>SHARK</span>{" "}
              <span style={{ color: "#2E8BE6" }}>TANK</span>{" "}
              <span style={{ color: "#F2C230" }}>INDIA.</span>
            </h4>

            <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-black/80">
              Six student-founded ventures on India's biggest startup stage.
            </p>
          </div>
        </div>


        <div className="grid flex-1 grid-cols-3 items-center gap-x-2 gap-y-5 sm:grid-cols-6 sm:gap-x-4">
          {SHARK_TANK_PITCHES.map((p) => {
            const isMeta = /meta\s*fashion/i.test(p.company);
            return (
              <div
                key={p.company}
                className="flex h-12 w-full items-center justify-center"
                title={p.company}
              >
                {p.logo ? (
                  <img
                    src={p.logo.url}
                    alt={p.company}
                    loading="lazy"
                    style={{ transform: isMeta ? "scale(0.82)" : undefined }}
                    className="h-8 w-full object-contain opacity-80 transition hover:opacity-100 [filter:brightness(0)]"
                  />
                ) : (
                  <span className="text-[11px] font-semibold text-black/70">{p.company}</span>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}


function UniformLogoList({ groups }: { groups: LogoGroup[] }) {
  const logos = groups.flatMap((g) => g.logos).slice(0, 16);
  return (
    <div className="grid grid-cols-4 gap-x-6 gap-y-8 sm:grid-cols-6 md:grid-cols-8">
      {logos.map((l) => {
        const name = l.original_filename.replace(/\.png$/i, "");
        return (
          <div key={l.url} className="flex h-14 items-center justify-center">
            <img
              src={l.url}
              alt={name}
              title={name}
              loading="lazy"
              className="max-h-10 w-auto max-w-[85%] object-contain opacity-95 transition duration-300 hover:opacity-100"
            />
          </div>
        );
      })}
    </div>
  );
}





function VideoLightbox({
  onClose,
  children,
  label,
}: {
  onClose: () => void;
  children: React.ReactNode;
  label: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[130] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[980px] overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
        >
          ✕
        </button>
        <div className="aspect-video w-full">{children}</div>
      </div>
    </div>
  );
}

function WatchCTA({
  eyebrow,
  title,
  blurb,
  action,
  onPlay,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  action: string;
  onPlay: () => void;
}) {
  return (
    <div className="group/cta relative mt-8 overflow-hidden pastel-gradient ring-1 ring-black/10 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)]">
      {/* decorative hairlines + glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(0,0,0,0.35)_1px,transparent_1px)] [background-size:56px_100%]" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-[280px] rounded-full bg-white/50 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #39B5D7, #F7D544, #E38330)" }}
      />

      <div className="relative flex flex-col items-start gap-7 p-6 md:flex-row md:items-center md:justify-between md:gap-12 md:p-8 lg:p-10">
        <div className="max-w-[42ch]">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
            {eyebrow}
          </p>
          <h3
            className="mt-3 text-balance text-2xl leading-[1.12] tracking-tight text-black md:text-3xl lg:text-[32px]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {title}
          </h3>
          <p className="mt-3 max-w-[38ch] text-pretty text-[13.5px] leading-[1.7] text-black/60">{blurb}</p>
          <button
            type="button"
            onClick={onPlay}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black/85 hover:gap-3"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            {action}
          </button>
        </div>

        <button
          type="button"
          onClick={onPlay}
          aria-label={action}
          className="relative grid size-[68px] shrink-0 cursor-pointer place-items-center rounded-full border border-white/60 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-[1.06] md:size-[84px]"
          style={{
            background: "linear-gradient(135deg, #39B5D7, #F7D544, #E38330)",
          }}
        >
          <span className="pointer-events-none absolute -inset-2 rounded-full border border-black/10" />
          <svg
            viewBox="0 0 24 24"
            fill="#0E0E0E"
            className="ml-[3px] size-[22px] md:size-[26px]"
          >
            <path d="M8.5 5.6a1 1 0 0 1 1.52-.85l7.2 4.4a1.7 1.7 0 0 1 0 2.9l-7.2 4.4a1 1 0 0 1-1.52-.85V5.6Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}



function CareerPodcast() {
  const [open, setOpen] = useState(false);
  const id = "uiNTwDixAts";

  return (
    <>
      <WatchCTA
        eyebrow="Podcast"
        title="How Masters' Union prepares students for top 1% placements"
        blurb="Recruiter access, live industry projects and year-round career coaching — the placement engine, explained in full."
        action="Watch podcast"
        onPlay={() => setOpen(true)}
      />
      {open && (
        <VideoLightbox onClose={() => setOpen(false)} label="Placements podcast">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title="How Masters' Union prepares students for top 1% placements"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </VideoLightbox>
      )}
    </>
  );
}

function VenturesFilm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WatchCTA
        eyebrow="Film"
        title="How students build real companies here"
        blurb="A look inside the studios, capital and mentor rooms that take a student idea from first pitch to paying customers."
        action="Play film"
        onPlay={() => setOpen(true)}
      />
      {open && (
        <VideoLightbox onClose={() => setOpen(false)} label="Entrepreneurship film">
          <video
            src={venturesFilm.url}
            className="h-full w-full"
            controls
            autoPlay
            playsInline
          />
        </VideoLightbox>
      )}
    </>
  );
}



export default function HomeShowcase() {
  return (
    <>
      <ShowcaseShell section={FACULTY_SECTION}>
        <FacultyBlock />
      </ShowcaseShell>
      <MastersVideos bg="bg-white" />
      <ShowcaseShell section={CAREER_SECTION}>

        <StatsBand stats={CAREER_RICH_STATS} tone="cream" />
        <CareerPodcast />
        <AlumStories />
        <div className="mt-8">
          <CategorizedLogos
            groups={[{
              label: "Recruiters",
              logos: [
                ...CAREER_GROUPS.flatMap((g) => g.logos.slice(0, 4)),
                rPwc, rServicenow, rPhysicsWallah, rIpv,
              ],
            }]}
            size="sm"
          />
        </div>
      </ShowcaseShell>




      <FounderQuote />

      <ShowcaseShell section={VENTURES_SECTION}>
        <StatsBand stats={VENTURES_RICH_STATS} tone="light" />
        <VenturesFilm />
        <FounderFilmstrip />


        <div className="mt-5">
          <UniformLogoList groups={VENTURE_GROUPS} />
        </div>
        <div className="mt-8">
          <SharkTankLogoBar />
        </div>

      </ShowcaseShell>

      <ShowcaseShell section={PARTNERS_SECTION}>
        <CategorizedLogos groups={PARTNER_GROUPS} withFilter size="sm" />
      </ShowcaseShell>
    </>
  );
}

function FounderQuote() {
  return (
    <section id="founders" className="border-t border-black/10 bg-[#F5F3EE]">
      <div className="mx-auto max-w-[1280px] px-5 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8">
        <div className="relative overflow-hidden rounded-none min-h-[320px] md:min-h-[380px] grid grid-cols-1 lg:grid-cols-2 pastel-gradient">
          <div className="relative z-10 flex flex-col justify-center p-6 md:p-8 lg:p-10">
            <div className="max-w-[40ch]">
              <Quote className="mb-3 size-5 text-black/40" />
              <h2
                className="text-2xl leading-[1.1] tracking-tight text-black md:text-3xl lg:text-[34px]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                "If education was working, we wouldn't have built{" "}
                <span className="italic text-black/70" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                  Masters' Union.
                </span>
                "
              </h2>
              <div className="mt-4 flex items-center gap-3">
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
              <div className="mt-5">
                <Link
                  to="/how-we-teach"
                  className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black/85"
                >
                  See how we teach
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-48 lg:h-auto">
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
  );
}



