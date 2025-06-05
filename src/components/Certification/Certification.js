import styles from './Certification.module.css';
import SEO from '../common/SEO';

const Certification = () => {
  return (
    <section className={styles.certification} data-aos="fade-up">
      <SEO
        title="Sertifikasi Paramitha Catering - Halal MUI Terpercaya"
        description="Paramitha Catering memiliki sertifikasi halal resmi dari MUI (Majelis Ulama Indonesia). 100% halal, terpercaya, dan berkualitas tinggi untuk semua kebutuhan catering Anda."
        keywords={['sertifikasi halal', 'catering halal', 'MUI', 'halal certified', 'catering terpercaya', 'makanan halal']}
        canonical="/sertifikasi"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Paramitha Catering",
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "name": "Sertifikat Halal MUI",
            "credentialCategory": "Halal Certification",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Majelis Ulama Indonesia"
            }
          }
        }}
      />
      
      {/* Decorative Lines */}
      <div className={styles.decorativeLines}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
        <div className={styles.line4}></div>
        <div className={styles.line5}></div>
        <div className={styles.line6}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header} data-aos="fade-up" data-aos-delay="100">
            <div className={styles.labelWrapper}>
              <span className={styles.label}>SERTIFIKASI</span>
            </div>
            <h1 className={styles.title}>
              Kami <span className={styles.highlight}>Terjamin</span> Halal
            </h1>
            <p className={styles.description}>
              Paramitha Catering telah mendapatkan sertifikasi halal dari Majelis Ulama Indonesia (MUI), 
              memastikan semua hidangan kami memenuhi standar kehalalan tertinggi.
            </p>
          </header>

          <div className={styles.card} data-aos="zoom-in" data-aos-delay="200">
            <div className={styles.cardHeader}>
              <div className={styles.logoContainer}>
                <img 
                  src="/images/mui-logo.png" 
                  alt="Logo MUI - Majelis Ulama Indonesia"
                  className={styles.logo}
                  loading="lazy"
                  width="40"
                  height="40"
                />
              </div>
              <h2 className={styles.cardTitle}>Sertifikat Halal MUI</h2>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.badge}>
                <span className={styles.badgeText}>HALAL</span>
                <span className={styles.badgeSubtext}>CERTIFIED</span>
              </div>
              
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Dikeluarkan oleh:</span>
                  <span className={styles.detailValue}>Majelis Ulama Indonesia</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Status:</span>
                  <span className={styles.detailValue}>Aktif & Berlaku</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.trustBadges}>
                <div className={styles.trustBadge}>
                  <span>✓</span>
                  <span>100% Halal</span>
                </div>
                <div className={styles.trustBadge}>
                  <span>✓</span>
                  <span>Terpercaya</span>
                </div>
                <div className={styles.trustBadge}>
                  <span>✓</span>
                  <span>Berkualitas</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stats} data-aos="fade-up" data-aos-delay="300">
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Halal Certified</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>MUI</div>
              <div className={styles.statLabel}>Approved</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>Years Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certification;