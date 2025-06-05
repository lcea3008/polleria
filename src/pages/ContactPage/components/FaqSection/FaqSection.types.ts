export interface FAQ {
  question: string
  answer: string
}

export interface FaqSectionProps {
  faqs: FAQ[]
  onContactClick: () => void
}
