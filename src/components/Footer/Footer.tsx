// Importamos los estilos como un módulo CSS
import styles from './Footer.module.css';
import tiktok from '../../assets/icons/tik-tok.png';
import facebook from '../../assets/icons/facebook.png';
import instagram from '../../assets/icons/instagram.png';
import type { FooterProps } from './Footer.types';

// Tipamos el componente usando React.FC y la interfaz FooterProps
const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Pollería Roys. Todos los derechos reservados.</p>
        <div className={styles.socialLinks}>
          {/* Se recomienda externalizar las rutas y los textos si hay muchos enlaces */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" className={styles.socialIcon} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" className={styles.socialIcon} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <img src={tiktok} alt="TikTok" className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;