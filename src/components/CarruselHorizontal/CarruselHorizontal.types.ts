export interface CarruselImage {
  src: string
  alt: string
  title?: string
  description?: string
}

export interface CarruselHorizontalProps {
  images: (string | CarruselImage)[]
  title?: string
  description?: string
  intervalTime?: number
  autoPlay?: boolean
  showControls?: boolean
  showIndicators?: boolean
  showThumbnails?: boolean
  pauseOnHover?: boolean
  enableKeyboard?: boolean
  enableTouch?: boolean
  transitionDuration?: number
  aspectRatio?: string
  loadingPlaceholder?: string
  onImageChange?: (index: number, image: CarruselImage) => void
  onImageClick?: (index: number, image: CarruselImage) => void
}
