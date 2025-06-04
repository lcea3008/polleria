"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import styles from "./Header.module.css"
import logo from "../../assets/logo.jpg"
import type { HeaderProps } from "./Header.types"

const Header: React.FC<HeaderProps> = ({
  navItems = [
    { name: "Inicio", href: "/"},
    { name: "Productos", href: "/productos" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contáctanos", href: "/contactanos" },
  ],
  showSearch = true,
  brandName = "Pollería Roy's",
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const menuRef = useRef<HTMLElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  const toggleMenu = (): void => {
    setMenuOpen((prev) => !prev)
  }

  const closeMenu = (): void => {
    setMenuOpen(false)
  }

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implementar lógica de búsqueda
      console.log("Searching for:", searchQuery)
    }
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

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        closeMenu()
        toggleButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
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

        {/* Navegación principal */}
        <nav
          ref={menuRef}
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Navegación principal"
        >
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
        </nav>

        {/* Barra de búsqueda */}
        {showSearch && (
          <form className={styles.searchForm} onSubmit={handleSearch} role="search" aria-label="Buscar productos">
            <div className={styles.searchInputWrapper}>
              <input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Campo de búsqueda"
              />
              <button type="submit" className={styles.searchButton} aria-label="Buscar" disabled={!searchQuery.trim()}>
                <Search size={20} />
              </button>
            </div>
          </form>
        )}

        {/* Botón menú hamburguesa */}
        <button
          ref={toggleButtonRef}
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay para móvil */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />}
    </header>
  )
}

export default Header
