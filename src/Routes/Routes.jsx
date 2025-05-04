import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/Login/Login";
import SIgnUp from "../pages/SignUp/SIgnUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Login/Dashboard/Cart/Cart";
import AllUsers from "../pages/Login/Dashboard/Cart/AllUsers";
import AddItems from "../pages/Login/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Login/Dashboard/Cart/ManageItems/ManageItems";
import UpdateItem from "../pages/Login/Dashboard/Cart/ManageItems/UpdateItem/UpdateItem";
import Payment from "../pages/Login/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Login/Dashboard/Payment/PaymentHistory";
import UserHome from "../pages/Login/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Login/Dashboard/AdminHome/AdminHome";
import SSLPayment from "../pages/SSLPayment/SSLPayment";
import Cancel from "../pages/SSLPayment/Cancel";
import Fail from "../pages/SSLPayment/Fail";
import Success from "../pages/SSLPayment/Success";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "shop/:category",
        element: <Order></Order>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },

      {
        path: "signup",
        element: <SIgnUp></SIgnUp>,
      },
      {
        path: "secret",
        element:<PrivateRoute><Secret></Secret></PrivateRoute> ,
      },
      {
        path: 'ssl-payment',
        element: <SSLPayment></SSLPayment> ,
      },
      {
path: 'cancel',
element: <Cancel></Cancel>,
      },
      {
        path: 'fail',
        element: <Fail></Fail>,
      },
      {
        path: '/success',
        element: <Success></Success>,
      }
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>

      },
      {
path: 'paymentHistory',
element: <PaymentHistory></PaymentHistory>
      },
      // admin only routes
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
      path: 'manageItems',
      element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
      path: 'updateItem/:id',
      element:<UpdateItem></UpdateItem>,
      loader: ({params}) => fetch(`${process.env.VITE_baseURL}/menu/${params.id}`)

      },
      {
        path: 'users',
        element: <AdminRoute> <AllUsers></AllUsers></AdminRoute>
      }
    ]
  }
]);
