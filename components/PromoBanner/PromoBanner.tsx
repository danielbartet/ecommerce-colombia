import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <div className="container">
      <div className={styles.banner} role="complementary" aria-label="Vende en MULTIOFERTAS.NET">
        <span className={styles.eyebrow}>Para vendedores</span>
        <h2 className={styles.title}>
          Vende en<br />MULTIOFERTAS.NET
        </h2>
        <p className={styles.desc}>
          Llega a miles de compradores en Colombia. Publicación gratis, pago seguro y soporte dedicado.
        </p>
        <a href="https://multiofertas.net/vender" className="btn btn--primary btn--lg">
          Empezar a Vender 🚀
        </a>
      </div>
    </div>
  );
}
