import { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga4';
import styles from './Header.module.css';
import logo from '../../assets/logo.png';

// Memoized navigation item component for better performance
const NavItem = memo(({ label, ref, sectionName, activeSection, scrollKeBagian, toggleMenu = null }) => {
  const isActive = activeSection === sectionName;

  const handleClick = () => {
    console.log(`NavItem clicked: ${sectionName}, Ref:`, ref);
    scrollKeBagian(ref, sectionName);
    if (toggleMenu) {
      console.log('Closing mobile menu');
      toggleMenu();
    }
  };

  return (
    <div className={styles.navItem}>
      <button
        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        role={toggleMenu ? 'menuitem' : undefined}
        type="button"
      >
        {label}
        {toggleMenu && (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </button>
    </div>
  );
});

NavItem.displayName = 'NavItem';

const Header = ({
  isScrolled,
  menuTerbuka,
  toggleMenu,
  scrollKeBagian,
  activeSection,
  tentangRef,
  produkRef,
  galeriRef,
  layananRef,
  dapurRef,
  organisasiRef,
  pesanRef,
}) => {
  // Debug state changes
  useEffect(() => {
    console.log('Menu state changed:', menuTerbuka);
  }, [menuTerbuka]);

  // Track reservation clicks
  const trackReservationClick = useCallback(() => {
    ReactGA.event({
      category: 'Button',
      action: 'Click Reservation',
      label: 'Header Reservation',
    });
    
    // Hotjar tracking if available
    if (window.hj) {
      window.hj('event', 'reservation_click');
    }
  }, []);

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle keyboard navigation for brand logo
  const handleBrandKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  }, [scrollToTop]);

  // Enhanced menu toggle with debugging
  const handleMenuToggle = useCallback(() => {
    console.log('Menu toggle clicked, current state:', menuTerbuka);
    toggleMenu();
    
    // Prevent body scroll when menu is open
    setTimeout(() => {
      if (!menuTerbuka) { // Will be true after toggle
        document.body.style.overflow = 'hidden';
        console.log('Body scroll disabled');
      } else {
        document.body.style.overflow = 'unset';
        console.log('Body scroll enabled');
      }
    }, 0);
  }, [menuTerbuka, toggleMenu]);

  // Handle overlay click to close menu
  const handleOverlayClick = useCallback(() => {
    console.log('Overlay clicked, closing menu');
    toggleMenu();
    document.body.style.overflow = 'unset';
  }, [toggleMenu]);

  // Enhanced close button handler
  const handleCloseMenu = useCallback(() => {
    console.log('Close button clicked');
    toggleMenu();
    document.body.style.overflow = 'unset';
  }, [toggleMenu]);

  // Clean up body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Menu items configuration
  const menuItems = [
    { label: 'Tentang', ref: tentangRef, sectionName: 'tentang' },
    { label: 'Layanan', ref: layananRef, sectionName: 'layanan' },
    { label: 'Menu', ref: produkRef, sectionName: 'produk' },
    { label: 'Galeri', ref: galeriRef, sectionName: 'galeri' },
    { label: 'Dapur', ref: dapurRef, sectionName: 'dapur' },
    { label: 'Organisasi', ref: organisasiRef, sectionName: 'organisasi' },
    { label: 'Pesan', ref: pesanRef, sectionName: 'pesan' },
  ];

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.container}>
        {/* Brand */}
        <div
          className={styles.brand}
          onClick={scrollToTop}
          onKeyDown={handleBrandKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Kembali ke beranda"
        >
          <div className={styles.logoContainer}>
            <img src={logo} alt="Paramitha Catering" className={styles.logo} />
          </div>
          <div className={styles.brandText}>
            <h1 className={styles.brandName}> PT.Paramitha Wijaya Sejahtera</h1>
            <span className={styles.brandSubtitle}> Jasa Katering Klaten No 1</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.navigation} aria-label="Primary">
          {menuItems.map((item) => (
            <NavItem
              key={item.sectionName}
              {...item}
              activeSection={activeSection}
              scrollKeBagian={scrollKeBagian}
            />
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <a
            href="https://wa.me/6282237299901"
            className={styles.ctaButton}
            onClick={trackReservationClick}
            aria-label="Pesan melalui WhatsApp"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg className={styles.whatsappIcon} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.46 17.5 2.01 12.04 2zm4.52 7.89c.07-.3-.02-.62-.23-.84-.2-.22-.5-.33-.82-.33h-.27c-.25 0-.49.1-.67.28-.18.18-.28.42-.28.67v.19c0 .17.06.33.17.46.11.13.26.21.42.23.33.04.65-.08.9-.31.25-.23.37-.56.33-.89zm-4.52 6.16c-1.17 0-2.33-.31-3.36-.90l-.24-.14-2.49.65.67-2.42-.15-.25c-.64-1.05-.98-2.26-.98-3.49 0-3.69 3.01-6.69 6.69-6.69s6.69 3.01 6.69 6.69c0 3.69-3.01 6.7-6.83 6.7z" />
            </svg>
            <span>Pesan Sekarang</span>
          </a>
          <button
            className={`${styles.menuToggle} ${menuTerbuka ? styles.open : ''}`}
            onClick={handleMenuToggle}
            aria-label={`${menuTerbuka ? 'Tutup' : 'Buka'} menu`}
            aria-expanded={menuTerbuka}
            aria-controls="mobile-menu"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <aside
        id="mobile-menu"
        aria-hidden={!menuTerbuka}
        className={`${styles.mobileMenu} ${menuTerbuka ? styles.open : ''}`}
      >
        <div
          className={styles.mobileMenuOverlay}
          onClick={handleOverlayClick}
          tabIndex={-1}
          aria-label="Tutup menu"
        />

        <div className={styles.mobileMenuContent} role="menu" aria-label="Menu navigasi mobile">
          <div className={styles.mobileMenuHeader}>
            <div className={styles.mobileBrand}>
              <img src={logo} alt="Paramitha" className={styles.mobileLogo} />
              <span>Menu Navigasi</span>
            </div>
            <button
              onClick={handleCloseMenu}
              className={styles.closeButton}
              aria-label="Tutup menu"
              type="button"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className={styles.mobileNavigation}>
            {menuItems.map((item) => (
              <NavItem
                key={item.sectionName}
                {...item}
                activeSection={activeSection}
                scrollKeBagian={scrollKeBagian}
                toggleMenu={toggleMenu}
              />
            ))}
          </nav>

          <div className={styles.mobileMenuFooter}>
            <a
              href="https://wa.me/6282237299901"
              className={styles.mobileCtaButton}
              onClick={trackReservationClick}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Hubungi kami lewat WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.46 17.5 2.01 12.04 2z" />
              </svg>
              Hubungi Kami Sekarang
            </a>

            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com/paramithacatering"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Paramitha Catering"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com/paramithacatering"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Paramitha Catering"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/paramithacatering"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Paramitha Catering"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
};

Header.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
  menuTerbuka: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  scrollKeBagian: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  tentangRef: PropTypes.object.isRequired,
  produkRef: PropTypes.object.isRequired,
  galeriRef: PropTypes.object.isRequired,
  layananRef: PropTypes.object.isRequired,
  dapurRef: PropTypes.object.isRequired,
  organisasiRef: PropTypes.object.isRequired,
  pesanRef: PropTypes.object.isRequired,
};

export default Header;