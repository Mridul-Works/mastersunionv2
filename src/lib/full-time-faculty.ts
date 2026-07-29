// Full-time (Masters-in-Residence) faculty — sourced from mastersunion.org/masterspage
import ftBhupeshManoharan from "@/assets/faculty/fulltime/bhupesh-manoharan.webp.asset.json";
import ftNandiniSeth from "@/assets/faculty/fulltime/nandini-seth.webp.asset.json";
import ftGarimaChaklader from "@/assets/faculty/fulltime/garima-chaklader.webp.asset.json";
import ftVipinSreekumar from "@/assets/faculty/fulltime/vipin-sreekumar.webp.asset.json";
import ftKashikaSud from "@/assets/faculty/fulltime/kashika-sud.webp.asset.json";
import ftManuPrasad from "@/assets/faculty/fulltime/manu-prasad.webp.asset.json";
import ftNimishaBora from "@/assets/faculty/fulltime/nimisha-bora.webp.asset.json";
import ftAartiSharma from "@/assets/faculty/fulltime/aarti-sharma.webp.asset.json";
import ftRinkuMahindru from "@/assets/faculty/fulltime/rinku-mahindru.webp.asset.json";
import ftAnushreePoddar from "@/assets/faculty/fulltime/anushree-poddar.webp.asset.json";
import ftAshishBhandari from "@/assets/faculty/fulltime/ashish-bhandari.webp.asset.json";
import ftShivangiRajora from "@/assets/faculty/fulltime/shivangi-rajora.webp.asset.json";
import ftBhaskerMalu from "@/assets/faculty/fulltime/bhasker-malu.webp.asset.json";
import ftAjithBabu from "@/assets/faculty/fulltime/ajith-babu.webp.asset.json";
import ftRajatMathur from "@/assets/faculty/fulltime/rajat-mathur.webp.asset.json";
import ftAnkurKulshrestha from "@/assets/faculty/fulltime/ankur-kulshrestha.webp.asset.json";
import ftMuneerKalliyil from "@/assets/faculty/fulltime/muneer-kalliyil.webp.asset.json";
import ftAntra from "@/assets/faculty/fulltime/antra.webp.asset.json";
import ftAdityaKulashri from "@/assets/faculty/fulltime/aditya-kulashri.webp.asset.json";
import ftDevprioRay from "@/assets/faculty/fulltime/devprio-ray.webp.asset.json";
import ftTanyaJain from "@/assets/faculty/fulltime/tanya-jain.webp.asset.json";
import ftNainaDuggal from "@/assets/faculty/fulltime/naina-duggal.webp.asset.json";
import ftHarishShetty from "@/assets/faculty/fulltime/harish-shetty.webp.asset.json";
import ftMeeraSimon from "@/assets/faculty/fulltime/meera-simon.webp.asset.json";
import ftAbhishekVashisht from "@/assets/faculty/fulltime/abhishek-vashisht.webp.asset.json";
import ftShirilSaju from "@/assets/faculty/fulltime/shiril-saju.webp.asset.json";
import ftSatyajitRoy from "@/assets/faculty/fulltime/satyajit-roy.webp.asset.json";
import ftSharukhMoinKhan from "@/assets/faculty/fulltime/sharukh-moin-khan.webp.asset.json";
import ftSumitShukla from "@/assets/faculty/fulltime/sumit-shukla.webp.asset.json";
import ftShreyanshChaurasiya from "@/assets/faculty/fulltime/shreyansh-chaurasiya.webp.asset.json";
import ftAkshayDhuria from "@/assets/faculty/fulltime/akshay-dhuria.webp.asset.json";
import ftArindamB from "@/assets/faculty/fulltime/arindam-b.webp.asset.json";
import ftAnubhaShokhand from "@/assets/faculty/fulltime/anubha-shokhand.webp.asset.json";
import ftShikharBharadwaj from "@/assets/faculty/fulltime/shikhar-bharadwaj.webp.asset.json";
import ftSukanyaRoy from "@/assets/faculty/fulltime/sukanya-roy.webp.asset.json";
import ftKunalBiswas from "@/assets/faculty/fulltime/kunal-biswas.webp.asset.json";
import ftRochakKhandelwal from "@/assets/faculty/fulltime/rochak-khandelwal.webp.asset.json";

export type FullTimeFaculty = {
  name: string;
  role: string;
  credential: string;
  img: string;
};

