import { Link } from "react-router-dom";
import Cover from "../../../Shared/Cover/Cover";
import MenuItem from "../../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, coverImg }) => {
  return (
    <div className="mb-4 my-5">
      {title && (
        <Cover
          img={coverImg}
          title={title}
          para="Would you like to try a dish?"
        ></Cover>
      )}

      <div className="grid md:grid-cols-2 gap-10 my-5">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center">
       <Link to={`/shop/${title}`}> <button className="btn btn-ghost shadow border-b-2 underline ">ORDER YOUR FAVOURITE FOOD</button></Link>
      </div>
    </div>
  );
};

export default MenuCategory;
