import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <div className={styles.topbar} role="banner" aria-label="Información de servicio">
      <div className={styles.inner}>
        <span className={styles.item}>
          <span aria-hidden="true">📦</span> Envío nacional a todo Colombia
        </span>
        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.item}>
          <span aria-hidden="true">🛵</span> Pago contra entrega en Bogotá
        </span>
        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.item}>
          <span aria-hidden="true">🔒</span> Compra 100% segura
        </span>
      </div>
    </div>
  );
}
