import type React from "react"
export interface SocialMedia {
  instagram?: string
  facebook?: string
  twitter?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  socialMedia: SocialMedia
}

export interface Milestone {
  year: number
  title: string
  description: string
  image: string
}

export interface Value {
  icon: React.ReactNode
  title: string
  description: string
}

export interface AboutPageProps {
  title?: string
  subtitle?: string
  description?: string
}
