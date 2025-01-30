import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import image from "../../assets/home/banner.jpg";
import dessetImg from "../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../assets/menu/pizza-bg.jpg"
import saladImg from "../../assets/menu/salad-bg.jpg"
import soupImg from "../../assets/menu/soup-bg.jpg"

import CategoryTitle from "../../Shared/CategoryTitle/CategoryTitle";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((menu) => menu.category === "dessert");
  const soup = menu.filter((menu) => menu.category === "soup");
  const salad = menu.filter((menu) => menu.category === "salad");
  const pizza = menu.filter((menu) => menu.category === "pizza");
  const offered = menu.filter((menu) => menu.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Menu</title>
      </Helmet>
      <Cover
        img={image}
        title="our menu"
        para="Would you like to try a dish?"
      ></Cover>
      {/* main cover */}
      <CategoryTitle
        subHeading={"---Don't miss---"}
        heading={"TODAY'S OFFER"}
      ></CategoryTitle>
      {/* offered menu items */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
     <MenuCategory items={dessert} title={"dessert"} coverImg={dessetImg}></MenuCategory>
      {/* pizza menu items */}
     <MenuCategory items={pizza} title={"pizza"} coverImg={pizzaImg}></MenuCategory>
      {/* salad menu items */}
     <MenuCategory items={salad} title={"salad"} coverImg={saladImg}></MenuCategory>
      {/* soup menu items */}
     <MenuCategory items={soup} title={"soup"} coverImg={soupImg}></MenuCategory>
    
    
    </div>
  );
};

export default Menu;
