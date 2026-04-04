'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PopularProducts.module.css';

interface FakeProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: { rate: number; count: number };
}

function getDiscount(price: number): number {
  if (price < 20) return 45;
  if (price < 50) return 35;
  if (price < 100) return 25;
  return 20;
}

const FALLBACK_PRODUCTS: FakeProduct[] = [
  { id: 1, title: 'Mochila Resistente al Agua', price: 109.95, image: 'https://fakestoreapi.com/img/81fAn4xQGEL._AC_UX679_.jpg', category: 'bags', rating: { rate: 3.9, count: 120 } },
  { id: 2, title: 'Camiseta Casual Slim Fit', price: 22.3, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', category: 'clothing', rating: { rate: 4.1, count: 259 } },
  { id: 3, title: 'Monitor LED 23.8"', price: 599.99, image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg', category: 'electronics', rating: { rate: 2.1, count: 430 } },
  { id: 4, title: 'Auriculares Bluetooth', price: 695.0, image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', category: 'electronics', rating: { rate: 4.0, count: 400 } },
  { id: 5, title: 'Reloj Inteligente GPS', price: 168.0, image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg', category: 'electronics', rating: { rate: 3.9, count: 70 } },
  { id: 6, title: 'Collar de Oro 18k', price: 695.0, image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg', category: 'jewelery', rating: { rate: 4.6, count: 400 } },
  { id: 7, title: 'Jeans Slim Fit Hombre', price: 55.99, image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', category: 'clothing', rating: { rate: 2.1, count: 430 } },
  { id: 8, title: 'Camiseta Mujer Cuello V', price: 12.99, image: 'https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg', category: 'clothing', rating: { rate: 4.7, count: 130 } },
];

function processFallback(data: FakeProduct[]): FakeProduct[] {
  return [...data].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 8);
}

export default function PopularProducts() {
  const [products, setProducts] = useState<FakeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://fakestoreapi.com/products', {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: FakeProduct[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error('Empty response');
      const sorted = [...data].sort((a, b) => b.rating.rate - a.rating.rate);
      setProducts(sorted.slice(0, 8));
    } catch (err) {
      console.error('Fetch failed, using fallback:', err);
      setProducts(processFallback(FALLBACK_PRODUCTS));
      setError(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        {/* Header row */}
        <div className={styles.header}>
          <h2 className={styles.title}>&#x1F525; M&#xE1;s Populares</h2>
          <a href="#" className={styles.viewAll}>Ir a Populares &#x2192;</a>
        </div>

        {error ? (
          <div style={{ textAlign: 'center', padding: '32px' }}>
            <p style={{ marginBottom: '12px', color: '#6B7280' }}>No se pudieron cargar los productos.</p>
            <button onClick={loadProducts} style={{ background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 20px', cursor: 'pointer', fontSize: '14px' }}>
              Reintentar
            </button>
          </div>
        ) : (
          /* Horizontal scroll row */
          <div className={`${styles.scrollRow} scrollbar-hide`} ref={scrollRef}>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.skeletonCard} />
              ))
            ) : (
              products.map(product => {
                const discount = getDiscount(product.price);
                const originalPrice = product.price * (100 / (100 - discount));
                return (
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
                    <p className={styles.originalPrice}>
                      ${Math.round(originalPrice * 4100).toLocaleString('es-CO')}
                    </p>
                    <p className={styles.price}>
                      ${(product.price * 4100).toLocaleString('es-CO')}
                    </p>
                    <span className={styles.discountBadge}>{discount}% OFF</span>
                    <p className={styles.freeShipping}>Env&#xED;o gratis</p>
                    <p className={styles.rating}>&#x2B50; {product.rating.rate}</p>
                  </div>
                );
              })
            )}
          </div>
        )}

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
