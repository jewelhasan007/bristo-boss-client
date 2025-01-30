import React from "react";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefService from "../ChefService/ChefService";
import Featured from "../../Featured/Featured";
import OurMenu from "../OurMenu/OurMenu";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonial from "./Testimonial/Testimonial";
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bristo Boss || Home</title>
      </Helmet>

      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <ChefService></ChefService>
      <Featured></Featured>
      <OurMenu></OurMenu>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
