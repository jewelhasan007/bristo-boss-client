import CategoryTitle from "../../Shared/CategoryTitle/CategoryTitle";
import image1 from "../../assets/home/slide1.jpg";
import image2 from "../../assets/home/slide2.jpg";
import image3 from "../../assets/home/slide3.jpg";
import image4 from "../../assets/home/slide4.jpg";
import image5 from "../../assets/home/slide5.jpg";

import Cart from "../Home/Card/Cart";
const Featured = () => {
  return (
    <div>
      <CategoryTitle
        subHeading={"---Should Try---"}
        heading={"CHEF RECOMMENDS"}
      ></CategoryTitle>
      <div className="grid grid-cols-3">
      <Cart image={image1}></Cart>
      <Cart image={image2}></Cart>
      <Cart image={image3}></Cart>
      <Cart image={image4}></Cart>
      <Cart image={image5}></Cart>
      </div>
     
    </div>
  );
};

export default Featured;
