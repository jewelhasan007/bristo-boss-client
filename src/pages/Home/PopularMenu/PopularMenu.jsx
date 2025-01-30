import React, { useEffect, useState } from "react";
import CategoryTitle from "../../../Shared/CategoryTitle/CategoryTitle";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {
  const [menu] = useMenu()
  const popular = menu.filter(menu =>menu.category==="popular")

  return (
    <section className="mb-12">
      <div className="text-center">
        <CategoryTitle
          subHeading={"---Check it out---"}
          heading={"From our menu"}
        ></CategoryTitle>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {
            popular.map(item => <MenuItem
            key={item._id}
            item={item}
            ></MenuItem>)
        }
      </div>
    </section>
  );
};

export default PopularMenu;
