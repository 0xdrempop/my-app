// src/components/Blog/BlogPost.jsx
import { useParams, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import styles from './Blog.module.css';
import blogData from '../../data/blogData';
import SEO from '../common/SEO';

/**
 * Komponen untuk menampilkan artikel blog individu.
 */
const BlogPost = () => {
  const { id } = useParams();
  const post = blogData.find((p) => p.id === id);

  if (!post) {
    return <div className={styles.blogContainer}>Artikel tidak ditemukan.</div>;
  }

  const shareUrl = `https://paramithacatering.com/blog/${id}`;
  const shareTitle = encodeURIComponent(post.title);

  // Fungsi untuk melacak klik tombol share
  const trackShare = (platform) => {
    ReactGA.event({
      category: 'Social Share',
      action: `Share to ${platform}`,
      label: post.title,
    });
    if (window.hj) {
      window.hj('event', `share_${platform.toLowerCase()}`);
    }
  };

  return (
    <section className={`${styles.blogPost} fade-in`} data-aos="fade-up">
      <SEO
        title={`${post.title} - Paramitha Catering`}
        description={post.excerpt}
        keywords={post.keywords}
        image={post.image.replace('.jpg', '.webp')}
      />
      <div className={styles.blogContainer}>
        <Link to="/blog" className={styles.backButton}>
          <i className="fas fa-arrow-left"></i> Kembali ke Blog
        </Link>
        <h1>{post.title}</h1>
        <picture>
          <source srcSet={post.image.replace('.jpg', '.webp')} type="image/webp" />
          <img src={post.image} alt={post.title} className={styles.blogPostImage} loading="lazy" />
        </picture>
        <div className={styles.blogContent}>{post.content}</div>
        <div className={styles.shareButtons}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            className={styles.shareButton}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare('Facebook')}
            aria-label="Bagikan ke Facebook"
          >
            <i className="fab fa-facebook-f"></i> Share
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
            className={styles.shareButton}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare('Twitter')}
            aria-label="Bagikan ke Twitter"
          >
            <i className="fab fa-twitter"></i> Tweet
          </a>
          <a
            href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
            className={styles.shareButton}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare('WhatsApp')}
            aria-label="Bagikan ke WhatsApp"
          >
            <i className="fab fa-whatsapp"></i> Share
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;