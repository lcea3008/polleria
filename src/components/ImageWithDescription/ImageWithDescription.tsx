import React from 'react';
import styles from './ImageWithDescription.module.css'; // Importamos los estilos con CSS Modules
import type { ImageWithDescriptionProps } from './ImageWithDescription.types'; // Importamos la interfaz de props

// Tipamos el componente usando React.FC y la interfaz ImageWithDescriptionProps
const ImageWithDescription: React.FC<ImageWithDescriptionProps> = ({
  imageUrl,     // Desestructuramos las props
  altText,
  description,
}) => {
  return (
    <div className={styles.container}>
      <img
        src={imageUrl}
        alt={altText}
        className={styles.image}
      />
      <p className={styles.description}>
        {description}
      </p>
    </div>
  );
};

export default ImageWithDescription;