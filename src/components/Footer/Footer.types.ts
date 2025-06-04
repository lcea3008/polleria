export interface ContactInfo {
  phone: string
  email: string
  address: string
}

export interface BusinessHours {
  weekdays: string
  weekends: string
}

export interface SocialLink {
  name: string
  url: string
  icon: "facebook" | "instagram" | "tiktok" | "twitter" | "youtube"
}

export interface QuickLink {
  name: string
  href: string
}

export interface LegalLink {
  name: string
  href: string
}

export interface FooterProps {
  brandName?: string
  contactInfo?: ContactInfo
  businessHours?: BusinessHours
  socialLinks?: SocialLink[]
  quickLinks?: QuickLink[]
  legalLinks?: LegalLink[]
  showNewsletter?: boolean
}
