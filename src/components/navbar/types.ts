export interface SubItem {
  labelEn: string;
  labelAr: string;
  href: string;
  isRoute?: boolean;
}

export interface DropdownItem {
  icon?: React.ReactNode;
  labelEn: string;
  labelAr: string;
  href: string;
  isRoute?: boolean;
  courseIndex?: number;
  subItems?: SubItem[];
}

export interface NavLinkWithDropdown {
  en: string;
  ar: string;
  href: string;
  isRoute?: boolean;
  dropdown?: DropdownItem[];
}

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}
