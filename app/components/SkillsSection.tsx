import { skillCategories } from '@/data/skills'
import styles from './SkillsSection.module.css'

export default function SkillsSection() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Expertise</span>
          <h2 className={styles.heading}>Skills &amp; Technologies</h2>
          <p className={styles.sub}>
            A decade-plus of hands-on experience across the testing and quality engineering ecosystem.
          </p>
        </div>
        <div className={styles.grid}>
          {skillCategories.map((cat) => (
            <div key={cat.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <div className={styles.tags}>
                {cat.skills.map((skill) => (
                  <span key={skill.name} className={styles.tag}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
