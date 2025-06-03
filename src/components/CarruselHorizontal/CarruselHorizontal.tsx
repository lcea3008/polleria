import { useEffect, useState } from 'react';
import styles from './CarruselHorizontal.module.css';
import type { CarruselHorizontalProps } from './CarruselHorizontal.types';

const CarruselHorizontal: React.FC<CarruselHorizontalProps> = ({
  images,
  description,
  intervalTime = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images, intervalTime]);

  if (images.length === 0) {
    return <div className={styles.noImagesMessage}>No hay imágenes para mostrar en el carrusel.</div>;
  }

  const handleAnterior = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleSiguiente = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.carruselContainer}>
      <p className={styles.carruselDescription}>{description}</p>
      <div className={styles.carruselWrapper}>
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className={styles.carruselImage}
        />
      </div>
      <div className={styles.botones}>
        <button onClick={handleAnterior} className={styles.boton}>⬅️ Anterior</button>
        <button onClick={handleSiguiente} className={styles.boton}>Siguiente ➡️</button>
      </div>
    </div>
  );
};

export default CarruselHorizontal;
