import React from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/logo.png';
import muiHalalLogo from '../../assets/mui-halal-logo.png';
import instagramLogo from '../../assets/instagram-logo.png';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const contactInfo = [
    {
      icon: 'fas fa-phone',
      text: '+62 822 3729 9901',
      href: 'tel:+6282237299901',
      ariaLabel: 'Hubungi kami via telepon'
    },
    {
      icon: 'fas fa-envelope',
      text: 'info@paramithacatering.com',
      href: 'mailto:info@paramithacatering.com',
      ariaLabel: 'Kirim email kepada kami'
    },
    {
      icon: 'fas fa-map-marker-alt',
      text: 'Klaten, Jawa Tengah',
      href: 'https://maps.google.com/?q=Klaten,Jawa+Tengah',
      ariaLabel: 'Lihat lokasi kami di Google Maps',
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  ];

  const legalLinks = [
    { href: '/privacy-policy', text: 'Privacy Policy' },
    { href: '/terms-of-service', text: 'Terms of Service' },
    { href: '/social-media-disclaimer', text: 'Social Media Disclaimer' },
    { href: '/policy-principles', text: 'Policy Principles' }
  ];

  const socialLinks = [
    {
      href: 'https://instagram.com/paramithacatering',
      icon: instagramLogo,
      alt: 'Instagram Paramitha Catering',
      ariaLabel: 'Ikuti kami di Instagram'
    }
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContent}>
        {/* Brand Column */}
        <div className={`${styles.column} ${styles.brandColumn}`}>
          <img 
            src={logo} 
            alt="Logo Paramitha Catering - Catering Premium Klaten" 
            className={styles.logo} 
            loading="lazy"
            width="140"
            height="auto"
          />
          <p className={styles.description}>
            Catering premium untuk acara spesial Anda di Klaten, Jawa Tengah. 
            Menyajikan hidangan berkualitas tinggi dengan cita rasa otentik.
          </p>
          <p className={styles.tagline}>
            "Kelezatan yang Tak Terlupakan"
          </p>
        </div>

        {/* Contact Column */}
        <div className={styles.column}>
          <h3 className={styles.subtitle}>Kontak Kami</h3>
          <ul className={styles.links} role="list">
            {contactInfo.map((contact, index) => (
              <li key={index} role="listitem">
                <i className={contact.icon} aria-hidden="true"></i>
                <a 
                  href={contact.href}
                  aria-label={contact.ariaLabel}
                  {...(contact.target && { target: contact.target })}
                  {...(contact.rel && { rel: contact.rel })}
                >
                  {contact.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Certification Column */}
        <div className={styles.column}>
          <h3 className={styles.subtitle}>Ikuti Kami</h3>
          
          <div className={styles.socialSection}>
            <div className={styles.socialIcons} role="list">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className={styles.socialIconLink}
                  role="listitem"
                >
                  <img 
                    src={social.icon} 
                    alt={social.alt}
                    className={styles.socialIcon} 
                    loading="lazy"
                    width="22"
                    height="22"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.certificationSection}>
            <img 
              src={muiHalalLogo} 
              alt="Sertifikasi Halal MUI - Paramitha Catering bersertifikat halal"
              className={styles.halalLogo} 
              loading="lazy"
              width="80"
              height="auto"
            />
          </div>
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true"></div>

      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © {currentYear} Paramitha Catering. Hak cipta dilindungi undang-undang.
        </div>
        
        <nav className={styles.legalLinks} aria-label="Legal navigation">
          {legalLinks.map((link, index) => (
            <a key={index} href={link.href}>
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;