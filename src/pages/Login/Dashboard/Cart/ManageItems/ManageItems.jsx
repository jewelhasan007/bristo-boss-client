import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../../../hooks/useMenu";
import CategoryTitle from "../../../../../Shared/CategoryTitle/CategoryTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure"
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
   

      const handleDeleteItem =  (item) =>{
        console.log('item id find=', item)
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then( async (result) => {
          if (result.isConfirmed){
         
           const res = await axiosSecure.delete(`/menu/${item._id}`);
          // const res = await axiosPublic.delete(`/menu/${item._id}`);
           console.log(res.data);
if(res.data.deletedCount > 0){
  refetch();
  Swal.fire({
    title: "Item Deleted Succesfully",
    text: `${item.name}Your Ordered Item has been deleted.`,
    icon: "success"
  });
}
         
   
          }
        
        });
      }
    return (
        <div>
            <CategoryTitle
            subHeading="Hurry up" heading="Manage All Items"
        
            ></CategoryTitle>
<div className="text-5xl text-red-600">
{menu.length}
</div>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
      #
        </th>
        <th>ITEM IMAGE</th>
        <th>ITEM NAMEE</th>
        <th>PRICE</th>
        <th>ACTION</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
menu.map((item, index)=> <tr>
    <th>
    {index+1}
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
     
    </td>
    <td>{item.price}</td>
    <td>
                 <Link to={`/dashboard/updateItem/${item._id}`} > <button className="btn btn-ghost btn-sm bg-orange-500 "><FaEdit className="text-white"></FaEdit></button></Link>
                </td>
                <td>
                  <button 
                  onClick={()=>handleDeleteItem(item)}
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
    );
};

export default ManageItems;