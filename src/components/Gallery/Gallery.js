import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.module.css';
import galleryData from '../../data/galleryData';
import SEO from '../common/SEO';

const Gallery = ({
  galeriRef,
  galleryFilter,
  setGalleryFilter,
  visibleGalleryItems,
  setVisibleGalleryItems,
}) => {
  const categories = ['all', ...new Set(galleryData.map((item) => item.category))];

  const filteredGallery = galleryData
    .filter((item) => galleryFilter === 'all' || item.category === galleryFilter)
    .slice(0, visibleGalleryItems);

  const loadMore = () => {
    setVisibleGalleryItems((prev) => prev + 6);
  };

  const getCategoryName = (category) => {
    const categoryNames = {
      'all': 'Semua',
      'wedding': 'Pernikahan',
      'corporate': 'Perusahaan',
      'family': 'Keluarga'
    };
    return categoryNames[category] || category;
  };

  return (
    <>
      <SEO
        title="Galeri Paramitha Catering - Portfolio Acara Terbaik di Klaten"
        description="Lihat koleksi foto profesional acara pernikahan, perusahaan, dan keluarga yang diselenggarakan oleh Paramitha Catering. Dokumentasi berkualitas tinggi dari berbagai event di Klaten dan sekitarnya."
        keywords={[
          'galeri catering klaten',
          'foto acara pernikahan',
          'catering perusahaan',
          'dokumentasi event',
          'portfolio paramitha catering',
          'wedding catering klaten',
          'family gathering catering'
        ]}
        image="/assets/gallery-hero.webp"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Galeri Paramitha Catering",
          "description": "Portfolio acara catering profesional",
          "provider": {
            "@type": "Organization",
            "name": "Paramitha Catering"
          }
        }}
      />

      <section 
        ref={galeriRef} 
        className={styles.gallery}
        aria-label="Galeri foto acara catering"
      >
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <span className={styles.label}>GALERI KAMI</span>
              <div className={styles.accentLine}></div>
              <h2 className={styles.title}>Momen Spesial Bersama Kami</h2>
              <div className={styles.titleUnderline}></div>
              <p className={styles.subtitle}>
                Koleksi dokumentasi profesional dari berbagai acara yang telah kami layani
              </p>
            </div>
          </header>
          
          <nav className={styles.filterNav}>
            <div className={styles.filterContainer}>
              <div className={styles.filterList}>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`${styles.filterButton} ${
                      galleryFilter === category ? styles.active : ''
                    }`}
                    onClick={() => setGalleryFilter(category)}
                    aria-pressed={galleryFilter === category}
                  >
                    <span className={styles.buttonText}>{getCategoryName(category)}</span>
                    <div className={styles.buttonLine}></div>
                  </button>
                ))}
              </div>
            </div>
          </nav>
          
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              {filteredGallery.map((item, index) => (
                <article 
                  key={item.id} 
                  className={styles.item}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className={styles.imageContainer}>
                    <div className={styles.imageFrame}>
                      <img
                        src={item.image}
                        alt={`${item.caption} - ${item.location} ${item.date}`}
                        className={styles.image}
                        loading={index < 6 ? "eager" : "lazy"}
                        decoding="async"
                        width="400"
                        height="300"
                      />
                    </div>
                    
                    <div className={styles.overlay}>
                      <div className={styles.overlayContent}>
                        <span className={styles.category}>
                          {getCategoryName(item.category)}
                        </span>
                        <h3 className={styles.caption}>{item.caption}</h3>
                        <div className={styles.meta}>
                          <span className={styles.date}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                            </svg>
                            {item.date}
                          </span>
                          <span className={styles.location}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          
          {visibleGalleryItems < galleryData.filter(item => 
            galleryFilter === 'all' || item.category === galleryFilter
          ).length && (
            <div className={styles.loadMoreContainer}>
              <button
                className={styles.loadMore}
                onClick={loadMore}
                aria-label="Tampilkan lebih banyak foto galeri"
              >
                <span>Tampilkan Lebih Banyak</span>
                <div className={styles.buttonHoverLine}></div>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

Gallery.propTypes = {
  galeriRef: PropTypes.object.isRequired,
  galleryFilter: PropTypes.string.isRequired,
  setGalleryFilter: PropTypes.func.isRequired,
  visibleGalleryItems: PropTypes.number.isRequired,
  setVisibleGalleryItems: PropTypes.func.isRequired,
};

export default memo(Gallery);