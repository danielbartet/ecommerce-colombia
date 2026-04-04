'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Store } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleSearch = useCallback(() => {
    const q = searchQuery.trim();
    if (q) {
      window.location.href = `https://multiofertas.net/buscar?q=${encodeURIComponent(q)}`;
    }
  }, [searchQuery]);

  // ESC key closes menu
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen, closeMenu]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={closeMenu}
        role="presentation"
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <nav
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Menú principal"
        aria-hidden={!menuOpen}
        id="mobileMenu"
      >
        <div className={styles.menuHeader}>
          <span className={styles.menuTitle}>⚡ MULTIOFERTAS</span>
          <button
            className={styles.menuClose}
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={styles.menuNav}>
          <a href="https://multiofertas.net" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>🏠</span> Inicio
          </a>
          <a href="https://multiofertas.net/buscar?cat=ofertas" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>⚡</span> Ofertas del Día
          </a>
          <a href="https://multiofertas.net/buscar?cat=celulares" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>📱</span> Celulares
          </a>
          <a href="https://multiofertas.net/buscar?cat=ropa" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>👗</span> Ropa y Moda
          </a>
          <a href="https://multiofertas.net/buscar?cat=hogar" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>🏠</span> Hogar
          </a>
          <a href="https://multiofertas.net/buscar?cat=computadores" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>💻</span> Computadores
          </a>
          <a href="https://multiofertas.net/buscar?cat=gaming" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>🎮</span> Gaming
          </a>
          <div className="divider" />
          <a href="https://multiofertas.net/vender" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>🚀</span> Vende con nosotros
          </a>
          <a href="https://multiofertas.net/contacto" className={styles.menuItem}>
            <span className={styles.menuItemIcon}>💬</span> Contacto / PQR
          </a>
        </div>
      </nav>

      {/* Sticky Navbar */}
      <header className={styles.header} role="banner">
        <div className={styles.inner}>
          {/* Left: Hamburger + Logo */}
          <div className={styles.left}>
            <button
              className={styles.actionBtn}
              onClick={openMenu}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>

            <Link href="https://multiofertas.net" className={styles.logo} aria-label="MULTIOFERTAS.NET — Inicio">
              <span className={styles.logoIcon} aria-hidden="true">⚡</span>
              <span className={styles.logoText}>
                MULTI<span className={styles.logoAccent}>OFERTAS</span>
              </span>
            </Link>
          </div>

          {/* Center: Search */}
          <div className={styles.searchWrap} role="search">
            <label htmlFor="headerSearch" className="sr-only">Buscar productos</label>
            <input
              className={styles.searchInput}
              id="headerSearch"
              type="search"
              placeholder="Buscar productos, marcas y más..."
              autoComplete="off"
              spellCheck={false}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
            <button
              className={styles.searchBtn}
              type="button"
              aria-label="Buscar"
              onClick={handleSearch}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* Right: Account + Cart */}
          <div className={styles.right}>
            <a
              href="https://multiofertas.net/cuenta"
              className={styles.actionBtn}
              aria-label="Mi cuenta"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className={styles.actionLabel}>Mi cuenta</span>
            </a>

            <button
              className={styles.actionBtn}
              aria-label="Tienda"
            >
              <Store width={22} height={22} strokeWidth={2} />
              <span className={styles.actionLabel}>Tienda</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
