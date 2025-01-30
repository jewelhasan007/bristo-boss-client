import Swal from "sweetalert2";
import userHook from "../../hooks/userHook";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({items}) => {
    const {name, image, recipe, price, _id} = items
    const {user} =userHook();
    const navigate = useNavigate();
    const location = useLocation()
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleCart = () =>{
    
      if(user && user.email){
        // TODO: send cart item to the database
     
        const cartItem = {
          menuId: _id,
          email: user.email,
          name,
          image, 
          recipe,
          price
        }
        axiosSecure.post('/carts', cartItem)
        .then(res=>{
          console.log(res.data)
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              title: `${name} added succesfull.`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            // refetch cart to update the items count
            refetch();
          }
        })
        .catch(error=>{
          console.log(error)
        })
      }
      else{
        Swal.fire({
          title: "You are not logged In",
          text: "Please Log in first(If you have account). Otherwise Register please.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, LogIn"
        }).then((result) => {
          if (result.isConfirmed) {
          
          //  send the user to the login page
        navigate('/login', {state: {from: location}})  
        }
        });
      }
    }
  return (
    <div className="card bg-slate-200 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt={name}
          className="rounded-xl"
        />
        <p className="absolute right-0 top-0 mr-14 mt-14 px-2 rounded bg-slate-300">${price}</p>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        
        <div className="card-actions">
          <button onClick={handleCart} className="btn btn-outline uppercase border-b-4 border-orange-400 ">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
