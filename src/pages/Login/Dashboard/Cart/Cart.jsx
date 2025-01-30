import React from 'react';
import useCart from '../../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const  [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item)=>total+item.price,0)
    const totalPrice2 = totalPrice.toFixed(2)
    const axiosSecure= useAxiosSecure()
    const handleDelete = id =>{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed){
        axiosSecure.delete(`/carts/${id}`)
        .then(res=>{
          console.log(res.data)
          refetch();
          if(res.data.deletedCount>0){
            Swal.fire({
              title: "Item Deleted Succesfully",
              text: "Your Ordered Item has been deleted.",
              icon: "success"
            });
          }
        })

      }
    
    });
  }
    return (
        <div >
        <div className='flex justify-evenly'>
         <h1 className='text-4xl'>Items: {cart.length}</h1>
         <h1 className='text-4xl'>Total Price: {totalPrice2}</h1>
    {
      cart.length ?   <Link to="/dashboard/payment">  <button className='btn btn-primary'>Pay</button></Link> :
      
<button disabled className='btn btn-primary'>Pay</button>
    }
        </div>
        <div className='m-4'>
        <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead className='text-center'>
      <tr >
        <th className='uppercase text-black'>#</th>
        <th className='uppercase text-black'>item image</th>
        <th className='uppercase text-black'>item name</th>
        <th className='uppercase text-black'>price</th>
        <th className='uppercase text-black'>action </th>
        <th className='uppercase text-black'>action </th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((item, index)=>  <tr key={item._id} >
            <th>
              {
                index+1
              }
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={item.image}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              
              </div>
            </td>
            <td>
              {item.name}
              <br />
              <span className="badge badge-ghost badge-sm">{item.recipe}</span>
            </td>
            <td>${item.price}</td>
            <td>
              <button className="btn btn-ghost btn-xs bg-gray-300">EDIT</button>
            </td>
            <td>
              <button 
              onClick={()=>handleDelete(item._id)}
              className="btn btn-ghost btn-xs bg-red-300"> 
              <FaTrashAlt></FaTrashAlt>
              </button>
            </td>
          </tr>)
      }
     

    </tbody>
  
  </table>
</div>
        </div>
       </div>
    );
};

export default Cart;