import { Smartphone, Shirt, Home, Monitor, Gamepad2, Sparkles, Baby, Wrench, PawPrint, Zap } from 'lucide-react';
import styles from './Categories.module.css';

const CATEGORIES = [
  { href: 'https://multiofertas.net/buscar?cat=celulares', Icon: Smartphone, label: 'Celulares', circleClass: styles.catCelulares },
  { href: 'https://multiofertas.net/buscar?cat=ropa', Icon: Shirt, label: 'Ropa', circleClass: styles.catRopa },
  { href: 'https://multiofertas.net/buscar?cat=hogar', Icon: Home, label: 'Hogar', circleClass: styles.catHogar },
  { href: 'https://multiofertas.net/buscar?cat=computadores', Icon: Monitor, label: 'Computadores', circleClass: styles.catComputadores },
  { href: 'https://multiofertas.net/buscar?cat=gaming', Icon: Gamepad2, label: 'Gaming', circleClass: styles.catGaming },
  { href: 'https://multiofertas.net/buscar?cat=belleza', Icon: Sparkles, label: 'Belleza', circleClass: styles.catBelleza },
  { href: 'https://multiofertas.net/buscar?cat=juguetes', Icon: Baby, label: 'Juguetes', circleClass: styles.catJuguetes },
  { href: 'https://multiofertas.net/buscar?cat=herramientas', Icon: Wrench, label: 'Herramientas', circleClass: styles.catHerramientas },
  { href: 'https://multiofertas.net/buscar?cat=mascotas', Icon: PawPrint, label: 'Mascotas', circleClass: styles.catMascotas },
  { href: 'https://multiofertas.net/buscar?cat=ofertas', Icon: Zap, label: 'Ofertas', circleClass: styles.catOfertas },
];

export default function Categories() {
  return (
    <section className={styles.section} aria-label="Categorías">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Categorías</h2>
          <a href="https://multiofertas.net/buscar" className={styles.sectionLink} aria-label="Ver todas las categorías">
            Ver todos →
          </a>
        </div>

        <div className={styles.grid} role="list" aria-label="Navegar por categoría">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.label}
              href={cat.href}
              className={styles.item}
              role="listitem"
            >
              <div className={`${styles.circle} ${cat.circleClass}`} aria-hidden="true">
                <cat.Icon size={28} strokeWidth={1.75} color="white" />
              </div>
              <span className={styles.label}>{cat.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
