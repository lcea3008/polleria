import type React from "react"
export interface NutritionalInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface ProductItem {
  id: number
  name: string
  description: string
  imageUrl: string
  altText: string
  price: number
  originalPrice?: number
  category: string
  rating: number
  reviewCount: number
  preparationTime: number
  servings: number
  isPopular: boolean
  isNew: boolean
  isSpicy: boolean
  isVegetarian: boolean
  tags: string[]
  ingredients: string[]
  nutritionalInfo: NutritionalInfo
}

export interface FilterOptions {
  priceRange: [number, number]
  isVegetarian: boolean
  isSpicy: boolean
  isNew: boolean
  isPopular: boolean
  minRating: number
}

export interface SortOption {
  value: string
  label: string
  icon: React.ReactNode
}

export interface ProductsPageProps {
  title?: string
  description?: string
  showFilters?: boolean
  showSearch?: boolean
  defaultView?: "grid" | "list"
  itemsPerPage?: number
}
