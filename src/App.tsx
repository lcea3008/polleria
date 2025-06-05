import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importamos los componentes globales usando las rutas correctas
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Importamos las páginas
import Home from './pages/Home/Home';
import Producto from './pages/Products/ProductsPage';
import Nosotros from './pages/AboutPage/AboutPage';
import Contactanos from './pages/ContactPage/ContactPage'


// Importamos los estilos de App con CSS Modules
import styles from './App.module.css';

// El componente App generalmente no necesita props, pero se tipa con React.FC<object> o React.FC<{}>
const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <Router>
        <Header />
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Producto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contactanos" element={<Contactanos />} />
          
          {/* Si tienes una página de contacto, descomenta la siguiente línea */}
          {/* <Route path="/contactanos" element={<Contactanos />} /> */}
          {/* Ejemplo de una ruta "no encontrada" */}
          <Route path="*" element={<h1 className={styles.notFoundMessage}>Página no encontrada</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;