import { useState, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';
import food1 from '../../assets/food1.jpg';
import food2 from '../../assets/food2.jpg';
import food3 from '../../assets/food3.jpg';
import ReactGA from 'react-ga4';
import SEO from '../common/SEO';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const heroImages = [food1, food2, food3];

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    // Preload images
    heroImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => clearTimeout(timer);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, heroImages.length]);

  // Navigation handlers
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Handle navigation to selection menu section
  const handleMenuNavigation = useCallback(() => {
    trackEvent('click', 'menu');
    scrollToSection('menu'); // Scroll to menu section
  }, []);

  // Analytics tracking
  const trackEvent = useCallback((action, label) => {
    ReactGA.event({
      category: 'Hero',
      action,
      label,
    });
  }, []);

  return (
    <>
      <SEO
        title="Paramitha Catering - Layanan Katering Premium Klaten"
        description="Layanan katering terbaik di Klaten dengan menu lezat dan pelayanan profesional untuk acara pernikahan, perusahaan, dan keluarga."
        keywords={['katering Klaten', 'catering premium', 'katering pernikahan', 'katering perusahaan', 'makanan enak Klaten']}
        image="/assets/food1.webp"
      />
      
      <section 
        className={`${styles.hero} ${isLoaded ? styles.loaded : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Slider */}
        <div className={styles.backgroundSlider}>
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
              style={{ backgroundImage: `url(${image})` }}
              aria-hidden={index !== currentSlide}
            />
          ))}
          <div className={styles.overlay} />
        </div>

        {/* Main Content */}
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
              Katering Terbaik
            </div>
            
            <h1 className={styles.title}>
              Cita Rasa Istimewa untuk 
              <span className={styles.highlight}> Momen Berharga</span>
            </h1>
            
            <p className={styles.subtitle}>
              Nggawèkaké cita rasa Jawi asli sing nggumunké kanthi layanan setya lan ikhlas kanggo saben momen istimewa Panjenengan. Saka upacara kasalèyan nganti acara korporasi, kula sami siap nyawiji kasugihan budaya Jawa ing saben suguhan, kanthi dedikasi lan kasetyan sing dhuwur
            </p>

            {/* Feature Icons */}
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.1 13.34L2 17.4V8.6C2 7.16 3.16 6 4.6 6H19.4C20.84 6 22 7.16 22 8.6V17.4L15.9 13.34L12 15.9L8.1 13.34ZM12 2C10.9 2 10 2.9 10 4S10.9 6 12 6 14 5.1 14 4 13.1 2 12 2ZM21 18.4C21 19.28 20.28 20 19.4 20H4.6C3.72 20 3 19.28 3 18.4V16.6L8.1 13.1L12 15.3L15.9 13.1L21 16.6V18.4Z"/>
                  </svg>
                </div>
                <span>Menu Berkualitas</span>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L3 7L12 12L21 7L12 2Z"/>
                    <path d="M3 17L12 22L21 17"/>
                    <path d="M3 12L12 17L21 12"/>
                  </svg>
                </div>
                <span>Pengiriman Cepat</span>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.1 20C11.5 20 14.2 16.83 14.2 12.8C14.2 11.95 14.06 11.14 13.81 10.39L17 8ZM21.8 2.2C21.8 2.2 20.4 2.2 18.5 4.1C16.6 6 16.6 7.4 16.6 7.4S18 7.4 19.9 5.5C21.8 3.6 21.8 2.2 21.8 2.2Z"/>
                  </svg>
                </div>
                <span>Bahan Segar</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaGroup}>
              <a
                href="https://wa.me/6282237299901"
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => trackEvent('click', 'whatsapp')}
                aria-label="Hubungi via WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382C17.367 14.382 15.618 15.618 15.618 17.618C15.618 18.007 15.007 18.618 14.618 18.618H8.382C7.993 18.618 7.382 18.007 7.382 17.618C7.382 15.618 5.633 14.382 5.528 14.382C5.139 14.382 4.528 13.771 4.528 13.382V6.618C4.528 6.229 5.139 5.618 5.528 5.618C5.633 5.618 7.382 4.382 7.382 2.382C7.382 1.993 7.993 1.382 8.382 1.382H14.618C15.007 1.382 15.618 1.993 15.618 2.382C15.618 4.382 17.367 5.618 17.472 5.618C17.861 5.618 18.472 6.229 18.472 6.618V13.382C18.472 13.771 17.861 14.382 17.472 14.382Z"/>
                </svg>
                Hubungi Kami
              </a>
              
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={handleMenuNavigation}
                aria-label="Lihat menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"/>
                </svg>
                Lihat Menu
              </button>
            </div>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className={styles.slideNav}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.navDot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        
      </section>
    </>
  );
};

export default Hero;