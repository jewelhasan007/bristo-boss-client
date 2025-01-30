import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data: users=[], refetch} = useQuery({
        queryKey: ['users'], //catching, catch 
        queryFn: async ()=>{
            const result = await axiosSecure.get('/users');
            return result.data;
        },
    })
    const handleAdmin = item =>{
      axiosSecure.patch(`/users/admin/${item._id}`)
      .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
  const handleDeleteUser = item =>{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    .then((result) => {
      if (result.isConfirmed){
        axiosSecure.delete(`/users/${item._id}`)
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
        <div className=" my-4"> 
        <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-4xl">Total Users: {users.length}</h2>
        </div>
            <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th className="uppercase"></th>
        <th className="uppercase">Name</th>
        <th className="uppercase">Email</th>
        <th className="uppercase">Rool</th>
        <th className="uppercase">action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((item, index) => <tr key={item._id}>
            <th>{index+1}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{ item.role === 'admin' ?  'Admin' :
              <button onClick={()=>handleAdmin(item)} className="btn  btn-sm bg-orange-500 "><FaUserAlt className="text-white"></FaUserAlt></button>
                }
            </td>
            <td><button onClick={()=>handleDeleteUser(item)} className="btn  btn-sm bg-red-500 "><FaTrashAlt className="text-white"></FaTrashAlt></button></td>
          </tr>)
      }
     
    </tbody>
  </table>
            </div>
            </div>
        </div>
    );
};

export default AllUsers; 