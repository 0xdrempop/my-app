import { useEffect, useRef, useState, useMemo } from 'react';
import styles from './About.module.css';

// Import images - replace with your actual paths
import image1 from '../../assets/about-image1.jpg';
import image2 from '../../assets/about-image2.jpg';
import image3 from '../../assets/about-image3.jpg';
import image4 from '../../assets/about-image4.jpg';

const About = ({ tentangRef }) => {
  const [activeContent, setActiveContent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  // Memoized content data for better performance
  const contentData = useMemo(() => [
    {
      image: { src: image1, alt: 'Kuliner Premium Eksklusif' },
      title: 'Kuliner Premium',
      subtitle: 'Cita Rasa Autentik',
      description: 'Menyajikan Cita Rasa Autentik Makanan Indonesia dengan Bahan-Bahan Segar Terpilih, Dipadukan Teknik Memasak Inovatif untuk Menciptakan Pengalaman Kuliner yang Menggugah Selera dan Membekas di Hati Setiap Tamu dalam Setiap Kesempatan Istimewa',
      stats: [
        { number: '500+', label: 'Acara Sukses', icon: '🎉' },
        { number: '50+', label: 'Menu Pilihan', icon: '🍽️' },
        { number: '100%', label: 'Kepuasan Klien', icon: '⭐' },
      ]
    },
    {
      image: { src: image2, alt: 'Event Mewah & Elegan' },
      title: 'Event Mewah',
      subtitle: 'Pelayanan Berkelas',
      description: 'Setiap momen acara Anda dirancang dengan perhatian cermat terhadap setiap detail, menggabungkan sentuhan kreatif dan keanggunan untuk menciptakan pengalaman yang luar biasa, memastikan kenangan indah yang tak terlupakan bagi Anda dan para tamu undangan, yang akan terus dikenang dengan kehangatan dan kebahagiaan sepanjang masa',
      stats: [
        { number: '200+', label: 'Pernikahan', icon: '💎' },
        { number: '30+', label: 'Dekorasi Tema', icon: '🎨' },
        { number: '95%', label: 'Rekomendasi', icon: '💯' },
      ]
    },
    {
      image: { src: image3, alt: 'Bahan Segar Berkualitas' },
      title: 'Bahan Segar',
      subtitle: 'Kualitas Terjamin',
      description: 'Dedikasi kami terhadap keunggulan kuliner berawal dari seleksi ketat bahan-bahan segar berkualitas tinggi dari mitra petani dan pemasok terpercaya, dipadukan dengan keahlian kuliner yang menghormati tradisi Indonesia, untuk menghadirkan cita rasa autentik yang memanjakan lidah dan menciptakan pengalaman gastronomi yang tak tertandingi di setiap sajian',
      stats: [
        { number: '100+', label: 'Mitra Supplier', icon: '🌾' },
        { number: '24/7', label: 'Kontrol Kualitas', icon: '🥬' },
        { number: '100%', label: 'Jaminan Segar', icon: '✅' },
      ]
    },
    {
      image: { src: image4, alt: 'Pengalaman Kuliner Premium' },
      title: 'Pengalaman Premium',
      subtitle: 'Layanan Terbaik',
      description: 'Lebih dari sekadar catering, kami menghadirkan pengalaman kuliner premium dengan hidangan istimewa yang memanjakan selera, dirancang untuk membuat setiap acara Anda berkesan dan tak terlupakan bagi semua tamu',
      stats: [
        { number: '300+', label: 'Event Korporat', icon: '🏢' },
        { number: '40+', label: 'Klien Setia', icon: '🤝' },
        { number: '98%', label: 'Rating Sempurna', icon: '🌟' },
      ]
    }
  ], []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add(styles.fadeIn);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-slide content
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContent((prev) => (prev + 1) % contentData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [contentData.length]);

  const handleContentChange = (index) => {
    setActiveContent(index);
  };

  return (
    <section ref={tentangRef} className={styles.about}>
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <h1>Paramitha Catering - Premium Catering Services Klaten</h1>
        <meta name="description" content="Layanan catering premium terbaik di Klaten dengan menu berkualitas tinggi dan pelayanan profesional untuk pernikahan, event korporat, dan acara spesial." />
        <meta name="keywords" content="catering Klaten, catering premium, wedding catering, event organizer, kuliner Indonesia" />
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeLines}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>

      <div className={styles.decorativeShapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.badge}>TENTANG KAMI</div>
          <h2 className={styles.title}>PT Paramitha Wijaya Sejahtera</h2>
          <p className={styles.subtitle}>Menghadirkan Kelezatan yang Menggugah Selera dan Menciptakan Kenangan Tak Terlupakan dalam Setiap Momen Spesial Acara Anda</p>
        </header>

        {/* Main Content */}
        <div className={styles.contentGrid} ref={contentRef}>
          {/* Content Section */}
          <div className={styles.contentCard}>
            <h3 className={styles.contentTitle}>
              {contentData[activeContent].title}
            </h3>
            <p className={styles.contentSubtitle}>
              {contentData[activeContent].subtitle}
            </p>
            
            <p className={styles.description}>
              {contentData[activeContent].description}
            </p>
            
            <div className={styles.statsGrid}>
              {contentData[activeContent].stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statIcon} aria-hidden="true">
                    {stat.icon}
                  </div>
                  <div className={styles.statContent}>
                    <span className={styles.statNumber}>{stat.number}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className={styles.imageSection}>
            <img
              src={contentData[activeContent].image.src}
              alt={contentData[activeContent].image.alt}
              className={styles.mainImage}
              loading="lazy"
              key={activeContent} // Force re-render for smooth transition
            />
            
            {/* Thumbnails */}
            <div className={styles.thumbnailGrid}>
              {contentData.map((content, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${
                    activeContent === index ? styles.activeThumbnail : ''
                  }`}
                  onClick={() => handleContentChange(index)}
                  aria-label={`Tampilkan ${content.title}`}
                >
                  <img
                    src={content.image.src}
                    alt={content.image.alt}
                    className={styles.thumbnailImage}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className={styles.progressDots}>
          {contentData.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                activeContent === index ? styles.activeDot : ''
              }`}
              onClick={() => handleContentChange(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;