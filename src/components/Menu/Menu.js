import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Menu.module.css';
import menuData from '../../data/menuData';
import SEO from '../common/SEO';

const Menu = ({ produkRef, menuFilter, setMenuFilter }) => {
  const [currentImages, setCurrentImages] = useState({});

  const filteredMenu =
    menuData && menuData.length > 0
      ? menuFilter === 'all'
        ? menuData
        : menuData.filter((item) => item.category === menuFilter)
      : [];

  const handleImageError = (e, fallbackSrc = '/assets/placeholder.jpg') => {
    console.warn(`Image failed to load: ${e.target.src}`);
    e.target.src = fallbackSrc;
    e.target.onerror = null;
  };

  const handleSwipe = (itemId, direction) => {
    const item = menuData.find((i) => i.id === itemId);
    if (!item || !item.images || item.images.length <= 1) return;

    setCurrentImages((prev) => {
      const currentIndex = prev[itemId] || 0;
      let newIndex;
      if (direction === 'next') {
        newIndex = currentIndex === item.images.length - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? item.images.length - 1 : currentIndex - 1;
      }
      return { ...prev, [itemId]: newIndex };
    });
  };

  const renderDescriptionList = (description) => {
    if (!description) return null;
    const items = description.split(', ').map((item) => item.trim());
    return (
      <ul className={styles.descriptionList}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <section ref={produkRef} className={styles.menu} id="menu">
      <SEO
        title="Menu Paramitha Catering"
        description="Lihat berbagai paket catering kami untuk pernikahan, perusahaan, dan acara keluarga di Klaten."
        keywords={['menu catering', 'paket catering', 'catering Klaten']}
        image="/assets/food1.jpg"
      />

      <div className={styles.menuContainer}>
        <div className={styles.menuHeader}>
          <span className={styles.menuLabel}>MENU KAMI</span>
          <h2 className={styles.menuTitle}>Pilihan Paket Catering</h2>
          <p className={styles.menuSubtitle}>
       Nikmati hidangan khas Jawa sing nggumunké kanggo saben momen istimewa Panjenengan. Saka kasalèyan nganti acara korporasi, kula nyediyakaké menu otentik Jawa, disaji kanthi dedikasi supados tamu ngrasakaké kehangatan tradisi sing ora dilupakaké
          </p>
        </div>

        <div className={styles.menuFilters}>
          <button
            className={`${styles.filterButton} ${menuFilter === 'all' ? styles.active : ''}`}
            onClick={() => setMenuFilter('all')}
          >
            Semua Menu
          </button>
          <button
            className={`${styles.filterButton} ${menuFilter === 'box' ? styles.active : ''}`}
            onClick={() => setMenuFilter('box')}
          >
            Nasi Box
          </button>
          <button
            className={`${styles.filterButton} ${menuFilter === 'prasmanan' ? styles.active : ''}`}
            onClick={() => setMenuFilter('prasmanan')}
          >
            Prasmanan
          </button>
        </div>

        <div className={styles.menuItems}>
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div key={item.id} className={styles.menuItem}>
                <div className={styles.menuImageContainer}>
                  {item.images && item.images.length > 0 ? (
                    <>
                      <img
                        src={item.images[currentImages[item.id] || 0]}
                        alt={item.name || 'Paket Catering'}
                        className={styles.menuImage}
                        loading="lazy"
                        onError={(e) => handleImageError(e)}
                      />
                      {item.images.length > 1 && (
                        <>
                          <button
                            onClick={() => handleSwipe(item.id, 'prev')}
                            className={`${styles.navButton} ${styles.prevButton}`}
                            aria-label="Gambar Sebelumnya"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleSwipe(item.id, 'next')}
                            className={`${styles.navButton} ${styles.nextButton}`}
                            aria-label="Gambar Berikutnya"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <div className={styles.imageIndicators}>
                            {item.images.map((_, index) => (
                              <button
                                key={index}
                                className={`${styles.indicator} ${
                                  index === (currentImages[item.id] || 0) ? styles.activeIndicator : ''
                                }`}
                                onClick={() =>
                                  setCurrentImages((prev) => ({
                                    ...prev,
                                    [item.id]: index,
                                  }))
                                }
                                aria-label={`Lihat gambar ${index + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className={styles.placeholderImage}>
                      <img
                        src="/assets/placeholder.jpg"
                        alt="Placeholder"
                        onError={(e) => handleImageError(e)}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.menuContent}>
                  <h3 className={styles.menuItemTitle}>{item.name || 'Nama Tidak Tersedia'}</h3>
                  {renderDescriptionList(item.description)}
                  <div className={styles.menuItemFooter}>
                    <p className={styles.price}>
                      Rp {item.price ? item.price.toLocaleString() : 'Harga Tidak Tersedia'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              Tidak ada menu tersedia untuk kategori ini.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Menu.propTypes = {
  produkRef: PropTypes.object.isRequired,
  menuFilter: PropTypes.string.isRequired,
  setMenuFilter: PropTypes.func.isRequired,
};

export default Menu;