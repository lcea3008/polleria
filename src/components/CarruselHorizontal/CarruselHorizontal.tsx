"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react"
import styles from "./CarruselHorizontal.module.css"
import type { CarruselHorizontalProps } from "./CarruselHorizontal.types"

const CarruselHorizontal: React.FC<CarruselHorizontalProps> = ({
  images = [],
  title,
  description,
  intervalTime = 4000,
  autoPlay = true,
  showControls = true,
  showIndicators = true,
  showThumbnails = false,
  pauseOnHover = true,
  enableKeyboard = true,
  enableTouch = true,
  transitionDuration = 500,
  aspectRatio = "16/9",
  loadingPlaceholder = "/placeholder.svg?height=400&width=600",
  onImageChange,
  onImageClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carruselRef = useRef<HTMLDivElement>(null)

  // Normalizar imágenes a formato consistente
  const normalizedImages = useMemo(() => {
    return images.map((img, index) => {
      if (typeof img === "string") {
        return {
          src: img,
          alt: `Imagen ${index + 1}`,
          title: `Imagen ${index + 1}`,
        }
      }
      return {
        ...img,
        alt: img.alt || `Imagen ${index + 1}`,
        title: img.title || img.alt || `Imagen ${index + 1}`,
      }
    })
  }, [images])

  const totalImages = normalizedImages.length

  // Función para ir a una imagen específica
  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalImages) {
        setCurrentIndex(index)
        onImageChange?.(index, normalizedImages[index])
      }
    },
    [totalImages, normalizedImages, onImageChange],
  )

  // Navegación anterior
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1
    goToSlide(newIndex)
  }, [currentIndex, totalImages, goToSlide])

  // Navegación siguiente
  const goToNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % totalImages
    goToSlide(newIndex)
  }, [currentIndex, totalImages, goToSlide])

  // Control de reproducción automática
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (isPlaying && totalImages > 1) {
      intervalRef.current = setInterval(goToNext, intervalTime)
    }
  }, [isPlaying, totalImages, intervalTime, goToNext])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
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
      if (!carruselRef.current?.contains(document.activeElement)) return

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
        case "Home":
          event.preventDefault()
          goToSlide(0)
          break
        case "End":
          event.preventDefault()
          goToSlide(totalImages - 1)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [enableKeyboard, goToPrevious, goToNext, toggleAutoPlay, goToSlide, totalImages])

  // Soporte táctil
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableTouch) return
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableTouch) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!enableTouch || !touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  // Manejo de carga de imágenes
  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index))
  }

  // Precargar imágenes adyacentes
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
    }

    // Precargar imagen actual y adyacentes
    const indicesToPreload = [
      currentIndex,
      (currentIndex + 1) % totalImages,
      currentIndex === 0 ? totalImages - 1 : currentIndex - 1,
    ]

    indicesToPreload.forEach((index) => {
      if (normalizedImages[index] && !loadedImages.has(index) && !failedImages.has(index)) {
        preloadImage(normalizedImages[index].src)
      }
    })
  }, [currentIndex, totalImages, normalizedImages, loadedImages, failedImages])

  if (totalImages === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🖼️</div>
        <p className={styles.emptyMessage}>No hay imágenes para mostrar</p>
      </div>
    )
  }

  const currentImage = normalizedImages[currentIndex]

  return (
    <div
      ref={carruselRef}
      className={styles.carrusel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label={title || "Carrusel de imágenes"}
      tabIndex={0}
    >
      {/* Título y descripción */}
      {(title || description) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}

      {/* Contenedor principal */}
      <div className={styles.container} style={{ aspectRatio }}>
        {/* Imagen principal */}
        <div
          className={styles.imageContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={failedImages.has(currentIndex) ? loadingPlaceholder : currentImage.src}
            alt={currentImage.alt}
            title={currentImage.title}
            className={`${styles.image} ${loadedImages.has(currentIndex) ? styles.imageLoaded : ""}`}
            onLoad={() => handleImageLoad(currentIndex)}
            onError={() => handleImageError(currentIndex)}
            onClick={() => onImageClick?.(currentIndex, currentImage)}
            style={{ transitionDuration: `${transitionDuration}ms` }}
          />

          {/* Loading overlay */}
          {!loadedImages.has(currentIndex) && !failedImages.has(currentIndex) && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner} />
            </div>
          )}

          {/* Controles de navegación */}
          {showControls && totalImages > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.navButtonPrev}`}
                onClick={goToPrevious}
                aria-label="Imagen anterior"
                disabled={totalImages <= 1}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`${styles.navButton} ${styles.navButtonNext}`}
                onClick={goToNext}
                aria-label="Imagen siguiente"
                disabled={totalImages <= 1}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Información de la imagen */}
          <div className={styles.imageInfo}>
            <span className={styles.imageCounter}>
              {currentIndex + 1} / {totalImages}
            </span>
            {currentImage.title && <span className={styles.imageTitle}>{currentImage.title}</span>}
          </div>
        </div>

        {/* Controles de reproducción */}
        {autoPlay && totalImages > 1 && (
          <div className={styles.playControls}>
            <button
              className={styles.playButton}
              onClick={toggleAutoPlay}
              aria-label={isPlaying ? "Pausar reproducción automática" : "Iniciar reproducción automática"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className={styles.resetButton} onClick={() => goToSlide(0)} aria-label="Volver al inicio">
              <RotateCcw size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Indicadores */}
      {showIndicators && totalImages > 1 && (
        <div className={styles.indicators} role="tablist" aria-label="Indicadores de imagen">
          {normalizedImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a imagen ${index + 1}`}
              role="tab"
              aria-selected={index === currentIndex}
            />
          ))}
        </div>
      )}

      {/* Miniaturas */}
      {showThumbnails && totalImages > 1 && (
        <div className={styles.thumbnails}>
          {normalizedImages.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a ${image.alt}`}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className={styles.thumbnailImage} />
            </button>
          ))}
        </div>
      )}

      
    </div>
  )
}

export default CarruselHorizontal
