'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './OfertasDelDia.module.css';

/* ---- Types ---- */
interface FakeProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
  discount?: number;
}

/* ---- Countdown logic ---- */
function getTargetTime(): number {
  const now = new Date();
  const target = new Date(now);
  target.setHours(23, 59, 59, 999);
  return target.getTime();
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function useCountdown() {
  const [time, setTime] = useState({ hh: '05', mm: '23', ss: '47' });

  useEffect(() => {
    let targetTime = getTargetTime();

    function tick() {
      const now = Date.now();
      let diff = Math.max(0, targetTime - now);
      if (diff <= 0) {
        targetTime = getTargetTime() + 86400000;
        diff = targetTime - Date.now();
      }
      const totalSecs = Math.floor(diff / 1000);
      const hh = Math.floor(totalSecs / 3600);
      const mm = Math.floor((totalSecs % 3600) / 60);
      const ss = totalSecs % 60;
      setTime({ hh: pad(hh), mm: pad(mm), ss: pad(ss) });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/* ---- Fallback data ---- */
const FALLBACK_PRODUCTS: FakeProduct[] = [
  { id: 1, title: 'Mochila Resistente al Agua', price: 109.95, image: 'https://fakestoreapi.com/img/81fAn4xQGEL._AC_UX679_.jpg', rating: { rate: 3.9, count: 120 } },
  { id: 2, title: 'Camiseta Casual Slim Fit', price: 22.3, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', rating: { rate: 4.1, count: 259 } },
  { id: 3, title: 'Monitor LED 23.8"', price: 599.99, image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg', rating: { rate: 2.1, count: 430 } },
  { id: 4, title: 'Auriculares Bluetooth', price: 695.0, image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', rating: { rate: 4.0, count: 400 } },
  { id: 5, title: 'Reloj Inteligente GPS', price: 168.0, image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg', rating: { rate: 3.9, count: 70 } },
  { id: 6, title: 'Collar de Oro 18k', price: 695.0, image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg', rating: { rate: 4.6, count: 400 } },
  { id: 7, title: 'Jeans Slim Fit Hombre', price: 55.99, image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', rating: { rate: 2.1, count: 430 } },
  { id: 8, title: 'Camiseta Mujer Cuello V', price: 12.99, image: 'https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg', rating: { rate: 4.7, count: 130 } },
];

function processFallback(data: FakeProduct[]): FakeProduct[] {
  return data.slice(0, 8).map(p => ({ ...p, discount: Math.floor(Math.random() * 56) + 15 }));
}

/* ---- Section ---- */
export default function OfertasDelDia() {
  const { hh, mm, ss } = useCountdown();
  const [products, setProducts] = useState<FakeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://fakestoreapi.com/products?limit=8', {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: FakeProduct[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error('Empty response');
      const withDiscounts = data.map(p => ({
        ...p,
        discount: Math.floor(Math.random() * 56) + 15,
      }));
      setProducts(withDiscounts.slice(0, 8));
    } catch (err) {
      console.error('Fetch failed, using fallback:', err);
      setProducts(processFallback(FALLBACK_PRODUCTS));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        {/* Header row */}
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            <h2 className={styles.title}>&#x26A1; Ofertas del D&#xED;a</h2>
            <span style={{
              fontSize: '13px',
              color: '#6B7280',
              fontFamily: 'monospace',
              marginLeft: '8px',
              fontWeight: 400,
            }}>
              Termina en: {hh}:{mm}:{ss}
            </span>
          </div>
          <a href="#" className={styles.viewAll}>Ir a Ofertas &#x2192;</a>
        </div>

        {/* Horizontal scroll row */}
        <div className={`${styles.scrollRow} scrollbar-hide`} ref={scrollRef}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))
          ) : (
            products.map(product => (
              <div key={product.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.title}
                    width={120}
                    height={120}
                    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" fill="%23f5f5f5"/%3E%3Ctext x="60" y="65" font-family="sans-serif" font-size="11" fill="%23999" text-anchor="middle"%3EProducto%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <p className={styles.productTitle}>{product.title}</p>
                {product.discount && (
                  <p className={styles.originalPrice}>
                    ${(product.price * (1 + product.discount / 100) * 4100).toLocaleString('es-CO')}
                  </p>
                )}
                <p className={styles.price}>
                  ${(product.price * 4100).toLocaleString('es-CO')}
                </p>
                {product.discount && (
                  <span className={styles.discountBadge}>{product.discount}% OFF</span>
                )}
                <p className={styles.freeShipping}>Env&#xED;o gratis</p>
              </div>
            ))
          )}
        </div>

        {/* Desktop scroll arrows */}
        <button
          className={styles.arrowLeft}
          onClick={() => scrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
          aria-label="Desplazar izquierda"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          className={styles.arrowRight}
          onClick={() => scrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
          aria-label="Desplazar derecha"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
