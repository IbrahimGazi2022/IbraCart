import React from 'react';
import { AnnouncementBar, Header, Hero, Navbar, PaymentOffers, TopSellingItems, ShopByCategories } from './components';

const App = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Navbar />
      <Hero />
      <TopSellingItems />
      <PaymentOffers />
      <ShopByCategories />
    </>
  );
};

export default App;
