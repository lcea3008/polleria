"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Heart,
  Share2,
  ZoomIn,
  Eye,
  Star,
  MapPin,
  Calendar,
  User,
  ExternalLink,
  ImageIcon,
  AlertCircle,
} from "lucide-react"
import styles from "./ImageWithDescription.module.css"
import type { ImageWithDescriptionProps } from "./ImageWithDescription.types"

const ImageWithDescription: React.FC<ImageWithDescriptionProps> = ({
  imageUrl,
  altText,
  description,
  title,
  subtitle,
  variant = "card",
  size = "medium",
  aspectRatio = "4/3",
  layout = "vertical",
  showActions = false,
  showRating = false,
  rating = 0,
  maxRating = 5,
  tags = [],
  author,
  date,
  location,
  badge,
  placeholder = "/placeholder.svg?height=300&width=400",
  lazy = true,
  zoomable = false,
  clickable = false,
  loading = false,
  error = false,
  onImageClick,
  onImageLoad,
  onImageError,
  onLike,
  onShare,
  onActionClick,
  className = "",
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(error)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isInView, setIsInView] = useState<boolean>(!lazy)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!lazy || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, isInView])

  // Handlers
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
    setImageError(false)
    onImageLoad?.()
  }, [onImageLoad])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(false)
    onImageError?.()
  }, [onImageError])

  const handleImageClick = useCallback(() => {
    if (clickable || zoomable) {
      onImageClick?.(imageUrl, altText)
    }
  }, [clickable, zoomable, onImageClick, imageUrl, altText])

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsLiked((prev) => !prev)
      onLike?.(!isLiked)
    },
    [isLiked, onLike],
  )

  const handleShare = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onShare?.(
      imageUrl ?? '',
      title ?? altText ?? '',
      description ?? ''
    )

    },
    [onShare, imageUrl, title, altText, description],
  )

  const handleActionClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onActionClick?.()
    },
    [onActionClick],
  )

  // Renderizar estrellas de rating
  const renderRating = () => {
    if (!showRating) return null

    return (
      <div className={styles.rating} aria-label={`Calificación: ${rating} de ${maxRating} estrellas`}>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            size={16}
            className={`${styles.star} ${index < rating ? styles.starFilled : ""}`}
            fill={index < rating ? "currentColor" : "none"}
          />
        ))}
        <span className={styles.ratingText}>({rating})</span>
      </div>
    )
  }

  // Renderizar tags
  const renderTags = () => {
    if (tags.length === 0) return null

    return (
      <div className={styles.tags}>
        {tags.slice(0, 3).map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
        {tags.length > 3 && <span className={styles.tagMore}>+{tags.length - 3}</span>}
      </div>
    )
  }

  // Renderizar metadata
  const renderMetadata = () => {
    const hasMetadata = author || date || location

    if (!hasMetadata) return null

    return (
      <div className={styles.metadata}>
        {author && (
          <div className={styles.metadataItem}>
            <User size={14} />
            <span>{author}</span>
          </div>
        )}
        {date && (
          <div className={styles.metadataItem}>
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        )}
        {location && (
          <div className={styles.metadataItem}>
            <MapPin size={14} />
            <span>{location}</span>
          </div>
        )}
      </div>
    )
  }

  // Renderizar acciones
  const renderActions = () => {
    if (!showActions) return null

    return (
      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${isLiked ? styles.actionButtonLiked : ""}`}
          onClick={handleLike}
          aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>
        <button className={styles.actionButton} onClick={handleShare} aria-label="Compartir">
          <Share2 size={18} />
        </button>
        {(zoomable || clickable) && (
          <button className={styles.actionButton} onClick={handleImageClick} aria-label="Ver imagen completa">
            {zoomable ? <ZoomIn size={18} /> : <Eye size={18} />}
          </button>
        )}
        {onActionClick && (
          <button className={styles.actionButton} onClick={handleActionClick} aria-label="Más opciones">
            <ExternalLink size={18} />
          </button>
        )}
      </div>
    )
  }

  // Clases CSS dinámicas
  const containerClasses = [
    styles.container,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`layout-${layout}`],
    clickable || zoomable ? styles.clickable : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={clickable ? "button" : "img"}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? handleImageClick : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleImageClick()
              }
            }
          : undefined
      }
    >
      {/* Imagen */}
      <div className={styles.imageContainer} style={{ aspectRatio }}>
        {/* Badge */}
        {badge && (
          <div className={`${styles.badge} ${styles[`badge-${badge.variant || "default"}`]}`}>
            {badge.icon && <span className={styles.badgeIcon}>{badge.icon}</span>}
            <span>{badge.text}</span>
          </div>
        )}

        {/* Loading skeleton */}
        {(loading || (!imageLoaded && !imageError && isInView)) && (
          <div className={styles.skeleton}>
            <ImageIcon size={48} className={styles.skeletonIcon} />
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className={styles.errorState}>
            <AlertCircle size={48} className={styles.errorIcon} />
            <p className={styles.errorText}>Error al cargar la imagen</p>
          </div>
        )}

        {/* Imagen principal */}
        {isInView && !loading && (
          <img
            ref={imageRef}
            src={imageError ? placeholder : imageUrl}
            alt={altText}
            className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ""}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={lazy ? "lazy" : "eager"}
          />
        )}

        {/* Overlay con acciones */}
        {showActions && isHovered && <div className={styles.overlay}>{renderActions()}</div>}

        {/* Tags flotantes */}
        {tags.length > 0 && variant === "card" && <div className={styles.floatingTags}>{renderTags()}</div>}
      </div>

      {/* Contenido */}
      <div className={styles.content}>
        {/* Header del contenido */}
        <div className={styles.contentHeader}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {renderRating()}
        </div>

        {/* Descripción */}
        {description && <p className={styles.description}>{description}</p>}

        {/* Tags (para variantes que no son card) */}
        {tags.length > 0 && variant !== "card" && renderTags()}

        {/* Metadata */}
        {renderMetadata()}

        {/* Acciones en el contenido (para layout horizontal) */}
        {showActions && layout === "horizontal" && <div className={styles.contentActions}>{renderActions()}</div>}
      </div>
    </div>
  )
}

export default ImageWithDescription
