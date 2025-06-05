// src/components/common/BackToTop.jsx
import { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';

/**
 * Komponen tombol untuk kembali ke atas halaman.
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Tampilkan tombol saat scroll lebih dari 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll ke atas saat tombol diklik
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`${styles.backToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default BackToTop;