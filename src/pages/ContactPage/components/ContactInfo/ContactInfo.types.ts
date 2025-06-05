export interface ContactInfoProps {
  contactInfo: {
    address: string
    phone: string
    whatsapp: string
    email: string
    hours: {
      weekdays: string
      weekends: string
      delivery: string
    }
    social: {
      instagram: string
      facebook: string
      twitter: string
      linkedin: string
    }
  }
  onMapClick: () => void
  onWhatsAppClick: () => void
}
