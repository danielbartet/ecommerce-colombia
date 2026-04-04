import type { Metadata, Viewport } from 'next';
import { Rubik, Nunito_Sans } from 'next/font/google';
import './globals.css';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#22A722',
};

export const metadata: Metadata = {
  title: 'MULTIOFERTAS.NET — Tu Marketplace de Confianza en Colombia',
  description:
    'MULTIOFERTAS.NET — Tu marketplace de confianza en Colombia. Ofertas del día, envío nacional y pago contra entrega en Bogotá.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={`${rubik.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
