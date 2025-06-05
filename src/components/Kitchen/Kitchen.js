import { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './Kitchen.module.css';
import kitchenData from '../../data/kitchenData';

const Kitchen = ({ dapurRef }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize kitchen data length to avoid recalculation
  const dataLength = useMemo(() => kitchenData.length, []);

  // Auto-advance carousel with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % dataLength);
    }, 6000); // Slightly slower for better UX
    return () => clearInterval(interval);
  }, [dataLength]);

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Optimize touch handlers with useCallback
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentImage(prev => (prev + 1) % dataLength);
      } else {
        setCurrentImage(prev => (prev - 1 + dataLength) % dataLength);
      }
    }
  }, [touchStart, touchEnd, dataLength]);

  // Optimize navigation with useCallback
  const navigateImage = useCallback((direction) => {
    if (direction === 'next') {
      setCurrentImage(prev => (prev + 1) % dataLength);
    } else {
      setCurrentImage(prev => (prev - 1 + dataLength) % dataLength);
    }
  }, [dataLength]);

  // Optimize dot navigation with useCallback
  const handleDotClick = useCallback((index) => {
    setCurrentImage(index);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  }, [navigateImage]);

  // Memoize current data to avoid recalculation
  const currentData = useMemo(() => kitchenData[currentImage], [currentImage]);

  // Preload next image for better performance
  useEffect(() => {
    const nextIndex = (currentImage + 1) % dataLength;
    const img = new Image();
    img.src = kitchenData[nextIndex].image;
  }, [currentImage, dataLength]);

  if (isLoading) {
    return (
      <section className={styles.kitchen} ref={dapurRef}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={dapurRef} 
      className={styles.kitchen} 
      data-aos="fade-up"
      itemScope 
      itemType="https://schema.org/FoodEstablishment"
      role="region"
      aria-label="Fasilitas Dapur Profesional"
    >
      <div className={styles.kitchenContainer}>
        <header className={styles.kitchenHeader}>
          <div className={styles.headerAccent} aria-hidden="true">
            <span className={styles.accentLine}></span>
            <span className={styles.accentLine}></span>
            <span className={styles.accentLine}></span>
          </div>
          <div className={styles.labelBackground}>
            <span className={styles.kitchenLabel}>DAPUR PROFESIONAL</span>
          </div>
          <h1 className={styles.kitchenTitle} itemProp="name">
            Fasilitas Modern & Higienis
          </h1>
          <div className={styles.titleUnderline} aria-hidden="true">
            <span className={styles.underlineDot}></span>
            <span className={styles.underlineDot}></span>
            <span className={styles.underlineDot}></span>
          </div>
        </header>

        <div className={styles.carouselSection}>
          <div className={styles.carouselWrapper}>
            <div 
              className={styles.kitchenCarousel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onKeyDown={handleKeyDown}
              role="region"
              aria-label="Galeri fasilitas dapur"
              aria-live="polite"
              tabIndex="0"
            >
              {kitchenData.map((item, index) => (
                <div 
                  key={item.id}
                  className={`${styles.carouselItem} ${
                    index === currentImage ? styles.active : ''
                  }`}
                  aria-hidden={index !== currentImage}
                >
                  <picture>
                    <source 
                      media="(max-width: 576px)" 
                      srcSet={item.image} 
                      type="image/webp"
                    />
                    <img
                      src={item.image}
                      alt={`${item.caption} - Fasilitas dapur profesional dengan standar kebersihan tinggi`}
                      className={styles.image}
                      style={{ objectPosition: item.meta?.focus || 'center' }}
                      loading={index === currentImage ? 'eager' : 'lazy'}
                      decoding="async"
                      itemProp="image"
                      width="900"
                      height="600"
                    />
                  </picture>
                  <div className={styles.imageOverlay}>
                    <div className={styles.overlayContent}>
                      <h2 className={styles.imageTitle} itemProp="description">
                        {item.caption}
                      </h2>
                      <div className={styles.chefInfo}>
                        <span className={styles.chefBadge} itemProp="employee">
                          <span className={styles.badgeIcon}></span>
                          {item.meta?.chef || 'Chef Profesional'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Navigation arrows */}
              <button 
                className={`${styles.navButton} ${styles.navPrev}`}
                onClick={() => navigateImage('prev')}
                aria-label="Gambar dapur sebelumnya"
                type="button"
              >
                <span className={styles.navIcon} aria-hidden="true">&#8249;</span>
              </button>
              <button 
                className={`${styles.navButton} ${styles.navNext}`}
                onClick={() => navigateImage('next')}
                aria-label="Gambar dapur selanjutnya"
                type="button"
              >
                <span className={styles.navIcon} aria-hidden="true">&#8250;</span>
              </button>
            </div>

            {/* Progress indicators */}
            <nav className={styles.progressBar} role="tablist" aria-label="Navigasi gambar dapur">
              {kitchenData.map((_, idx) => (
                <button 
                  key={idx}
                  className={`${styles.progressDot} ${
                    idx === currentImage ? styles.active : ''
                  }`}
                  onClick={() => handleDotClick(idx)}
                  role="tab"
                  aria-selected={idx === currentImage}
                  aria-label={`Lihat gambar dapur ${idx + 1} dari ${dataLength}`}
                  type="button"
                />
              ))}
            </nav>
          </div>

          <div className={styles.kitchenInfo}>
            <div className={styles.description}>
              <p itemProp="description">
                {currentData?.description || 'Dapur profesional dengan fasilitas modern dan standar kebersihan internasional untuk menghasilkan hidangan berkualitas tinggi.'}
              </p>
            </div>
            
            <div className={styles.features} itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
              {(currentData?.meta?.features || ['Peralatan Modern', 'Standar Higienis', 'Chef Berpengalaman']).map((feature, i) => (
                <span key={i} className={styles.featureTag} itemProp="name">
                  <span className={styles.featureIcon}></span>
                  {feature}
                </span>
              ))}
            </div>

            <div className={styles.decorativeLines} aria-hidden="true">
              <span className={styles.decorativeLine}></span>
              <span className={styles.decorativeLine}></span>
              <span className={styles.decorativeLine}></span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FoodEstablishment",
          "name": "Fasilitas Dapur Profesional",
          "description": "Dapur modern dengan fasilitas profesional dan standar kebersihan tinggi",
          "amenityFeature": currentData?.meta?.features || [],
          "image": kitchenData.map(item => item.image),
          "employee": {
            "@type": "Person",
            "name": currentData?.meta?.chef || "Chef Profesional"
          }
        })}
      </script>
    </section>
  );
};

Kitchen.propTypes = {
  dapurRef: PropTypes.object.isRequired,
};

export default Kitchen;