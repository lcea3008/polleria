"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import styles from "./Header.module.css"
import logo from "../../assets/logo.jpg"
import type { HeaderProps } from "./Header.types"

// Importar los productos reales
import { productsData } from "../../pages/Products/data/productsData"

// Interfaz para elementos de búsqueda
interface SearchItem {
  id: string
  name: string
  type: string
  href: string
  description: string
  tags: string[]
  price?: number
  category?: string
}

const Header: React.FC<HeaderProps> = ({
  navItems = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/productos" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contáctanos", href: "/contactanos" },
  ],
  showSearch = true,
  brandName = "Pollería Roy's",
  onSearch,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const menuRef = useRef<HTMLElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Datos completos para búsqueda (productos + páginas + servicios)
  const searchData: SearchItem[] = [
    // Productos reales de la pollería
    ...productsData.map((product) => ({
      id: `product-${product.id}`,
      name: product.name,
      type: "producto",
      price: product.price,
      href: `/productos/${product.id}`,
      category: product.category,
      description: product.description,
      tags: product.tags,
    })),

    // Páginas del sitio
    {
      id: "page-home",
      name: "Inicio",
      type: "página",
      href: "/",
      description: "Página principal de Pollería Roy's",
      tags: ["inicio", "home", "principal"],
    },
    {
      id: "page-products",
      name: "Productos",
      type: "página",
      href: "/productos",
      description: "Todos nuestros deliciosos productos",
      tags: ["productos", "menú", "comida", "carta"],
    },
    {
      id: "page-about",
      name: "Nosotros",
      type: "página",
      href: "/nosotros",
      description: "Conoce la historia de Pollería Roy's",
      tags: ["nosotros", "historia", "equipo", "valores"],
    },
    {
      id: "page-contact",
      name: "Contáctanos",
      type: "página",
      href: "/contactanos",
      description: "Información de contacto y ubicación",
      tags: ["contacto", "teléfono", "dirección", "ubicación"],
    },

    // Servicios
    {
      id: "service-delivery",
      name: "Delivery",
      type: "servicio",
      href: "/delivery",
      description: "Servicio de entrega a domicilio",
      tags: ["delivery", "entrega", "domicilio", "pedidos"],
    },
    {
      id: "service-reservations",
      name: "Reservaciones",
      type: "servicio",
      href: "/reservaciones",
      description: "Reserva tu mesa para eventos especiales",
      tags: ["reservas", "mesas", "eventos", "cumpleaños"],
    },
    {
      id: "service-catering",
      name: "Catering",
      type: "servicio",
      href: "/catering",
      description: "Servicio de catering para eventos",
      tags: ["catering", "eventos", "fiestas", "corporativo"],
    },

    // Categorías de productos
    {
      id: "category-pollos",
      name: "Pollos a la Brasa",
      type: "categoría",
      href: "/productos?categoria=Pollos",
      description: "Nuestros deliciosos pollos a la brasa",
      tags: ["pollo", "brasa", "entero", "especialidad"],
    },
    {
      id: "category-broster",
      name: "Pollo Broster",
      type: "categoría",
      href: "/productos?categoria=Broster",
      description: "Pollo broster crujiente y jugoso",
      tags: ["broster", "frito", "crujiente"],
    },
    {
      id: "category-combos",
      name: "Combos Familiares",
      type: "categoría",
      href: "/productos?categoria=Combos",
      description: "Combos perfectos para compartir",
      tags: ["combos", "familiar", "compartir"],
    },
    {
      id: "category-criollos",
      name: "Platos Criollos",
      type: "categoría",
      href: "/productos?categoria=Criollos",
      description: "Deliciosos platos de la cocina criolla",
      tags: ["criollos", "tallarín", "lomo", "chaufa"],
    },
  ]

  const toggleMenu = (): void => {
    setMenuOpen((prev) => !prev)
  }

  const closeMenu = (): void => {
    setMenuOpen(false)
  }

  const handleSearch = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setIsSearching(true)

    // Simular búsqueda con delay
    setTimeout(() => {
      const searchTerm = query.toLowerCase()

      const results = searchData
        .filter((item) => {
          // Búsqueda en nombre
          const nameMatch = item.name.toLowerCase().includes(searchTerm)

          // Búsqueda en tipo
          const typeMatch = item.type.toLowerCase().includes(searchTerm)

          // Búsqueda en descripción (si existe)
          const descriptionMatch = item.description?.toLowerCase().includes(searchTerm) || false

          // Búsqueda en tags (si existen)
          const tagsMatch = item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) || false

          // Búsqueda en categoría (si existe)
          const categoryMatch = item.category?.toLowerCase().includes(searchTerm) || false

          return nameMatch || typeMatch || descriptionMatch || tagsMatch || categoryMatch
        })
        .sort((a, b) => {
          // Priorizar productos sobre otros tipos
          if (a.type === "producto" && b.type !== "producto") return -1
          if (b.type === "producto" && a.type !== "producto") return 1

          // Priorizar coincidencias exactas en el nombre
          const aNameExact = a.name.toLowerCase().startsWith(searchTerm)
          const bNameExact = b.name.toLowerCase().startsWith(searchTerm)
          if (aNameExact && !bNameExact) return -1
          if (bNameExact && !aNameExact) return 1

          return 0
        })
        .slice(0, 8) // Aumentar a 8 resultados

      setSearchResults(results)
      setShowSearchResults(true)
      setIsSearching(false)
    }, 300)
  }

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Ejecutar callback personalizado si existe
      onSearch?.(searchQuery)

      // Navegar a página de resultados
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`)
      setShowSearchResults(false)
      setSearchQuery("")
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setSearchQuery(value)
    handleSearch(value)
  }

  const handleSearchResultClick = (result: any): void => {
    navigate(result.href)
    setShowSearchResults(false)
    setSearchQuery("")
  }

  const clearSearch = (): void => {
    setSearchQuery("")
    setSearchResults([])
    setShowSearchResults(false)
  }

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        toggleButtonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  // Cerrar resultados de búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSearchResults && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showSearchResults])

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    closeMenu()
    setShowSearchResults(false)
  }, [location.pathname])

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (menuOpen) {
          closeMenu()
          toggleButtonRef.current?.focus()
        }
        if (showSearchResults) {
          setShowSearchResults(false)
        }
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [menuOpen, showSearchResults])

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Logo y marca */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logoLink} aria-label={`Ir a inicio - ${brandName}`}>
            <img src={logo || "/placeholder.svg"} alt={`Logo de ${brandName}`} className={styles.logoImage} />
            <span className={styles.brandName}>{brandName}</span>
          </Link>
        </div>

        {/* Barra de búsqueda */}
        {showSearch && (
          <div className={styles.searchContainer} ref={searchRef}>
            <form
              className={styles.searchForm}
              onSubmit={handleSearchSubmit}
              role="search"
              aria-label="Buscar productos"
            >
              <div className={styles.searchInputWrapper}>
                <Search className={styles.searchIcon} size={20} />
                <input
                  type="search"
                  placeholder="Buscar productos, páginas..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className={styles.searchInput}
                  aria-label="Campo de búsqueda"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className={styles.clearButton}
                    aria-label="Limpiar búsqueda"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="submit"
                  className={styles.searchButton}
                  aria-label="Buscar"
                  disabled={!searchQuery.trim() || isSearching}
                >
                  {isSearching ? <div className={styles.searchSpinner} /> : <Search size={20} />}
                </button>
              </div>
            </form>

            {/* Resultados de búsqueda */}
            {showSearchResults && (
              <div className={styles.searchResults}>
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        className={styles.searchResultItem}
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className={styles.searchResultContent}>
                          <span className={styles.searchResultName}>{result.name}</span>
                          <span className={styles.searchResultType}>{result.type}</span>
                        </div>
                        {result.price && <span className={styles.searchResultPrice}>S/ {result.price.toFixed(2)}</span>}
                      </button>
                    ))}
                    <div className={styles.searchResultsFooter}>
                      <button
                        className={styles.viewAllResults}
                        onClick={() => handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent)}
                      >
                        Ver todos los resultados para "{searchQuery}"
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.noResults}>
                    <p>No se encontraron resultados para "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Navegación principal - Desktop */}
        <nav className={`${styles.nav} ${styles.navDesktop}`} aria-label="Navegación principal">
          <ul className={styles.navList} role="list">
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link
                  to={item.href}
                  className={`${styles.navLink} ${location.pathname === item.href ? styles.navLinkActive : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón menú hamburguesa */}
        <button
          ref={toggleButtonRef}
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay para móvil */}
      {menuOpen && (
        <>
          <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />
          <nav
            ref={menuRef}
            id="mobile-navigation"
            className={`${styles.nav} ${styles.navMobile} ${menuOpen ? styles.navOpen : ""}`}
            aria-label="Navegación móvil"
          >
            <div className={styles.mobileNavHeader}>
              <div className={styles.mobileNavBrand}>
                <img src={logo || "/placeholder.svg"} alt={`Logo de ${brandName}`} className={styles.mobileNavLogo} />
                <span className={styles.mobileNavBrandName}>{brandName}</span>
              </div>
            </div>

            <ul className={styles.navList} role="list">
              {navItems.map((item) => (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    to={item.href}
                    className={`${styles.navLink} ${location.pathname === item.href ? styles.navLinkActive : ""}`}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Búsqueda móvil */}
            {showSearch && (
              <div className={styles.mobileSearch}>
                <form onSubmit={handleSearchSubmit} className={styles.mobileSearchForm}>
                  <div className={styles.mobileSearchInputWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                      type="search"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      className={styles.mobileSearchInput}
                    />
                  </div>
                </form>
              </div>
            )}
          </nav>
        </>
      )}
    </header>
  )
}

export default Header
