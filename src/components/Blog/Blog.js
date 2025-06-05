// src/components/Blog/Blog.jsx
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';
import blogData from '../../data/blogData';
import SEO from '../common/SEO';

/**
 * Komponen Blog untuk menampilkan daftar artikel.
 */
const Blog = () => {
  return (
    <section className={`${styles.blog} fade-in`} data-aos="fade-up">
      <SEO
        title="Blog Paramitha Catering - Tips dan Inspirasi Acara"
        description="Baca artikel terbaru tentang tips catering, inspirasi acara, dan resep lezat dari Paramitha Catering."
        keywords={['blog catering', 'tips acara', 'inspirasi catering']}
        image="/assets/blog1.webp"
      />
      <div className={styles.blogContainer}>
        <h2>Blog Kami</h2>
        <div className={styles.blogGrid}>
          {blogData.map((post) => (
            <div key={post.id} className={styles.blogCard} data-aos="fade-up">
              <picture>
                <source srcSet={post.image.replace('.jpg', '.webp')} type="image/webp" />
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.blogImage}
                  loading="lazy"
                />
              </picture>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className={styles.readMore}>
                Baca Selengkapnya
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;