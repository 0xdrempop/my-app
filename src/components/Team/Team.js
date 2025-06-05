import { memo } from 'react';
import styles from './Team.module.css';
import teamData from '../../data/teamData';

const Team = memo(() => {
  return (
    <section className={styles.team}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>
              Tim <span className={styles.highlight}>Profesional</span> Kami
            </h2>
          </div>
          <p className={styles.subtitle}>
            Berpengalaman dalam memberikan layanan catering terbaik untuk setiap acara istimewa Anda
          </p>
        </header>

        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            {teamData.map((member, index) => (
              <article
                key={member.id}
                className={styles.card}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={member.image}
                    alt={member.altText}
                    className={styles.image}
                    loading="lazy"
                    width="240"
                    height="280"
                  />
                </div>
                
                <div className={styles.info}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  <div className={styles.line}></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      
      {/* Accent Lines */}
      <div className={styles.accentLines}>
        <div className={styles.accentLine1}></div>
        <div className={styles.accentLine2}></div>
        <div className={styles.accentLine3}></div>
        <div className={styles.accentLine4}></div>
      </div>
    </section>
  );
});

Team.displayName = 'Team';

export default Team;