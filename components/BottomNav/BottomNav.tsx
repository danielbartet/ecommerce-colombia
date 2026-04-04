import { Store } from 'lucide-react';
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
          <a href="https://multiofertas.net/tienda" className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              <Store width={22} height={22} strokeWidth={2} />
            </span>
            <span className={styles.label}>Tienda</span>
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
