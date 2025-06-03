import { useState } from 'react';
// Importamos los estilos como un módulo CSS
import styles from './Header.module.css';
import logo from '../../assets/logo.jpg';

import type { HeaderProps } from './Header.types';



// Tipamos el componente usando React.FC y la interfaz HeaderProps
const Header: React.FC<HeaderProps> = () => {
  // Tipamos el estado explícitamente para asegurar que siempre sea un booleano
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Tipamos el evento para el click, aunque TypeScript lo inferiría bien aquí
  const toggleMenu = (): void => {
  setMenuOpen((prevMenuOpen) => !prevMenuOpen);
};


  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo Pollería" />
        <span className={styles.nombrePolleria}>Pollería Roy's</span>
      </div>
      <button className={styles.menuToggle} onClick={toggleMenu} aria-expanded={menuOpen}>
        ☰
      </button>
      <nav className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        <ul>
          <li><a href="/productos">Productos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contactanos">Contáctanos</a></li>
        </ul>
      </nav>
      <div className={styles.searchBar}>
        <input type="search" placeholder="Buscar..." />
        <button>🔍</button>
      </div>
    </header>
  );
};

export default Header;