// Define la interfaz para la estructura de un producto individual
// Esto se alinea con las props que espera ImageWithDescription
export interface ProductItem {
  imageUrl: string;
  altText: string;
  description: string;
  // Puedes añadir más propiedades aquí si tus productos tienen, ej:
  // name: string;
  // price: number;
}

// La página de productos no necesita props externas por ahora
export interface ProductsPageProps {
  // Nada por ahora
}