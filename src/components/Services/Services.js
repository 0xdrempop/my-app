import React from 'react';
import styles from './Services.module.css';
import SEO from '../common/SEO';

/**
 * Komponen Services - Optimized untuk performa dan SEO mobile
 * Fitur:
 * - Font Nunito untuk konsistensi
 * - Render cepat dengan optimasi lazy loading
 * - SEO mobile-friendly
 * - Layout responsif tanpa gap
 */
const Services = ({ layananRef }) => {
  // Data layanan untuk memudahkan maintenance
  const servicesData = [
    {
      title: "💒 Catering Pernikahan",
      description: "Menyediakan hidangan istimewa untuk hari spesial Anda dengan menu yang dapat disesuaikan dan presentasi yang elegan.",
      delay: "100",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format"
    },
    {
      title: "🏢 Catering Perusahaan",
      description: "Layanan catering profesional untuk acara perusahaan, seminar, dan rapat dengan menu beragam dan tepat waktu.",
      delay: "200",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format"
    },
    {
      title: "👨‍👩‍👧‍👦 Catering Keluarga",
      description: "Paket catering untuk acara keluarga seperti ulang tahun, arisan, dan syukuran dengan cita rasa rumahan yang lezat.",
      delay: "300",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop&auto=format"
    }
  ];

  return (
    <section ref={layananRef} className={styles.services} data-aos="fade-up">
      {/* SEO Component untuk optimasi mobile */}
      <SEO
        title="Layanan Paramitha Catering - Catering Klaten Terpercaya"
        description="Layanan catering terbaik di Klaten untuk pernikahan, acara perusahaan, dan keluarga. Menu lezat, pelayanan profesional, harga terjangkau."
        keywords={['layanan catering klaten', 'catering pernikahan klaten', 'catering perusahaan klaten', 'catering keluarga klaten', 'paramitha catering']}
        canonical="/layanan"
        openGraph={{
          title: "Layanan Paramitha Catering - Catering Klaten Terpercaya",
          description: "Layanan catering terbaik di Klaten untuk pernikahan, acara perusahaan, dan keluarga.",
          type: "website",
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=630&fit=crop&auto=format"
        }}
      />
      
      {/* Container utama dengan padding responsif */}
      <div className={styles.servicesContainer}>
        {/* Header section dengan label dan title */}
        <div className={styles.servicesHeader}>
          <span className={styles.servicesLabel}>LAYANAN KAMI</span>
          <h2 className={styles.servicesTitle}>Solusi Catering untuk Setiap Acara</h2>
          <p className={styles.servicesSubtitle}>
            Dipercaya untuk melayani berbagai acara dengan kualitas terbaik dan cita rasa yang autentik
          </p>
        </div>
        
        {/* Grid container untuk service items */}
        <div className={styles.servicesItems}>
          {servicesData.map((service, index) => (
            <div 
              key={index}
              className={styles.serviceItem} 
              data-aos="fade-up" 
              data-aos-delay={service.delay}
            >
              {/* Service image dengan lazy loading */}
              <div className={styles.serviceImage}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Service title */}
              <h3>{service.title}</h3>
              
              {/* Service description */}
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;