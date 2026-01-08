import React from 'react';
import { AnnouncementBar, Header, Hero, Navbar, PaymentOffers, TopSellingItems } from './components';

const App = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Navbar />
      <Hero />
      <TopSellingItems />
      <PaymentOffers />
    </>
  );
};

export default App;
