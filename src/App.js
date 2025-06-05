// App.js - Versi Simplified & Clean
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// ========== IMPORT STYLES ==========
import './styles/global.css';
import './styles/animations.css';

// ========== IMPORT COMPONENTS ==========
import SEO from './components/common/SEO';
import Preloader from './components/common/Preloader';
import BackToTop from './components/common/BackToTop';
import CookieConsent from './components/common/CookieConsent';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Menu from './components/Menu/Menu';
import Gallery from './components/Gallery/Gallery';
import Kitchen from './components/Kitchen/Kitchen';
import Certification from './components/Certification/Certification';
import Team from './components/Team/Team';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// ========== LAZY LOAD COMPONENTS ==========
const Blog = lazy(() => import('./components/Blog/Blog'));
const BlogPost = lazy(() => import('./components/Blog/BlogPost'));

const App = () => {
  // ========== STATE MANAGEMENT ==========
  // Loading dan UI states
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [activeSection, setActiveSection] = useState('tentang');

  // Menu states
  const [menuFilter, setMenuFilter] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [currentModalImage, setCurrentModalImage] = useState(0);

  // Gallery states
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [visibleGalleryItems, setVisibleGalleryItems] = useState(6);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  // Kitchen state
  const [currentDapurImage, setCurrentDapurImage] = useState(0);

  // ========== REFS UNTUK SEMUA SECTIONS ==========
  const produkRef = useRef(null);
  const tentangRef = useRef(null);
  const layananRef = useRef(null);
  const galeriRef = useRef(null);
  const dapurRef = useRef(null);
  const organisasiRef = useRef(null);
  const pesanRef = useRef(null);

  // ========== SCROLL HANDLER ==========
  const scrollKeBagian = (ref, sectionName) => {
    console.log(`scrollKeBagian called for: ${sectionName}, Ref:`, ref);
    
    if (ref && ref.current) {
      // Scroll menggunakan ref
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionName);
      setMenuTerbuka(false);
      console.log(`Scrolled to ${sectionName}, Active section set to: ${sectionName}`);
    } else {
      // Fallback scroll menggunakan ID element
      console.error(`Ref for ${sectionName} is invalid, attempting fallback scroll by ID`);
      const element = document.getElementById(sectionName);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionName);
        setMenuTerbuka(false);
        console.log(`Fallback scroll to ${sectionName} successful`);
      } else {
        console.error(`Fallback scroll failed: No element with ID ${sectionName}`);
      }
    }
  };

  // ========== TOGGLE MOBILE MENU ==========
  const toggleMenu = () => {
    console.log('Toggling menu, current state:', menuTerbuka);
    setMenuTerbuka((prev) => !prev);
  };

  // ========== EFFECT HOOKS ==========
  
  // Handle scroll untuk isScrolled state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize AOS untuk animations
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true,
      });
    }
  }, []);

  // Handle preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Log refs untuk verify attachment
  useEffect(() => {
    console.log('Refs status:', {
      produkRef: produkRef.current,
      tentangRef: tentangRef.current,
      layananRef: layananRef.current,
      galeriRef: galeriRef.current,
      dapurRef: dapurRef.current,
      organisasiRef: organisasiRef.current,
      pesanRef: pesanRef.current,
    });
  }, []);

  // IntersectionObserver untuk update activeSection
  useEffect(() => {
    const sections = [
      { ref: tentangRef, name: 'tentang' },
      { ref: layananRef, name: 'layanan' },
      { ref: produkRef, name: 'produk' },
      { ref: galeriRef, name: 'galeri' },
      { ref: dapurRef, name: 'dapur' },
      { ref: organisasiRef, name: 'organisasi' },
      { ref: pesanRef, name: 'pesan' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            console.log('IntersectionObserver: Active section changed to:', entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Threshold untuk deteksi yang lebih baik
    );

    sections.forEach(({ ref, name }) => {
      if (ref.current) {
        ref.current.id = name; // Pastikan sections punya ID
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [tentangRef, layananRef, produkRef, galeriRef, dapurRef, organisasiRef, pesanRef]);

  // ========== MAIN CONTENT COMPONENT ==========
  const MainContent = () => (
    <>
      <SEO
        title="Paramitha Catering - Catering Lezat di Klaten"
        description="Paramitha Catering menyediakan layanan catering berkualitas untuk pernikahan, perusahaan, dan acara keluarga di Klaten dan sekitarnya."
        keywords={['catering Klaten', 'catering pernikahan', 'catering perusahaan', 'menu catering']}
        image="/assets/logo.png"
      />
      <div className="App">
        {/* ========== HEADER ========== */}
        <Header
          isScrolled={isScrolled}
          menuTerbuka={menuTerbuka}
          toggleMenu={toggleMenu}
          scrollKeBagian={scrollKeBagian}
          activeSection={activeSection}
          tentangRef={tentangRef}
          produkRef={produkRef}
          galeriRef={galeriRef}
          layananRef={layananRef}
          dapurRef={dapurRef}
          organisasiRef={organisasiRef}
          pesanRef={pesanRef}
        />
        
        {/* ========== HERO SECTION ========== */}
        <Hero />
        
        {/* ========== MENU SECTION ========== */}
        <section className="section-card striped-border" data-aos="fade-up" ref={produkRef} id="produk">
          <Menu
            menuFilter={menuFilter}
            setMenuFilter={setMenuFilter}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            currentModalImage={currentModalImage}
            setCurrentModalImage={setCurrentModalImage}
          />
        </section>
        
        {/* ========== ABOUT SECTION ========== */}
        <section className="section-card striped-border" data-aos="fade-up" ref={tentangRef} id="tentang">
          <About />
        </section>
        
        {/* ========== SERVICES SECTION ========== */}
        <section className="section-card striped-border" data-aos="fade-up" ref={layananRef} id="layanan">
          <Services />
        </section>
        
        {/* ========== GALLERY SECTION ========== */}
        <section className="section-card striped-border" data-aos="fade-up" ref={galeriRef} id="galeri">
          <Gallery
            galleryFilter={galleryFilter}
            setGalleryFilter={setGalleryFilter}
            visibleGalleryItems={visibleGalleryItems}
            setVisibleGalleryItems={setVisibleGalleryItems}
            selectedGalleryItem={selectedGalleryItem}
            setSelectedGalleryItem={setSelectedGalleryItem}
          />
        </section>
        
        {/* ========== KITCHEN SECTION ========== */}
        <section className="section-card striped-border" data-aos="fade-up" ref={dapurRef} id="dapur">
          <Kitchen
            currentDapurImage={currentDapurImage}
            setCurrentDapurImage={setCurrentDapurImage}
          />
        </section>
        
        {/* ========== CERTIFICATION SECTION ========== */}
        <section className="section-card striped-border" data-aos="fade-up">
          <Certification />
        </section>
        
        {/* ========== TEAM SECTION ========== */}
        <section className="section-card striped-border" data-aos="fade-up" ref={organisasiRef} id="organisasi">
          <Team />
        </section>
        
        {/* ========== CONTACT SECTION ========== */}
        <section className="section-card striped-border" data-aos="fade-up" ref={pesanRef} id="pesan">
          <Contact />
        </section>
        
        {/* ========== FOOTER ========== */}
        <Footer />
      </div>
    </>
  );

  // ========== MAIN RENDER ==========
  return (
    <Router>
      <HelmetProvider>
        {isLoading ? (
          <Preloader />
        ) : (
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
            </Routes>
            <BackToTop />
            <CookieConsent />
          </Suspense>
        )}
      </HelmetProvider>
    </Router>
  );
};

export default App;