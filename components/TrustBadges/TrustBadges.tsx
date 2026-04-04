import styles from './TrustBadges.module.css';

const TRUST_ITEMS = [
  { icon: '🛵', title: 'Pago Contra Entrega', subtitle: 'Solo Bogotá' },
  { icon: '📦', title: 'Envío Nacional', subtitle: 'A todo el país' },
  { icon: '🔄', title: 'Garantía de Devolución', subtitle: '30 días' },
  { icon: '🔒', title: 'Pago Seguro', subtitle: 'SSL encriptado' },
];

export default function TrustBadges() {
  return (
    <section className={styles.section} aria-label="Garantías y servicios">
      <div className={styles.strip} role="list">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className={styles.item} role="listitem">
            <span className={styles.icon} aria-hidden="true">{item.icon}</span>
            <div className={styles.text}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.subtitle}>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
