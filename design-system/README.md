# MULTIOFERTAS.NET — Design System

Sistema de diseño para el e-commerce colombiano MULTIOFERTAS.NET. Basado en **Bento Grid + Glassmorphism** optimizado para mobile-first y conversión en el mercado latinoamericano.

---

## Archivos

| Archivo | Propósito |
|---|---|
| `tokens.css` | Variables CSS (colores, tipografía, espaciado, sombras, radii, z-index) |
| `components.css` | Estilos de componentes reutilizables |

Orden de importación obligatorio:

```html
<link rel="stylesheet" href="design-system/tokens.css">
<link rel="stylesheet" href="design-system/components.css">
```

---

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#FFD600` | CTAs principales, botones acción |
| `--color-secondary` | `#1A73E8` | Links, confianza, info |
| `--color-accent` | `#E53935` | Descuentos, urgencia, precios oferta |
| `--color-bg` | `#F8F9FA` | Fondo de página |
| `--color-surface` | `rgba(255,255,255,0.85)` | Cards glassmorphism |
| `--color-text-primary` | `#1C1C1E` | Texto principal |
| `--color-text-secondary` | `#6B7280` | Texto secundario |

### Decisiones de diseño

- **Amarillo primario**: Familiaridad con MercadoLibre (benchmark del mercado colombiano). Alta visibilidad, asociación cultural con "acción".
- **Azul secundario**: Confianza y credibilidad para un marketplace nuevo.
- **Rojo acento**: Urgencia en descuentos, sin overuse que fatigue al usuario.
- **Fondo `#F8F9FA`**: No blanco puro para reducir fatiga visual en sesiones largas de shopping.

---

## Tipografía

| Token | Familia | Uso |
|---|---|---|
| `--font-heading` | Poppins | Títulos, precios, CTAs |
| `--font-body` | Inter | Cuerpo, descripciones, UI |

**Tamaño mínimo**: `14px` (`--text-sm`). Nunca menor en ningún contexto de producción.

**Tamaño base mobile**: `16px` — evita el zoom automático de iOS en inputs.

---

## Espaciado

Escala de 4px. Tokens `--space-{n}` donde el valor es `n * 0.25rem`:

```
--space-1  = 4px
--space-2  = 8px
--space-3  = 12px
--space-4  = 16px
--space-6  = 24px
--space-8  = 32px
```

---

## Radios de borde

```
--radius-sm   = 6px   (chips, badges)
--radius-md   = 12px  (inputs, botones pequeños)
--radius-lg   = 16px  (cards)
--radius-xl   = 20px  (cards producto)
--radius-2xl  = 24px  (cards hero)
--radius-full = 9999px (botones, avatares, pills)
```

---

## Sombras

Filosofía: sombras multicapa para profundidad realista. Nunca una sola sombra plana.

```css
/* Card estándar glassmorphism */
box-shadow: var(--shadow-glass);

/* CTA primario amarillo */
box-shadow: var(--shadow-primary);

/* Elevación header */
box-shadow: var(--shadow-header);
```

---

## Componentes

### Botones

```html
<!-- CTA principal -->
<button class="btn btn--primary btn--full">Agregar al carrito</button>

<!-- Acción secundaria -->
<button class="btn btn--secondary">Ver más</button>

<!-- Ghost outline -->
<button class="btn btn--ghost">Empezar a vender</button>

<!-- Tamaño pequeño -->
<button class="btn btn--sm btn--primary">Agregar</button>
```

### Cards de producto

```html
<article class="card-product">
  <div class="card-product__image-wrap">
    <span class="badge badge--sale" style="position:absolute;top:8px;left:8px;">-40%</span>
    <img src="..." alt="Producto">
  </div>
  <div class="card-product__body">
    <p class="card-product__name line-clamp-2">Nombre del producto</p>
    <div class="card-product__pricing">
      <span class="card-product__price-original">$150.000</span>
      <span class="card-product__price-sale">$89.900</span>
    </div>
    <div class="card-product__btn">
      <button class="btn btn--primary btn--sm btn--full">Agregar</button>
    </div>
  </div>
</article>
```

### Badges

```html
<span class="badge badge--sale">-40% OFF</span>
<span class="badge badge--new">NUEVO</span>
<span class="badge badge--hot">HOT</span>
<span class="badge badge--free">ENVÍO GRATIS</span>
```

### Barra de búsqueda

```html
<div class="search-bar">
  <input class="search-bar__input" type="search" placeholder="Buscar productos...">
  <button class="search-bar__btn" aria-label="Buscar">
    <!-- icono SVG -->
  </button>
</div>
```

---

## Z-Index layers

| Token | Valor | Uso |
|---|---|---|
| `--z-sticky` | 200 | Header sticky |
| `--z-overlay` | 300 | Menú lateral, overlays |
| `--z-modal` | 400 | Modales |
| `--z-floating` | 600 | WhatsApp FAB, bottom nav |
| `--z-top` | 9999 | Toasts, tooltips urgentes |

---

## Breakpoints

```css
/* Mobile-first. Base: 375px (iPhone SE — device más común en Colombia) */
@media (min-width: 480px) { /* Mobile grande */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop pequeño */ }
@media (min-width: 1280px) { /* Desktop grande */ }
```

---

## Principios UX

1. **Mobile-first absoluto**: El 80%+ del tráfico e-commerce colombiano es mobile.
2. **Touch targets 44px mínimo**: WCAG 2.5.5 + reducción de errores de tap.
3. **Sin hover como funcionalidad**: Estados hover son enhancement, no requeridos.
4. **Thumb-friendly**: CTAs en zona inferior de la pantalla (zona pulgar cómodo).
5. **Performance**: Sin dependencias externas excepto Google Fonts. CSS vanilla.
6. **Familiaridad cultural**: Patrones similares a MercadoLibre reducen la curva de aprendizaje.
