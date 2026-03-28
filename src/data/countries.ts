// Country list with ISO codes for flag display via flagcdn.com
export interface Country {
  code: string; // ISO 3166-1 alpha-2
  en: string;
  ar: string;
}

export const COUNTRIES: Country[] = [
  { code: "us", en: "United States", ar: "الولايات المتحدة" },
  { code: "gb", en: "United Kingdom", ar: "المملكة المتحدة" },
  { code: "ca", en: "Canada", ar: "كندا" },
  { code: "au", en: "Australia", ar: "أستراليا" },
  { code: "ae", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  { code: "sa", en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  { code: "eg", en: "Egypt", ar: "مصر" },
  { code: "bd", en: "Bangladesh", ar: "بنجلاديش" },
  { code: "pk", en: "Pakistan", ar: "باكستان" },
  { code: "in", en: "India", ar: "الهند" },
  { code: "my", en: "Malaysia", ar: "ماليزيا" },
  { code: "id", en: "Indonesia", ar: "إندونيسيا" },
  { code: "tr", en: "Turkey", ar: "تركيا" },
  { code: "de", en: "Germany", ar: "ألمانيا" },
  { code: "fr", en: "France", ar: "فرنسا" },
  { code: "nl", en: "Netherlands", ar: "هولندا" },
  { code: "se", en: "Sweden", ar: "السويد" },
  { code: "no", en: "Norway", ar: "النرويج" },
  { code: "dk", en: "Denmark", ar: "الدانمارك" },
  { code: "ng", en: "Nigeria", ar: "نيجيريا" },
  { code: "ke", en: "Kenya", ar: "كينيا" },
  { code: "za", en: "South Africa", ar: "جنوب أفريقيا" },
  { code: "kw", en: "Kuwait", ar: "الكويت" },
  { code: "qa", en: "Qatar", ar: "قطر" },
  { code: "bh", en: "Bahrain", ar: "البحرين" },
  { code: "om", en: "Oman", ar: "عُمان" },
  { code: "jo", en: "Jordan", ar: "الأردن" },
  { code: "iq", en: "Iraq", ar: "العراق" },
  { code: "lb", en: "Lebanon", ar: "لبنان" },
  { code: "ma", en: "Morocco", ar: "المغرب" },
  { code: "tn", en: "Tunisia", ar: "تونس" },
  { code: "dz", en: "Algeria", ar: "الجزائر" },
  { code: "ly", en: "Libya", ar: "ليبيا" },
  { code: "sd", en: "Sudan", ar: "السودان" },
  { code: "so", en: "Somalia", ar: "الصومال" },
  { code: "ie", en: "Ireland", ar: "أيرلندا" },
  { code: "nz", en: "New Zealand", ar: "نيوزيلندا" },
  { code: "it", en: "Italy", ar: "إيطاليا" },
  { code: "es", en: "Spain", ar: "إسبانيا" },
  { code: "be", en: "Belgium", ar: "بلجيكا" },
];

// Get country code from country name (fuzzy match)
export const getCountryCode = (name: string): string | null => {
  if (!name) return null;
  const lower = name.trim().toLowerCase();
  const match = COUNTRIES.find(
    (c) => c.en.toLowerCase() === lower || c.ar === name.trim() || c.code === lower
  );
  return match?.code || null;
};

// Get flag URL from country code
export const getFlagUrl = (code: string, width = 40): string =>
  `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`;
