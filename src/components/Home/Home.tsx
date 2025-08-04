import HomeReview from "../Review/HomeReview";
import Hero from "./Hero";
import LatestProduct from "./LatestProduct";
import Logo from "./Logo";
import Newsletter from "./Newsletter";
import WhatWeOffer from "./WhatWeOffer";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestProduct />
      <WhatWeOffer />
      <HomeReview />
      <Logo />
      <Newsletter />
    </div>
  );
};

export default Home;
