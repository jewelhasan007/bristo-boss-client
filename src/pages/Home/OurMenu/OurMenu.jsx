import CategoryTitle from "../../../Shared/CategoryTitle/CategoryTitle";
import image from "../../../assets/home/featured.jpg";
import "./OurMenu.css";

const OurMenu = () => {
  return (
    <div className="menu-image bg-fixed text-white pt-10">
      <CategoryTitle
        subHeading={"---Check---"}
        heading={"FROM OUR MENU"}
      ></CategoryTitle>

      <div className="md:flex justify-center items-center py-20 px-36 pt-12">
        <div>
          <img src={image} alt="" />
        </div>
        <div className="md: ml-10">
          <p>March 20, 2023</p>
          <p>WHERE CAN I GET SOME?</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn btn-outline">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
