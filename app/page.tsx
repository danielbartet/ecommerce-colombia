import TopBar from '@/components/TopBar/TopBar';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Categories from '@/components/Categories/Categories';
import OfertasDelDia from '@/components/OfertasDelDia/OfertasDelDia';
import PopularProducts from '@/components/PopularProducts/PopularProducts';
import TrustBadges from '@/components/TrustBadges/TrustBadges';
import Footer from '@/components/Footer/Footer';
import BottomNav from '@/components/BottomNav/BottomNav';

export default function Page() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <div style={{ background: '#F5F5F5', width: '100%', paddingTop: '16px' }}>
          <Categories />
          <OfertasDelDia />
          <PopularProducts />
          <TrustBadges />
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
