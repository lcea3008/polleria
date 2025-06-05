"use client"

import type React from "react"

import { useState, useMemo } from "react"
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  Eye,
  ChefHat,
  Clock,
  Users,
  Flame,
  Leaf,
  Award,
  SortAsc,
  SortDesc,
  X,
} from "lucide-react"
import ImageWithDescription from "../../components/ImageWithDescription/ImageWithDescription"
import styles from "./ProductsPage.module.css"
import type { ProductsPageProps, FilterOptions, SortOption } from "./ProductsPage.types"
import { productsData } from "./data/productsData"

const categories = ["Todos", "Pollos", "Broster", "Combos", "Combos personales", "Criollos", "Parrillas"]

const sortOptions: SortOption[] = [
  { value: "popular", label: "Más Popular", icon: <Star size={16} /> },
  { value: "price-low", label: "Precio: Menor a Mayor", icon: <SortAsc size={16} /> },
  { value: "price-high", label: "Precio: Mayor a Menor", icon: <SortDesc size={16} /> },
  { value: "rating", label: "Mejor Calificación", icon: <Award size={16} /> },
  { value: "newest", label: "Más Nuevos", icon: <Clock size={16} /> },
]

const ProductsPage: React.FC<ProductsPageProps> = ({
  title = "Nuestros Deliciosos Productos",
  description = "Explora nuestra variedad de platillos, todos preparados con los ingredientes más frescos y el toque secreto de Pollería Roy's.",
  showFilters = true,
  showSearch = true,
  defaultView = "grid",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [sortBy, setSortBy] = useState<string>("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultView)
  const [showFiltersPanel, setShowFiltersPanel] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 100],
    isVegetarian: false,
    isSpicy: false,
    isNew: false,
    isPopular: false,
    minRating: 0,
  })

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory

      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      const matchesVegetarian = !filters.isVegetarian || product.isVegetarian
      const matchesSpicy = !filters.isSpicy || product.isSpicy
      const matchesNew = !filters.isNew || product.isNew
      const matchesPopular = !filters.isPopular || product.isPopular
      const matchesRating = product.rating >= filters.minRating

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesVegetarian &&
        matchesSpicy &&
        matchesNew &&
        matchesPopular &&
        matchesRating
      )
    })

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return Number(b.isNew) - Number(a.isNew)
        case "popular":
        default:
          return Number(b.isPopular) - Number(a.isPopular) || b.rating - a.rating
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, filters])

  // Handlers
  const handleToggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const handleProductClick = (product: any) => {
    // Navegar a página de detalle del producto
    console.log("Ver detalles del producto:", product.name)
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 100],
      isVegetarian: false,
      isSpicy: false,
      isNew: false,
      isPopular: false,
      minRating: 0,
    })
    setSelectedCategory("Todos")
    setSearchTerm("")
  }

  const getProductBadges = (product: any) => {
    const badges = []
    if (product.isNew) badges.push({ text: "Nuevo", variant: "success" as const })
    if (product.isPopular) badges.push({ text: "Popular", variant: "warning" as const })
    if (product.originalPrice) badges.push({ text: "Oferta", variant: "error" as const })
    if (product.isVegetarian) badges.push({ text: "Vegetariano", variant: "info" as const })
    if (product.isSpicy) badges.push({ text: "Picante", variant: "error" as const })
    return badges[0] // Retornar solo el primer badge para evitar saturación
  }

  return (
    <main className={styles.productsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.pageTitle}>{title}</h1>
              <p className={styles.pageDescription}>{description}</p>
            </div>
            <div className={styles.headerStats}>
              <div className={styles.stat}>
                <ChefHat className={styles.statIcon} size={24} />
                <span className={styles.statValue}>{productsData.length}</span>
                <span className={styles.statLabel}>Productos</span>
              </div>
              <div className={styles.stat}>
                <Star className={styles.statIcon} size={24} />
                <span className={styles.statValue}>4.7</span>
                <span className={styles.statLabel}>Calificación</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Controles */}
        <div className={styles.controls}>
          {/* Búsqueda */}
          {showSearch && (
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button className={styles.clearSearch} onClick={() => setSearchTerm("")} aria-label="Limpiar búsqueda">
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          {/* Categorías */}
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.categoryButtonActive : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Controles de vista y filtros */}
          <div className={styles.viewControls}>
            <div className={styles.sortContainer}>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {showFilters && (
              <button
                className={`${styles.filterButton} ${showFiltersPanel ? styles.filterButtonActive : ""}`}
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              >
                <Filter size={20} />
                Filtros
              </button>
            )}

            <div className={styles.viewModeButtons}>
              <button
                className={`${styles.viewModeButton} ${viewMode === "grid" ? styles.viewModeButtonActive : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="Vista en cuadrícula"
              >
                <Grid size={20} />
              </button>
              <button
                className={`${styles.viewModeButton} ${viewMode === "list" ? styles.viewModeButtonActive : ""}`}
                onClick={() => setViewMode("list")}
                aria-label="Vista en lista"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Panel de filtros */}
        {showFiltersPanel && (
          <div className={styles.filtersPanel}>
            <div className={styles.filtersPanelHeader}>
              <h3>Filtros Avanzados</h3>
              <button onClick={clearFilters} className={styles.clearFiltersButton}>
                Limpiar Filtros
              </button>
            </div>

            <div className={styles.filtersGrid}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Rango de Precio</label>
                <div className={styles.priceRange}>
                  <span>S/ {filters.priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], Number(e.target.value)],
                      }))
                    }
                    className={styles.rangeInput}
                  />
                  <span>S/ {filters.priceRange[1]}</span>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Características</label>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={filters.isVegetarian}
                      onChange={(e) => setFilters((prev) => ({ ...prev, isVegetarian: e.target.checked }))}
                    />
                    <Leaf size={16} />
                    Vegetariano
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={filters.isSpicy}
                      onChange={(e) => setFilters((prev) => ({ ...prev, isSpicy: e.target.checked }))}
                    />
                    <Flame size={16} />
                    Picante
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={filters.isNew}
                      onChange={(e) => setFilters((prev) => ({ ...prev, isNew: e.target.checked }))}
                    />
                    <Clock size={16} />
                    Nuevo
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={filters.isPopular}
                      onChange={(e) => setFilters((prev) => ({ ...prev, isPopular: e.target.checked }))}
                    />
                    <Star size={16} />
                    Popular
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        <div className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <p className={styles.resultsCount}>
              {filteredAndSortedProducts.length} producto{filteredAndSortedProducts.length !== 1 ? "s" : ""} encontrado
              {filteredAndSortedProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid de productos */}
          <div className={`${styles.productsGrid} ${styles[`productsGrid${viewMode === "grid" ? "Grid" : "List"}`]}`}>
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <ImageWithDescription
                  imageUrl={product.imageUrl}
                  altText={product.altText}
                  title={product.name}
                  description={product.description}
                  variant="card"
                  size="medium"
                  layout={viewMode === "list" ? "horizontal" : "vertical"}
                  showActions
                  showRating
                  rating={product.rating}
                  tags={product.tags}
                  badge={getProductBadges(product)}
                  onImageClick={() => handleProductClick(product)}
                  onLike={() => handleToggleFavorite(product.id)}
                  clickable
                />

                {/* Información adicional del producto */}
                <div className={styles.productInfo}>
                  <div className={styles.productMeta}>
                    <div className={styles.productPrice}>
                      {product.originalPrice && (
                        <span className={styles.originalPrice}>S/ {product.originalPrice.toFixed(2)}</span>
                      )}
                      <span className={styles.currentPrice}>S/ {product.price.toFixed(2)}</span>
                    </div>
                    <div className={styles.productDetails}>
                      <span className={styles.productDetail}>
                        <Clock size={14} />
                        {product.preparationTime} min
                      </span>
                      <span className={styles.productDetail}>
                        <Users size={14} />
                        {product.servings} pers.
                      </span>
                    </div>
                  </div>

                  <div className={styles.productActions}>
                    <button
                      className={`${styles.favoriteButton} ${favorites.has(product.id) ? styles.favoriteButtonActive : ""}`}
                      onClick={() => handleToggleFavorite(product.id)}
                      aria-label="Agregar a favoritos"
                    >
                      <Heart size={18} fill={favorites.has(product.id) ? "currentColor" : "none"} />
                    </button>

                    <button className={styles.viewDetailsButton} onClick={() => handleProductClick(product)}>
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estado vacío */}
          {filteredAndSortedProducts.length === 0 && (
            <div className={styles.emptyState}>
              <ChefHat size={64} className={styles.emptyIcon} />
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar tus filtros o términos de búsqueda</p>
              <button onClick={clearFilters} className={styles.clearFiltersButton}>
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProductsPage
