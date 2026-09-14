import rawMasters from "./meet-masters-data.json";

type AssetPointer = { url: string };

export type MasterCategory =
  | "Board of Governors"
  | "Masters-in-Residence"
  | "Visiting Faculty"
  | "CXOs"
  | "Practitioners";

export type MasterCard = {
  name: string;
  designation: string;
  post: string;
  department: string;
  image: string;
  logo: string;
  linkedin: string;
};

const assetModules = import.meta.glob<AssetPointer>(
  "/src/assets/meet-masters/*.asset.json",
  { eager: true, import: "default" },
);

function assetUrl(filename: string) {
  if (!filename) return "";
  return assetModules[`/src/assets/meet-masters/${filename}.asset.json`]?.url ?? "";
}

export const MASTER_CATEGORIES: MasterCategory[] = [
  "Board of Governors",
  "Masters-in-Residence",
  "Visiting Faculty",
  "CXOs",
  "Practitioners",
];

const masters = rawMasters as Record<
  MasterCategory,
  Array<{
    name: string;
    designation: string;
    post: string;
    department: string;
    imageAsset: string;
    logoAsset: string;
    linkedin: string;
  }>
>;

export const MEET_THE_MASTERS = Object.fromEntries(
  MASTER_CATEGORIES.map((category) => [
    category,
    masters[category].map((master) => ({
      name: master.name,
      designation: master.designation,
      post: master.post,
      department: master.department,
      image: assetUrl(master.imageAsset),
      logo: assetUrl(master.logoAsset),
      linkedin: master.linkedin,
    })),
  ]),
) as Record<MasterCategory, MasterCard[]>;
