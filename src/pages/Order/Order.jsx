import { useState } from "react";
import Cover from "../../Shared/Cover/Cover";
import orderImg from "../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../hooks/useMenu";
import FoodCard from "../../Shared/FoodCard/FoodCard";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";

const Order = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinkds"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();

  const dessert = menu.filter((menu) => menu.category === "dessert");
  const soup = menu.filter((menu) => menu.category === "soup");
  const salad = menu.filter((menu) => menu.category === "salad");
  const pizza = menu.filter((menu) => menu.category === "pizza");
  const drinks = menu.filter((menu) => menu.category === "drinks");
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };


  return (
    <div>
      <Helmet>
        <title> Order</title>
      </Helmet>

      <Cover img={orderImg} title={"ordered food"}></Cover>
      <div className="m-4 text-center.;'/">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>SALAD</Tab>
            <Tab> PIZZA</Tab>
            <Tab> SOUP</Tab>
            <Tab>DESSERTS</Tab>
            <Tab> DRINKS</Tab>
          </TabList>
          <TabPanel>
            <Swiper
              pagination={pagination}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide className="mb-3">
                <div className="grid md:grid-cols-3 gap-10 ">
                  {salad.splice(0,3).map((item) => (
                    <FoodCard items={item}></FoodCard>
                  ))}
                </div>
              </SwiperSlide>
              <SwiperSlide className="mb-3">
                <div className="grid md:grid-cols-3 gap-10 ">
                  {salad.splice(0,salad.length).map((item) => (
                    <FoodCard items={item}></FoodCard>
                  ))}
                </div>
              </SwiperSlide>
            </Swiper >
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-3 gap-10">
              {pizza.map((item) => (
                <FoodCard items={item}></FoodCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-3 gap-10">
              {soup.map((item) => (
                <FoodCard items={item}></FoodCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-3 gap-10">
              {dessert.map((item) => (
                <FoodCard items={item}></FoodCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-3 gap-10">
              {drinks.map((item) => (
                <FoodCard items={item}></FoodCard>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <div></div>
    </div>
  );
};

export default Order;
