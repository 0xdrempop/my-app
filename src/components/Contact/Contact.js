import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = ({ pesanRef }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // SEO and analytics tracking
  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'contact',
        event_label: 'whatsapp_button'
      });
    }
  };

  const trackMapClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'map_click', {
        event_category: 'contact',
        event_label: 'google_maps'
      });
    }
  };

  const trackPhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_click', {
        event_category: 'contact',
        event_label: 'phone_button'
      });
    }
  };

  // Optimized map loading for mobile performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 300); // Faster loading for mobile
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={pesanRef} 
      className={styles.contactSection} 
      id="contact"
      itemScope 
      itemType="https://schema.org/LocalBusiness"
    >
      {/* Decorative accent lines */}
      <div className={styles.decorativeLines}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
        <div className={styles.line4}></div>
      </div>

      <div className={styles.container}>
        {/* Hero Section - No gap */}
        <div className={styles.heroSection}>
          <h1 className={styles.mainTitle}>Mari Berkolaborasi</h1>
          <p className={styles.heroSubtitle}>
            Wujudkan acara impian Anda bersama Paramitha Catering
          </p>
          <div className={styles.heroAccent}>
            <div className={styles.accentDot}></div>
          </div>
        </div>
        
        {/* Content Grid - No gap */}
        <div className={styles.contentGrid}>
          {/* Contact Cards */}
          <div className={styles.contactCards}>
            {/* WhatsApp Card */}
            <div className={styles.contactCard} itemScope itemType="https://schema.org/ContactPoint">
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <MessageCircle className={styles.cardIcon} />
                </div>
                <div className={styles.cardTitle}>
                  <h3>WhatsApp</h3>
                  <span className={styles.cardSubtitle}>Respons Instan</span>
                </div>
              </div>
              
              <a
                href="https://wa.me/6282237299901"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
                onClick={trackWhatsAppClick}
                aria-label="Chat WhatsApp dengan Paramitha Catering"
                itemProp="url"
              >
                <MessageCircle size={18} />
                <span>Chat Sekarang</span>
                <div className={styles.buttonShine}></div>
              </a>
              
              <p className={styles.cardDescription}>
                Konsultasi gratis untuk menu dan paket catering
              </p>
            </div>

            {/* Location Card */}
            <div className={styles.contactCard} itemScope itemType="https://schema.org/Place">
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <MapPin className={styles.cardIcon} />
                </div>
                <div className={styles.cardTitle}>
                  <h3>Lokasi Kami</h3>
                  <span className={styles.cardSubtitle} itemProp="address">Banjarejo, Klaten</span>
                </div>
              </div>
              
              <div className={styles.locationDetails}>
                <div className={styles.locationItem}>
                  <Clock size={16} />
                  <span itemProp="openingHours">Senin - Minggu: 08.00 - 17.00 WIB</span>
                </div>
                <div className={styles.locationItem}>
                  <Phone size={16} />
                  <span itemProp="telephone">+62 822-3729-9901</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Google Maps - No gap */}
          <div className={styles.mapSection}>
            <div className={styles.mapHeader}>
              <h3>Temukan Kami</h3>
              <p>Kunjungi langsung dapur kami di Klaten</p>
            </div>
            
            <div className={styles.mapContainer}>
              {!isMapLoaded ? (
                <div className={styles.mapLoader}>
                  <div className={styles.loaderSpinner}></div>
                  <p>Memuat peta...</p>
                </div>
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.5234567890123!2d110.6062!3d-7.7062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDInMjIuMyJTIDExMMKwMzYnMjIuMyJF!5e0!3m2!1sen!2sid!4v1623456789012!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Paramitha Catering Banjarejo Klaten"
                  aria-label="Peta lokasi Paramitha Catering"
                ></iframe>
              )}
              
              <a
                href="https://maps.app.goo.gl/8QDQPVZrgC84C39W7"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapButton}
                onClick={trackMapClick}
                aria-label="Buka lokasi di Google Maps"
              >
                <Navigation size={16} />
                <span>Buka di Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action - No gap */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Siap Memesan?</h2>
            <p>Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik</p>
            <div className={styles.ctaButtons}>
              <a
                href="https://wa.me/6282237299901"
                className={styles.primaryCta}
                onClick={trackWhatsAppClick}
                aria-label="WhatsApp Paramitha Catering"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Sekarang</span>
              </a>
              <a
                href="tel:+6282237299901"
                className={styles.secondaryCta}
                onClick={trackPhoneClick}
                aria-label="Telepon Paramitha Catering"
              >
                <Phone size={18} />
                <span>Telepon Langsung</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Paramitha Catering",
          "description": "Layanan catering terbaik di Klaten untuk berbagai acara",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Banjarejo",
            "addressRegion": "Klaten",
            "addressCountry": "ID"
          },
          "telephone": "+6282237299901",
          "url": "https://wa.me/6282237299901",
          "openingHours": "Mo-Su 08:00-17:00",
          "priceRange": "$$"
        })}
      </script>
    </section>
  );
};

export default Contact;