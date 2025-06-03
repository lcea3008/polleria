import React from 'react';
// Importamos el componente ImageWithDescription
import ImageWithDescription from '../../components/ImageWithDescription/ImageWithDescription';
import styles from './ProductsPage.module.css'; // Importamos los estilos con CSS Modules
import type { ProductItem, ProductsPageProps } from './ProductsPage.types'; // Importamos las interfaces
import local1 from '../../assets/images/local1.jpg';
import local2 from '../../assets/images/local2.jpg';
import local3 from '../../assets/images/local3.jpg';

// Datos de ejemplo para los productos
// Idealmente, estos datos vendrían de una API o un archivo de configuración.
const productsData: ProductItem[] = [
  {
    imageUrl: local1,
    altText: 'Pollo Entero a la Brasa',
    description: 'Nuestro clásico pollo entero a la brasa, jugoso por dentro y crocante por fuera. ¡Perfecto para compartir!',
  },
  {
    imageUrl: local2,
    altText: 'Alitas BBQ',
    description: 'Deliciosas alitas bañadas en nuestra salsa BBQ casera, ideales para picar o como entrada.',
  },
  {
    imageUrl: local3,
    altText: 'Combo Familiar',
    description: 'Un combo completo para toda la familia: pollo, papas, ensalada y gaseosa. ¡No te quedes con hambre!',
  },
  
  // Puedes añadir más productos aquí
];

// Tipamos el componente usando React.FC y la interfaz ProductsPageProps
const ProductsPage: React.FC<ProductsPageProps> = () => {
  return (
    <main className={styles.productsPageContainer}>
      <h1 className={styles.pageTitle}>Nuestros Deliciosos Productos</h1>
      <p className={styles.pageDescription}>
        Explora nuestra variedad de platillos, todos preparados con los ingredientes más frescos y el toque secreto de Pollería Roy's.
      </p>
      
      <div className={styles.productsGrid}>
        {/* Usamos el método .map() para renderizar un ImageWithDescription por cada producto */}
        {productsData.map((product, index) => (
          <ImageWithDescription
            key={index} // Una key única es importante cuando se renderizan listas
            imageUrl={product.imageUrl}
            altText={product.altText}
            description={product.description}
          />
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;