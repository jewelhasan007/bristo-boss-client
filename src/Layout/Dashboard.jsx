import { FaAd, FaBook, FaHome, FaList, FaSearch, FaShoppingBag, FaShoppingCart, FaUtensils, FaUtensilSpoon } from "react-icons/fa";
import { FaTowerObservation } from "react-icons/fa6";
import { MdEmail, MdPreview } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { IoMdMenu } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { PiUsersThreeFill } from "react-icons/pi";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/**dashboard sidebar */}
            <div className="w-64 min-h-screen bg-orange-300">
                <ul className="menu">
                   {
                    isAdmin ? <> 
                      <li className="uppercase"> 
                     <NavLink to='/dashboard/adminHome' > <FaHome/> Admin Home</NavLink></li>
                   
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/addItems'> <FaUtensils /> Add Items</NavLink></li>
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/manageItems'> <FaList /> Manage items</NavLink></li>
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/manageBookings'>  <FaBook/>manage bookings</NavLink></li>
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/users'>  <PiUsersThreeFill />all users</NavLink></li>
                    </>
                    :
                    <>
                     <li className="uppercase"> 
                     <NavLink to='/dashboard/userHome' > <FaHome/> User Home</NavLink></li>
                   
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/userHome'> <FaTowerObservation/> Reservation</NavLink></li>
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/paymentHistory'> <RiSecurePaymentLine /> payment history</NavLink></li>
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/cart'>  <FaShoppingCart/>My Cart: {cart.length}</NavLink></li>
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/userHome'>  <MdPreview />add review </NavLink></li>
                    <li className="uppercase"> 
                     <NavLink to='/dashboard/userHome'>  <FaShoppingCart/>My booking</NavLink></li>
                    </>
                   }

                     <div className="divider"></div>
                     {/* shared items */}
                     <li className="uppercase"> 
                     <NavLink to='/'>  <TiHome />Home</NavLink></li>
                     <li className="uppercase"> 
                     <NavLink to='/order/salad'>  <IoMdMenu />Menu</NavLink></li>
                     <li className="uppercase"> 
                     <NavLink to='/order/salad'>  <FaShoppingBag />shop</NavLink></li>
                     <li className="uppercase"> 
                     <NavLink to='/order/salad'>  <MdEmail />contact</NavLink></li>
                </ul>
            </div>
            {/**dashboard content */}
            <div className="flex-1 m-3">
                <Outlet></Outlet>

            </div>
            
        </div>
    );
};

export default Dashboard;