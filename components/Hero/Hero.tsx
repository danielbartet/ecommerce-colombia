'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Hero.module.css';

const SLIDES = [
  {
    badge: 'Hoy únicamente',
    title: 'Ofertas del Día\nHasta 70% OFF',
    subtitle: 'Los mejores precios en electrónica, ropa y más',
    ctaText: 'Ver Ofertas ⚡',
    ctaHref: 'https://multiofertas.net/buscar?cat=ofertas',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=520&h=400&fit=crop&auto=format&q=80',
    imageAlt: 'Bolsas de compras coloridas con ofertas',
  },
  {
    badge: 'Logística nacional',
    title: 'Envío a Todo\nColombia 📦',
    subtitle: 'Llegamos a todos los departamentos del país con seguimiento en tiempo real',
    ctaText: 'Conocer más',
    ctaHref: 'https://multiofertas.net/envios',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=520&h=400&fit=crop&auto=format&q=80',
    imageAlt: 'Caja de envío con logotipo de entrega',
  },
  {
    badge: 'Solo Bogotá',
    title: 'Pago Contra\nEntrega 🛵',
    subtitle: 'Recibe tu pedido en Bogotá y paga cuando llegue. Sin riesgos.',
    ctaText: 'Comprar ahora',
    ctaHref: 'https://multiofertas.net/buscar',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=520&h=400&fit=crop&auto=format&q=80',
    imageAlt: 'Compra segura en línea con tarjeta',
  },
];

const AUTO_INTERVAL = 4000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const total = SLIDES.length;

  const goTo = useCallback((index: number) => {
    setCurrent(((index % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTO_INTERVAL);
  }, [total]);

  const stopAuto = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  useEffect(() => {
    const handler = () => {
      document.hidden ? stopAuto() : startAuto();
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [startAuto, stopAuto]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    stopAuto();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const diff = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : goTo(current - 1);
    }
    isDraggingRef.current = false;
    startAuto();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { goTo(current - 1); stopAuto(); startAuto(); }
    if (e.key === 'ArrowRight') { next(); stopAuto(); startAuto(); }
  };

  return (
    <section className={styles.hero} aria-label="Ofertas destacadas">
      <div
        className={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className={styles.slide}
              role="group"
              aria-label={`Slide ${i + 1} de ${total}`}
              aria-hidden={i !== current}
            >
              {/* Background image */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className={styles.slideBg}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Dark overlay for text readability */}
              <div className={styles.slideOverlay} />
              {/* Content */}
              <div className={styles.slideContent}>
                <span className={styles.badge}>{slide.badge}</span>
                <h1 className={styles.title}>
                  {slide.title.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < slide.title.split('\n').length - 1 && <br />}</span>
                  ))}
                </h1>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <a href={slide.ctaHref} className={styles.cta}>
                  {slide.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Indicadores de slide">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => {
                goTo(i);
                stopAuto();
                startAuto();
              }}
            />
          ))}
        </div>
      </div>

      {/* Dissolve fade into page background */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '112px',
          background: 'linear-gradient(to bottom, transparent, #F0FAF0)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </section>
  );
}
