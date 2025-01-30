import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/Navbar/NavBar";
import PopularMenu from "../pages/Home/PopularMenu/PopularMenu";

const Main = () => {
  const location = useLocation();
  console.log(location);
  const noNavbarFooter = location.pathname.includes("login") || location.pathname.includes("signup")  ;
  return (
    <div>
      {noNavbarFooter || <NavBar></NavBar>}
      <Outlet></Outlet>
      {noNavbarFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
