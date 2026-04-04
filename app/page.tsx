import TopBar from '@/components/TopBar/TopBar';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Categories from '@/components/Categories/Categories';
import OfertasDelDia from '@/components/OfertasDelDia/OfertasDelDia';
import PopularProducts from '@/components/PopularProducts/PopularProducts';
import TrustBadges from '@/components/TrustBadges/TrustBadges';
import Footer from '@/components/Footer/Footer';
import WhatsAppFab from '@/components/WhatsAppFab/WhatsAppFab';
import BottomNav from '@/components/BottomNav/BottomNav';

export default function Page() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <div style={{ background: '#F0FAF0', width: '100%' }}>
          <Categories />
          <OfertasDelDia />
          <PopularProducts />
          <TrustBadges />
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
      <BottomNav />
    </>
  );
}
