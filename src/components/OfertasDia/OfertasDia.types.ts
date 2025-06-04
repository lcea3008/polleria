export interface Oferta {
  id?: string | number
  titulo?: string
  descripcion: string
  imagen: string
  categoria?: string
  precio?: number
  precioOriginal?: number
  precioOferta?: number
  fechaVencimiento?: string
  disponible?: boolean
  stock?: number
}

export interface OfertasDiaProps {
  ofertas: Oferta[]
  intervalTime?: number
  autoPlay?: boolean
  showTimer?: boolean
  showControls?: boolean
  showIndicators?: boolean
  pauseOnHover?: boolean
  enableKeyboard?: boolean
  onOfferClick?: (offer: Oferta, index: number) => void
  onAddToCart?: (offer: Oferta, index: number) => void
  onToggleFavorite?: (offer: Oferta, index: number, isFavorite: boolean) => void
  onShare?: (offer: Oferta, index: number) => void
}