export const FULL_TIME_FACULTY: FullTimeFaculty[] = [
  { name: "Dr Bhupesh Manoharan", role: "Dean", credential: "Ph.D., IIM Calcutta", img: ftBhupeshManoharan.url },
  { name: "Dr Nandini Seth", role: "Assistant Professor, Quantitative Methods & Decision Sciences", credential: "Ph.D., IIM Bangalore", img: ftNandiniSeth.url },
  { name: "Dr Garima Chaklader", role: "Assistant Professor, Economics", credential: "Ph.D., IIM Bangalore", img: ftGarimaChaklader.url },
  { name: "Dr Vipin Sreekumar", role: "Assistant Professor, Strategic Management", credential: "Ph.D., IIM Calcutta", img: ftVipinSreekumar.url },
  { name: "Dr Kashika Sud", role: "Assistant Professor, Organisational Behaviour", credential: "Ph.D., IIM Ahmedabad", img: ftKashikaSud.url },
  { name: "Dr Manu Prasad", role: "Assistant Professor, Organisational Behaviour & HRM", credential: "Ph.D., IIM Tiruchirappalli", img: ftManuPrasad.url },
  { name: "Dr Nimisha Bora", role: "Assistant Professor, Accounting & Finance", credential: "Ph.D., Xavier Institute of Management", img: ftNimishaBora.url },
  { name: "Dr Aarti Sharma", role: "Assistant Professor, Management Finance", credential: "Ph.D., Shiv Nadar University Delhi", img: ftAartiSharma.url },
  { name: "Dr Rinku Mahindru", role: "Assistant Professor, Organisational Behaviour", credential: "Ph.D., Delhi University", img: ftRinkuMahindru.url },
  { name: "Dr Anushree Poddar", role: "Assistant Professor, Business Sustainability & Marketing", credential: "Ph.D., TERI School of Advanced Studies", img: ftAnushreePoddar.url },
  { name: "Dr Ashish Bhandari", role: "Assistant Professor, Production & Operations Management", credential: "Ph.D., IIM Bangalore", img: ftAshishBhandari.url },
  { name: "Dr Shivangi Rajora", role: "Assistant Professor, Public Policies", credential: "Ph.D., IIM Bangalore", img: ftShivangiRajora.url },
  { name: "Dr Bhasker Malu", role: "Assistant Professor, Psychology", credential: "Ph.D., Christ University", img: ftBhaskerMalu.url },
  { name: "Dr Ajith Babu", role: "Assistant Professor, Operations Management", credential: "Ph.D., IIM Calcutta", img: ftAjithBabu.url },
  { name: "Rajat Mathur", role: "Professor of Practice", credential: "Former MD", img: ftRajatMathur.url },
  { name: "Ankur Kulshrestha", role: "Financial Accounting & Analysis", credential: "Educator", img: ftAnkurKulshrestha.url },
  { name: "Dr Muneer Kalliyil", role: "Assistant Professor, Economics", credential: "Ph.D., IIM Bangalore", img: ftMuneerKalliyil.url },
  { name: "Dr Antra", role: "Assistant Professor, Decision Sciences", credential: "Ph.D., IIM Bangalore", img: ftAntra.url },
  { name: "Prof. Aditya Kulashri", role: "Assistant Professor, Organisational Behaviour", credential: "Ph.D., IIM Calcutta", img: ftAdityaKulashri.url },
  { name: "Prof. Devprio Ray", role: "Assistant Professor, Operations Research", credential: "Ph.D., IIM Ahmedabad", img: ftDevprioRay.url },
  { name: "Dr Tanya Jain", role: "Assistant Professor, Economics", credential: "Ph.D., IIM Bangalore", img: ftTanyaJain.url },
  { name: "Dr Naina Duggal", role: "Assistant Professor, Economics", credential: "Ph.D., IIT Bombay", img: ftNainaDuggal.url },
  { name: "Dr Harish Shetty", role: "Assistant Professor, Organizational Behaviour", credential: "Ph.D., University of Bath UK", img: ftHarishShetty.url },
  { name: "Dr Meera Simon", role: "Assistant Professor, Quantitative Techniques", credential: "Ph.D., IIM Kozhikode", img: ftMeeraSimon.url },
  { name: "Dr Abhishek Vashisht", role: "Associate Professor, Quantitative Methods and Decision Sciences", credential: "Ph.D., IIM Tiruchirappalli", img: ftAbhishekVashisht.url },
  { name: "Dr Shiril Saju", role: "Assistant Professor, Operations Management", credential: "Ph.D., IIM Bangalore", img: ftShirilSaju.url },
  { name: "Dr Satyajit Roy", role: "Assistant Professor, Operations Management", credential: "Ph.D., IIM Bangalore", img: ftSatyajitRoy.url },
  { name: "Sharukh Moin Khan", role: "Associate Professor of Practice, Finance & Accounting", credential: "PGDM, IIM Calcutta", img: ftSharukhMoinKhan.url },
  { name: "Sumit Shukla", role: "Associate Professor of Practice, Artificial Intelligence/Machine Learning", credential: "M.Sc., IIT Kanpur", img: ftSumitShukla.url },
  { name: "Prof Shreyansh Chaurasiya", role: "Assistant Professor, Finance & Accounting", credential: "Ph.D., IIM Bangalore", img: ftShreyanshChaurasiya.url },
  { name: "Prof Akshay Dhuria", role: "Assistant Professor, Finance & Accounting", credential: "Ph.D., IIM Bangalore", img: ftAkshayDhuria.url },
  { name: "Prof Arindam B.", role: "Assistant Professor, Organizational Behaviour", credential: "Ph.D., IIM Calcutta", img: ftArindamB.url },
  { name: "Anubha Shokhand", role: "Assistant Professor, Strategic Management", credential: "Ph.D., IIM Bangalore", img: ftAnubhaShokhand.url },
  { name: "Prof. Shikhar Bharadwaj", role: "Assistant Professor, Strategic Management", credential: "Ph.D., IIM Ahmedabad", img: ftShikharBharadwaj.url },
  { name: "Prof. Sukanya Roy", role: "Assistant Professor, Strategic Management", credential: "Ph.D., IIM Bangalore", img: ftSukanyaRoy.url },
  { name: "Prof. Kunal Biswas", role: "Assistant Professor, Economics", credential: "Ph.D., IIM Bangalore", img: ftKunalBiswas.url },
  { name: "Prof. Rochak Khandelwal", role: "Assistant Professor, Marketing", credential: "Ph.D., IIM Bangalore", img: ftRochakKhandelwal.url },
];
