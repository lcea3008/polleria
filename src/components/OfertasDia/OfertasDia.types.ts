// Define la interfaz para la estructura de una oferta individual
export interface Oferta {
  texto: string;
  imagen: string; // URL o path de la imagen
}

// Define la interfaz para las propiedades que el componente OfertasDia puede recibir
export interface OfertasDiaProps {
  ofertas: Oferta[]; // Un array de objetos de tipo Oferta
  intervalTime?: number; // Tiempo en milisegundos para el cambio de oferta (opcional, por defecto 3000)
}