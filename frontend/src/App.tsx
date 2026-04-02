import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnnouncementBar, Header, Hero, Navbar, PaymentOffers, TopSellingItems, ShopByCategories, Footer, SingleProduct, Cart, Checkout, Auth, AdminLogin } from './components';
import { AdminLayout, Dashboard, ProductsList, AddProduct, Categories, HeroSection, TopSelling } from './components/admin.index';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

  return (
    <>
      <Hero />
      <TopSellingItems />
      <PaymentOffers />
      <ShopByCategories />
    </>
  );
};

// --- PUBLIC LAYOUT ---
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/product/:id" element={<PublicLayout><SingleProduct /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
        <Route path="/auth" element={<PublicLayout><Auth /></PublicLayout>} />
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="/admin/hero" element={<HeroSection />} />
          <Route path="/admin/top-selling" element={<TopSelling />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;