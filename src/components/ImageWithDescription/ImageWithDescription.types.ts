import type React from "react"
export interface Badge {
  text: string
  variant?: "default" | "success" | "warning" | "error" | "info"
  icon?: React.ReactNode
}

export interface ImageWithDescriptionProps {
  imageUrl: string
  altText: string
  description?: string
  title?: string
  subtitle?: string
  variant?: "card" | "minimal" | "bordered" | "elevated"
  size?: "small" | "medium" | "large" | "full"
  aspectRatio?: string
  layout?: "vertical" | "horizontal" | "overlay"
  showActions?: boolean
  showRating?: boolean
  rating?: number
  maxRating?: number
  tags?: string[]
  author?: string
  date?: string
  location?: string
  badge?: Badge
  placeholder?: string
  lazy?: boolean
  zoomable?: boolean
  clickable?: boolean
  loading?: boolean
  error?: boolean
  onImageClick?: (imageUrl: string, altText: string) => void
  onImageLoad?: () => void
  onImageError?: () => void
  onLike?: (isLiked: boolean) => void
  onShare?: (imageUrl: string, title: string, description: string) => void
  onActionClick?: () => void
  className?: string
}
