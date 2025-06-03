import { useEffect, useState } from 'react';
import styles from './OfertasDia.module.css';
import type { Oferta, OfertasDiaProps } from './OfertasDia.types';

const OfertasDia: React.FC<OfertasDiaProps> = ({
  ofertas,
  intervalTime = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (ofertas.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ofertas.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [ofertas, intervalTime]);

  if (ofertas.length === 0) {
    return (
      <section className={styles.ofertasContainer}>
        <h2 className={styles.tituloOfertas}>Ofertas del Día</h2>
        <div className={styles.noOfertasMessage}>
          No hay ofertas disponibles en este momento.
        </div>
      </section>
    );
  }

  const ofertaActual: Oferta = ofertas[currentIndex];

  const handleAnterior = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ofertas.length - 1 : prevIndex - 1
    );
  };

  const handleSiguiente = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ofertas.length);
  };

  return (
    <section className={styles.ofertasContainer}>
      <h2 className={styles.tituloOfertas}>Ofertas del Día</h2>
      <div className={styles.ofertasDia}>
        <div className={styles.oferta}>
          <img
            src={ofertaActual.imagen}
            alt={`Imagen de la oferta ${currentIndex + 1}`}
            className={styles.ofertaImagen}
          />
          <p className={styles.ofertaTexto}>{ofertaActual.texto}</p>
        </div>
        <div className={styles.botones}>
          <button onClick={handleAnterior} className={styles.boton}>
            ⬅️ Anterior
          </button>
          <button onClick={handleSiguiente} className={styles.boton}>
            Siguiente ➡️
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfertasDia;
