// src/components/common/CookieConsent.jsx
import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

/**
 * Komponen untuk menampilkan popup persetujuan cookie.
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieConsent}>
      <p>
        Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Dengan melanjutkan, Anda setuju
        dengan kebijakan cookie kami.
      </p>
      <button onClick={acceptCookies} className={styles.acceptButton}>
        Terima
      </button>
    </div>
  );
};

export default CookieConsent;