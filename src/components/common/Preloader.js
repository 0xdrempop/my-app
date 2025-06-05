// src/components/common/Preloader.jsx
import styles from './Preloader.module.css';

/**
 * Komponen Preloader untuk menampilkan animasi pemuatan.
 */
const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner}></div>
      <p>Memuat...</p>
    </div>
  );
};

export default Preloader;