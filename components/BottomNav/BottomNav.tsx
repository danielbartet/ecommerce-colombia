import styles from './BottomNav.module.css';

export default function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <ul className={styles.list} role="list">
        <li>
          <a href="https://multiofertas.net" className={`${styles.item} ${styles.itemActive}`} aria-current="page">
            <span className={styles.icon} aria-hidden="true">🏠</span>
            <span className={styles.label}>Inicio</span>
          </a>
        </li>
        <li>
          <a href="https://multiofertas.net/buscar" className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <span className={styles.label}>Buscar</span>
          </a>
        </li>
        <li>
          <a href="https://multiofertas.net/buscar?cat=ofertas" className={styles.item}>
            <span className={styles.icon} aria-hidden="true">⚡</span>
            <span className={styles.label}>Ofertas</span>
          </a>
        </li>
        <li>
          <a href="https://multiofertas.net/carrito" className={styles.item}>
            <span className={styles.iconRelative} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="badge--counter" id="bottomCartCount" style={{ fontSize: 11, minWidth: 16, height: 16 }}>0</span>
            </span>
            <span className={styles.label}>Carrito</span>
          </a>
        </li>
        <li>
          <a href="https://multiofertas.net/cuenta" className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className={styles.label}>Cuenta</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
