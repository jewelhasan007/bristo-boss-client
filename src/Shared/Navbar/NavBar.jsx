import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Firebase/providers/AuthProvider';
import Swal from 'sweetalert2';
import { FaShoppingCart } from "react-icons/fa";
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const NavBar = () => {
  const {user, logOut} = useContext(AuthContext)
  const [isAdmin] = useAdmin();
const [cart] = useCart()

  const handleLogOut = ()=>{
logOut()
.then(()=>{})
.then(error =>console.log(error))
Swal.fire({
        position: "center",
        icon: "success",
        title: "LogOut Successfully",
        showConfirmButton: false,
        timer: 1500
      }); 
}
    const nabMenu = <>
   <li className='mx-3'><Link to='/'>HOME</Link></li>
   <li className='mx-3'><Link>DASHBOARD</Link></li>
   <li className='mx-3'><Link>CONTACT US</Link></li>
   <li className='mx-3'><Link to='/menu' >OUR MENU</Link></li>
   <li className='mx-3'><Link to='/shop/salad'>Ordered Food</Link></li>
   <li className='mx-3'><Link to='/ssl-payment'>SSLCommerz Payment</Link></li>
   {
    // user ? 'true' : 'false'
    // user ? condition ? 'double ture' : 'one true' : 'false'
    
   }
   {
    user && isAdmin && <li className='mx-3'><Link to='/dashboard/adminHome'>Dashboard</Link></li>
    
   }
   {
    user && !isAdmin && <li className='mx-3'><Link to='/dashboard/userHome'>Dashboard</Link></li>

   }
   <li>
   <Link className="btn" to='/dashboard/cart'>
   
   <p className='mx-3 text-green-500'>My Cart</p>
   <FaShoppingCart className='mr-2' />
    <div className="badge badge-default">+{cart.length}</div>
    </Link>  
   </li>


   { user ?  <> 
    <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
        <a className="justify-between">
          Profile
          <span className="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li><a>Logout</a></li>
    </ul>
  </div> 
   <li className='mx-3'><button onClick={handleLogOut} >Log Out</button></li></> :
   <><li className='mx-3'><Link to='/login'>Log In</Link></li>
   <li className='mx-3'><Link to='/signup'>Register</Link></li>
   </> 
  
   }
   
    </>
    return (
        <div>
            <div className="navbar fixed z-30 max-w-screen-xl text-[#07AE3A] bg-base-300 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      {
        nabMenu
      }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Bristro Boss</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {nabMenu}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
        </div>
    );
};

export default NavBar;