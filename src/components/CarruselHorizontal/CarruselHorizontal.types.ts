// Define la interfaz para las propiedades que el componente CarruselHorizontal puede recibir
export interface CarruselHorizontalProps {
  images: string[]; // Un array de URLs de imágenes
  description: string; // El texto descriptivo del carrusel
  intervalTime?: number; // Tiempo en milisegundos para el cambio de imagen (opcional, por defecto 4000)
}