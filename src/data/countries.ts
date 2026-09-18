export interface Country {
  name: string;
  code: string;
  dial: string;
}

export const COUNTRIES: Country[] = [
  { name: "United States", code: "US", dial: "+1" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Nigeria", code: "NG", dial: "+234" },
  { name: "Kenya", code: "KE", dial: "+254" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "Singapore", code: "SG", dial: "+65" },
];
