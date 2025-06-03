// Define la interfaz para las propiedades que el componente puede recibir
export interface ImageWithDescriptionProps {
  imageUrl: string;      // URL de la imagen
  altText: string;       // Texto alternativo para la imagen (accesibilidad)
  description: string;   // Texto de la descripción
}