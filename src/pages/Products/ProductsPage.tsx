"use client"

import type React from "react"

import { useState, useMemo } from "react"
import {Search,Filter,
  Grid,List, Star, Heart, ShoppingCart, Eye, ChefHat, Clock, Users, Flame, Leaf,
  Award, SortAsc, SortDesc, X,} from "lucide-react"
import ImageWithDescription from "../../components/ImageWithDescription/ImageWithDescription"
import styles from "./ProductsPage.module.css"
import type { ProductItem, ProductsPageProps, FilterOptions, SortOption } from "./ProductsPage.types"
import {local1, local2,local3}  from "../../assets/images/index"

const productsData: ProductItem[] = [
  {
    id: 1,
    name: "Pollo Entero a la Brasa",
    description:
      "Nuestro clásico pollo entero a la brasa, jugoso por dentro y crocante por fuera. Marinado por 24 horas con especias secretas y cocido lentamente en horno de carbón.",
    imageUrl: `${local1}?height=300&width=300`, // ✅ corregido
    altText: "Pollo Entero a la Brasa dorado y jugoso",
    price: 60.0,
    category: "Pollos",
    rating: 4.8,
    reviewCount: 156,
    preparationTime: 25,
    servings: 4,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Especialidad", "Familiar", "Clásico"],
    ingredients: ["Pollo entero", "Especias secretas", "Carbón de algarrobo"],
    nutritionalInfo: {
      calories: 320,
      protein: 28,
      carbs: 2,
      fat: 22,
    },
  },
  {
    id: 2,
    name: "Super promociòn roy's",
    description:
      "Nuestro super promocion consta de (1 Pollo entero + ¼ de Pollo) jugoso por dentro y crocante por fuera + papas fritas + ensalada clásica + gaseosa de 2.25 L.",
    imageUrl: `${local2}?height=300&width=300`,
    altText: "Promocion Familiar",
    price: 74.0,
    category: "Pollos",
    rating: 4.9,
    reviewCount: 89,
    preparationTime: 15,
    servings: 2,
    isPopular: true,
    isNew: false,
    isSpicy: true,
    isVegetarian: false,
    tags: ["Picante", "BBQ", "Entrada"],
    ingredients: ["Pollo entero", "Especias secretas", "Carbón de algarrobo"],
    nutritionalInfo: {
      calories: 280,
      protein: 24,
      carbs: 8,
      fat: 18,
    },
  },
  {
    id: 3,
    name: "Combo 1",
    description:
      "El combo perfecto para toda la familia: pollo entero, +1/4  pollo, papas doradas, ensalada frescas. ¡Nadie se queda con hambre!",
    imageUrl: `${local3}?height=300&width=300`,
    altText: "Combo familiar completo con pollo y acompañamientos",
    price: 67.0,
    category: "Combos",
    rating: 4.7,
    reviewCount: 203,
    preparationTime: 30,
    servings: 6,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Familiar", "Completo", "Ahorro"],
    ingredients: ["Pollo entero", "Papas", "Ensalada", "Arroz chaufa", "Gaseosas"],
    nutritionalInfo: {
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 20,
    },
  },
  {
    id: 4,
    name: "Combo 2",
    description: 
      "El combo perfecto para toda la familia: pollo entero, 1 gaseosa 1L, papas doradas, ensalada frescas. ¡Nadie se queda con sed!",
    imageUrl: `${local2}?height=300&width=300`,
    altText: "Combo 2 con pollo, gaseosa y papas fritas",
    price: 67.0,
    category: "Combos",
    rating: 4.7,
    reviewCount: 203, 
    preparationTime: 30,
    servings: 6,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Familiar", "Completo", "Ahorro"],
    ingredients: ["Pollo entero", "Papas", "Ensalada", "Gaseosas"],
    nutritionalInfo: {
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 20,
    },
  },
  {
    id: 5,
    name: "Combo Familiar",
    description:
      "Disfruta de nuestro combo familiar con pollo, papas fritas, arroz chaufa, ensalada fresca y gaseosa. Ideal para compartir en familia o con amigos.",
    imageUrl: `${local1}?height=300&width=300`,
    altText: "Combo familiar con pollo y acompañamientos",
    price: 85.0,
    category: "Combos",
    rating: 4.6,
    reviewCount: 150,
    preparationTime: 30,
    servings: 4,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Familiar", "Completo", "Ahorro"],
    ingredients: ["Pollo entero", "Papas fritas", "Arroz Chaufa", "Ensalada fresca", "Gaseosa"],
    nutritionalInfo: {
      calories: 500,
      protein: 40,
      carbs: 50,
      fat: 25,
    },
  },
  {
    id: 6,
    name: "1/4 de pollo broster con arroz chaufa",
    description:
      "Disfruta de nuestro delicioso 1/4 de pollo broster, crujiente por fuera y jugoso por dentro, + arroz chaufa. Perfecto para un almuerzo rápido o una cena ligera.", 
    imageUrl: `${local3}?height=300&width=300`,
    altText: "1/4 de pollo broster con papas fritas y arroz chaufa",
    price: 19.0,
    category: "Combos personales",
    rating: 4.5,
    reviewCount: 120,
    preparationTime: 20,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Broster", "Frito", "Rápido","Arroz Chaufa"],
    ingredients: ["1/4 de pollo", "Harina de trigo", "Especias", "Aceite vegetal", "Arroz Chaufa"],
    nutritionalInfo: {
      calories: 350,
      protein: 25,
      carbs: 10,
      fat: 20,
    },
  },
  {
    id: 7,
    name: "1/4 de pollo broster",
    description:
      "Disfruta de nuestro delicioso 1/4 de pollo broster, crujiente por fuera y jugoso por dentro, + papas fritas. Perfecto para un almuerzo rápido o una cena ligera.",
    imageUrl: `${local2}?height=300&width=300`,
    altText: "1/4 de pollo broster con papas fritas",
    price: 17.0,
    category: "Broster",
    rating: 4.5,
    reviewCount: 120,
    preparationTime: 20,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Broster", "Frito", "Rápido"],
    ingredients: ["1/4 de pollo", "Harina de trigo", "Especias", "Aceite vegetal"],
    nutritionalInfo: {
      calories: 300,
      protein: 20,
      carbs: 8,
      fat: 18,
    },
  },
  { id: 8,
    name: "1/8 de pollo broster",
    description:
      "Disfruta de nuestro delicioso 1/8 de pollo broster, crujiente por fuera y jugoso por dentro, + papas fritas. Perfecto para un almuerzo rápido o una cena ligera.",
    imageUrl: `${local1}?height=300&width=300`,
    altText: "1/8 de pollo broster con papas fritas",
    price: 12.0,
    category: "Broster",
    rating: 4.4,
    reviewCount: 95,
    preparationTime: 15,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Broster", "Frito", "Rápido"],
    ingredients: ["1/8 de pollo", "Harina de trigo", "Especias", "Aceite vegetal"],
    nutritionalInfo: {
      calories: 200,
      protein: 15,
      carbs: 5,
      fat: 12,
    },
  },
  { id: 9,
    name: "1/8 de broster con arroz chaufa",
    description:
      "Disfruta de nuestro delicioso 1/8 de pollo broster, crujiente por fuera y jugoso por dentro, + arroz chaufa. Perfecto para un almuerzo rápido o una cena ligera.",
    imageUrl: `${local3}?height=300&width=300`,
    altText: "1/8 de pollo broster con arroz chaufa",
    price: 14.0,
    category: "Combos personales",
    rating: 4.4,
    reviewCount: 95,
    preparationTime: 15,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Broster", "Frito", "Rápido", "Arroz Chaufa"],
    ingredients: ["1/8 de pollo", "Harina de trigo", "Especias", "Aceite vegetal", "Arroz Chaufa"],
    nutritionalInfo: {
      calories: 220,
      protein: 18,
      carbs: 10,
      fat: 14,
    },
  },
  {id: 10,
    name: "1/2 de Pollo a la brasa",
    description:
      "Disfruta de nuestro delicioso 1/2 pollo a la brasa, jugoso por dentro y con un toque ahumado perfecto. Ideal para un almuerzo o cena ligera.",
    imageUrl: `${local2}?height=300&width=300`,
    altText: "1/2 Pollo a la brasa con papas fritas",
    price: 30.0,
    category: "Pollos",
    rating: 4.6,
    reviewCount: 110,
    preparationTime: 20,
    servings: 2,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["A la brasa", "Jugoso", "Tradicional"],
    ingredients: ["1/2 Pollo", "Especias secretas", "Carbón de algarrobo"],
    nutritionalInfo: {
      calories: 400,
      protein: 35,
      carbs: 5,
      fat: 25,
    },
  },
  {id: 11,
    name: "1/4 de Pollo a la brasa",
    description:
      "Disfruta de nuestro delicioso 1/4 de pollo a la brasa, jugoso por dentro y con un toque ahumado perfecto. Ideal para un almuerzo o cena ligera.",
    imageUrl: `${local1}?height=300&width=300`,
    altText: "1/4 Pollo a la brasa con papas fritas",
    price: 16.0,
    category: "Pollos",
    rating: 4.5,
    reviewCount: 95,
    preparationTime: 15,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["A la brasa", "Jugoso", "Tradicional"],
    ingredients: ["1/4 Pollo", "Especias secretas", "Carbón de algarrobo"],
    nutritionalInfo: {
      calories: 200,
      protein: 18,
      carbs: 3,
      fat: 12,
    },
  },
  {id: 12,
    name: "1/8 de Pollo a la brasa",
    description:
      "Disfruta de nuestro delicioso 1/8 de pollo a la brasa, jugoso por dentro y con un toque ahumado perfecto. Ideal para un almuerzo o cena ligera.",
    imageUrl: `${local3}?height=300&width=300`,
    altText: "1/8 Pollo a la brasa con papas fritas",
    price: 10.0,
    category: "Pollos",
    rating: 4.4,
    reviewCount: 80,
    preparationTime: 10,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["A la brasa", "Jugoso", "Tradicional"],
    ingredients: ["1/8 Pollo", "Especias secretas", "Carbón de algarrobo"],
    nutritionalInfo: {
      calories: 150,
      protein: 12,
      carbs: 2,
      fat: 8,
    },
  },
  { 
    id: 13,
    name: " 1/4 de pollo a la brasa con arroz chaufa",
    description:
      "Disfruta de nuestro delicioso 1/4 de pollo a la brasa, jugoso por dentro y con un toque ahumado perfecto, + arroz chaufa. Ideal para un almuerzo o cena ligera.",
    imageUrl: `${local2}?height=300&width=300`,
    altText: "1/4 Pollo a la brasa con arroz chaufa",
    price: 18.0,
    category: "Combos personales",
    rating: 4.5,
    reviewCount: 90,
    preparationTime: 15,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["A la brasa", "Jugoso", "Tradicional"],
    ingredients: ["1/4 Pollo", "Especias secretas", "Carbón de algarrobo"],
    nutritionalInfo: {
      calories: 200,
      protein: 18,
      carbs: 3,
      fat: 12,
    },

  },
  {id: 14,
    name: "1/8 de pollo a la brasa con arroz chaufa",
    description:
      "Disfruta de nuestro delicioso 1/8 de pollo a la brasa, jugoso por dentro y con un toque ahumado perfecto, + arroz chaufa. Ideal para un almuerzo o cena ligera.",
    imageUrl: `${local1}?height=300&width=300`,
    altText: "1/8 Pollo a la brasa con arroz chaufa",
    price: 12.0,
    category: "Combos personales",
    rating: 4.4,
    reviewCount: 85,
    preparationTime: 10,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["A la brasa", "Jugoso", "Tradicional"],
    ingredients: ["1/8 Pollo", "Especias secretas", "Carbón de algarrobo"],
    nutritionalInfo: {
      calories: 150,
      protein: 12,
      carbs: 2,
      fat: 8,
    },
  },
  {id: 15,
    name: " Tallarin Saltado de res",
    description: "Disfruta de nuestro delicioso tallarín saltado de res, con trozos de carne jugosa, verduras frescas y una salsa especial que lo hace irresistible.",
    imageUrl: `${local3}?height=300&width=300`,
    altText: "Tallarín Saltado de res con verduras frescas",
    price: 18.0,
    category: "Criollos",
    rating: 4.6,
    reviewCount: 110,
    preparationTime: 20,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Criollo", "Salteado", "Tradicional"],
    ingredients: ["Tallarines", "Carne de res", "Verduras frescas", "Salsa de soya", "Especias"],
    nutritionalInfo: {
      calories: 400,
      protein: 30,
      carbs: 50,
      fat: 10,
    },
  },
  {id: 16,
    name: " Lomo saltado de res",
    description: "Disfruta de nuestro delicioso lomo saltado de res, con trozos de carne jugosa, cebolla, tomate y papas fritas. Un clásico peruano que no te puedes perder.",
    imageUrl: `${local2}?height=300&width=300`, 
    altText: "Lomo Saltado de res con papas fritas",
    price: 22.0,
    category: "Criollos",
    rating: 4.7,
    reviewCount: 130,
    preparationTime: 25,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Criollo", "Salteado", "Tradicional"],
    ingredients: ["Lomo de res", "Cebolla", "Tomate", "Papas fritas", "Salsa de soya", "Especias"],
    nutritionalInfo: {
      calories: 500,
      protein: 35,
      carbs: 60,
      fat: 15,
    },
  },
  {id: 17,
    name: "Arroz chaufa oxapampino",
    description: "Disfruta de nuestro delicioso arroz chaufa oxapampino, con pollo, chorizo, huevo y verduras frescas. Un plato lleno de sabor y tradición.",
    imageUrl: `${local1}?height=300&width=300`,
    altText: "Arroz Chaufa Oxapampino con pollo y chorizo",
    price: 20.0,
    category: "Criollos",
    rating: 4.8,
    reviewCount: 140,
    preparationTime: 20,
    servings: 1,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    tags: ["Criollo", "Salteado", "Tradicional"],
    ingredients: ["Arroz", "Pollo", "Chorizo", "Huevo", "Verduras frescas", "Salsa de soya"],
    nutritionalInfo: {
      calories: 450,
      protein: 25,
      carbs: 60,
      fat: 15,
    },
  }
]

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
  itemsPerPage = 12,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [sortBy, setSortBy] = useState<string>("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultView)
  const [showFiltersPanel, setShowFiltersPanel] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [cart, setCart] = useState<Set<number>>(new Set())
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

  const handleAddToCart = (productId: number) => {
    setCart((prev) => new Set(prev).add(productId))
    // Aquí podrías mostrar una notificación
    console.log(`Producto ${productId} agregado al carrito`)
  }

  const handleProductClick = (product: ProductItem) => {
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

  const getProductBadges = (product: ProductItem) => {
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
                  onActionClick={() => handleAddToCart(product.id)}
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
                    <button className={styles.addToCartButton} onClick={() => handleAddToCart(product.id)}>
                      <ShoppingCart size={18} />
                      Agregar
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

