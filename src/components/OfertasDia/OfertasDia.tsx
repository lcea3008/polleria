"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  ChevronLeft, ChevronRight, Play, Pause, Clock, Tag, Heart, Share2, ShoppingCart,
  Eye,  Percent,
} from "lucide-react"
import styles from "./OfertasDia.module.css"
import type { OfertasDiaProps } from "./OfertasDia.types"


const OfertasDia: React.FC<OfertasDiaProps> = ({
  ofertas = [],
  intervalTime = 4000,
  autoPlay = true,
  showTimer = true,
  showControls = true,
  showIndicators = true,
  pauseOnHover = true,
  enableKeyboard = true,
  onOfferClick,
  onAddToCart,
  onToggleFavorite,
  onShare,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(intervalTime)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLElement>(null)

  const totalOfertas = ofertas.length
  const currentOffer = ofertas[currentIndex]

  // Navegación
  const goToOffer = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalOfertas) {
        setCurrentIndex(index)
        setTimeLeft(intervalTime)
      }
    },
    [totalOfertas, intervalTime],
  )

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? totalOfertas - 1 : currentIndex - 1
    goToOffer(newIndex)
  }, [currentIndex, totalOfertas, goToOffer])

  const goToNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % totalOfertas
    goToOffer(newIndex)
  }, [currentIndex, totalOfertas, goToOffer])

  // Control de reproducción
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timerRef.current) clearInterval(timerRef.current)

    if (isPlaying && totalOfertas > 1) {
      setTimeLeft(intervalTime)

      // Timer visual
      if (showTimer) {
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 100) {
              return intervalTime
            }
            return prev - 100
          })
        }, 100)
      }

      // Auto advance
      intervalRef.current = setInterval(goToNext, intervalTime)
    }
  }, [isPlaying, totalOfertas, intervalTime, showTimer, goToNext])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  // Efectos
  useEffect(() => {
    if (autoPlay && !isHovered) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }

    return stopAutoPlay
  }, [autoPlay, isHovered, startAutoPlay, stopAutoPlay])

  useEffect(() => {
    if (pauseOnHover) {
      if (isHovered) {
        stopAutoPlay()
      } else if (isPlaying) {
        startAutoPlay()
      }
    }
  }, [isHovered, pauseOnHover, isPlaying, startAutoPlay, stopAutoPlay])

  // Navegación por teclado
  useEffect(() => {
    if (!enableKeyboard) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          goToPrevious()
          break
        case "ArrowRight":
          event.preventDefault()
          goToNext()
          break
        case " ":
          event.preventDefault()
          toggleAutoPlay()
          break
        case "Enter":
          event.preventDefault()
          if (currentOffer) {
            onOfferClick?.(currentOffer, currentIndex)
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [enableKeyboard, goToPrevious, goToNext, toggleAutoPlay, currentOffer, currentIndex, onOfferClick])

  // Handlers
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavorites = new Set(favorites)
    if (favorites.has(currentIndex)) {
      newFavorites.delete(currentIndex)
    } else {
      newFavorites.add(currentIndex)
    }
    setFavorites(newFavorites)
    onToggleFavorite?.(currentOffer, currentIndex, !favorites.has(currentIndex))
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShare?.(currentOffer, currentIndex)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart?.(currentOffer, currentIndex)
  }

  const handleOfferClick = () => {
    onOfferClick?.(currentOffer, currentIndex)
  }

  // Calcular descuento
  const getDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100)
  }

  // Formatear tiempo restante para ofertas limitadas
  const formatTimeRemaining = (endTime: string) => {
    const now = new Date().getTime()
    const end = new Date(endTime).getTime()
    const diff = end - now

    if (diff <= 0) return "¡Oferta expirada!"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m restantes`
    }
    return `${minutes}m restantes`
  }

  if (totalOfertas === 0) {
    return (
      <section className={styles.container} ref={containerRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Tag className={styles.titleIcon} />
            Ofertas del Día
          </h2>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🏷️</div>
          <h3>No hay ofertas disponibles</h3>
          <p>Vuelve pronto para ver nuestras increíbles ofertas del día</p>
        </div>
      </section>
    )
  }

  const progressPercentage = showTimer ? ((intervalTime - timeLeft) / intervalTime) * 100 : 0

  return (
    <section
      className={styles.container}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Ofertas del día"
      tabIndex={0}
    >
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Tag className={styles.titleIcon} />
          Ofertas del Día
        </h2>
        {showTimer && isPlaying && (
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }} />
          </div>
        )}
      </div>

      {/* Oferta principal */}
      <div className={styles.offerContainer}>
        <div className={styles.offerCard} onClick={handleOfferClick}>
          {/* Badge de descuento */}
          {currentOffer.precioOriginal && currentOffer.precioOferta && (
            <div className={styles.discountBadge}>
              <Percent size={16} />
              {getDiscountPercentage(currentOffer.precioOriginal, currentOffer.precioOferta)}% OFF
            </div>
          )}

          {/* Imagen */}
          <div className={styles.imageContainer}>
            <img
              src={currentOffer.imagen || "/placeholder.svg?height=300&width=300"}
              alt={currentOffer.titulo || `Oferta ${currentIndex + 1}`}
              className={styles.offerImage}
            />

            {/* Overlay con acciones */}
            <div className={styles.imageOverlay}>
              <button
                className={`${styles.actionButton} ${styles.favoriteButton} ${
                  favorites.has(currentIndex) ? styles.favoriteActive : ""
                }`}
                onClick={handleToggleFavorite}
                aria-label={favorites.has(currentIndex) ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                <Heart size={20} fill={favorites.has(currentIndex) ? "currentColor" : "none"} />
              </button>
              <button className={styles.actionButton} onClick={handleShare} aria-label="Compartir oferta">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className={styles.offerContent}>
            {currentOffer.categoria && <span className={styles.category}>{currentOffer.categoria}</span>}

            <h3 className={styles.offerTitle}>{currentOffer.titulo || "Oferta especial"}</h3>

            <p className={styles.offerDescription}>{currentOffer.descripcion}</p>

            {/* Precios */}
            <div className={styles.priceContainer}>
              {currentOffer.precioOriginal && currentOffer.precioOferta ? (
                <>
                  <span className={styles.originalPrice}>S/ {currentOffer.precioOriginal.toFixed(2)}</span>
                  <span className={styles.offerPrice}>S/ {currentOffer.precioOferta.toFixed(2)}</span>
                </>
              ) : (
                currentOffer.precio && <span className={styles.price}>S/ {currentOffer.precio.toFixed(2)}</span>
              )}
            </div>

            {/* Tiempo limitado */}
            {currentOffer.fechaVencimiento && (
              <div className={styles.timeRemaining}>
                <Clock size={16} />
                <span>{formatTimeRemaining(currentOffer.fechaVencimiento)}</span>
              </div>
            )}

            {/* Botones de acción */}
            <div className={styles.actionButtons}>
              <button className={styles.primaryButton} onClick={handleAddToCart}>
                <ShoppingCart size={18} />
                Agregar al Carrito
              </button>
              <button className={styles.secondaryButton} onClick={handleOfferClick}>
                <Eye size={18} />
                Ver Detalles
              </button>
            </div>
          </div>
        </div>

        {/* Controles de navegación */}
        {showControls && totalOfertas > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.navButtonPrev}`}
              onClick={goToPrevious}
              aria-label="Oferta anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={goToNext}
              aria-label="Oferta siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Controles inferiores */}
      <div className={styles.bottomControls}>
        {/* Indicadores */}
        {showIndicators && totalOfertas > 1 && (
          <div className={styles.indicators}>
            {ofertas.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ""}`}
                onClick={() => goToOffer(index)}
                aria-label={`Ir a oferta ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Controles de reproducción */}
        {autoPlay && totalOfertas > 1 && (
          <div className={styles.playControls}>
            <button
              className={styles.playButton}
              onClick={toggleAutoPlay}
              aria-label={isPlaying ? "Pausar reproducción automática" : "Iniciar reproducción automática"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <span className={styles.offerCounter}>
              {currentIndex + 1} / {totalOfertas}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

export default OfertasDia
