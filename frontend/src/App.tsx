import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnnouncementBar, Header, Hero, Navbar, PaymentOffers, TopSellingItems, ShopByCategories, Footer, SingleProduct } from './components';
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

const App = () => {
  return (
    <Router>
      <AnnouncementBar />
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;