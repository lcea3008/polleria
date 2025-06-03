import React from 'react';
// Importamos los componentes hijos usando la ruta correcta
import CarruselHorizontal from '../../components/CarruselHorizontal/CarruselHorizontal';
import OfertasDia from '../../components/OfertasDia/OfertasDia';
import styles from './Home.module.css'; // Importamos los estilos con CSS Modules
import type { HomeProps } from './Home.types'; // Importamos la interfaz de props
import local1 from '../../assets/images/local1.jpg';
import local2 from '../../assets/images/local2.jpg';
import local3 from '../../assets/images/local3.jpg';
import logo from '../../assets/logo.jpg';

// Definimos los datos que se pasarán a los componentes hijos
// Es una buena práctica definirlos aquí o en un archivo de constantes si crecen mucho
const carouselImages: string[] = [
  local1,
  local2,
  local3,
];

const dailyOffersData = [
  {
    texto: '¡Pollo a la brasa con papas y ensalada a solo S/19.90!',
    imagen: logo,
  },
  {
    texto: 'Promoción: 3x2 en alitas BBQ.',
    imagen: local3,
  },
  {
    texto: '¡20% de descuento en pedidos mayores a S/50!',
    imagen: local1,
  },
];


// Tipamos el componente usando React.FC y la interfaz HomeProps
const Home: React.FC<HomeProps> = () => {
  return (
    <main className={styles.homeContainer}>
      <h2 className={styles.homeTitle}>
        Ubicados en el corazón de Oxapampa, en la Pollería Roy's ofrecemos el mejor pollo a la brasa de la zona,
        acompañado de papas crujientes, ensaladas frescas y nuestras salsas secretas que te harán volver por más.
        Disfruta nuestras promociones especiales todos los fines de semana.
      </h2>
      
      <div className={styles.contenidoPrincipal}>
        <section className={styles.carruselSection}>
          {/* Pasamos las props requeridas al CarruselHorizontal */}
          <CarruselHorizontal
            images={carouselImages}
            description="Descubre nuestro local con las mejores ofertas y promociones exclusivas."
            intervalTime={4000}
          />
        </section>
        <section className={styles.ofertasSection}>
          {/* Pasamos las props requeridas a OfertasDia */}
          <OfertasDia
            ofertas={dailyOffersData}
            intervalTime={3000}
          />
        </section>
      </div>
    </main>
  );
};

export default Home;