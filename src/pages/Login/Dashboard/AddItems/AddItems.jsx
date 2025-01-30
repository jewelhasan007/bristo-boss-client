import { useForm } from "react-hook-form";
import CategoryTitle from "../../../../Shared/CategoryTitle/CategoryTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic"
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = ({ subHeading, heading }) => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
   console.log(data)
    // image upload to imgbb and then get an url
    const imageFile = {image: data.image[0]}
const res = await axiosPublic.post(image_hosting_api, imageFile, {
  headers: {
    'content-type': 'multipart/form-data'
  }
});
if(res.data.success){
  // now send the menu items data to the server with the image
  const menuItem = {
    name: data.name,
    category: data.category,
    price: parseFloat(data.price),
    recipe: data.recipe,
    image: res.data.data.display_url
  }
  const menuResponse = await axiosSecure.post('/menu', menuItem)
console.log('menuResponse', menuResponse.data)
if(menuResponse.data.insertedId){
  // show success popup 
   Swal.fire({
                title: "Successful",
                text: "menuItem Created Successful",
                icon: "success"
              });
}
}
console.log('with image url', res.data);
};

  return (
    <div>
      <CategoryTitle
        heading="add an item"
        subHeading="what a new?"
      ></CategoryTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
         

          <div className="form-control w-full mb-3 ">
            <label className="label">
              <span className="label-text">Recipe Name *</span>
            
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register('name', {required: true})}
              required
              className="input input-bordered w-full "
            />
            
          </div>
          <div className="flex">
          <div className="w-1/2">
          <label className="label">
              <span className="label-text">Category</span>
            
            </label>
          <select
            {...register("category")}
            className="select select-bordered w-full "
            defaultValue="default"
          >
            
            <option disabled value="default">
              select a category
            </option>
            <option value="salad">salad</option>
            <option value="pizza">pizza</option>
            <option value="soup">soup</option>
            <option value="dessert">dessert</option>
            <option value="drinks">drinks</option>
          </select>
          </div>
{/* price */}
<div className="form-control w-1/2  mb-3 ">
            <label className="label">
              <span className="label-text">Price *</span>
            
            </label>
            <input
              type="text"
              placeholder="Price"
              {...register('price', {required: true})}
              className="input input-bordered w-full "
            />
            
          </div>

          </div>
          <label className="form-control">
  <div className="label">
    <span className="label-text">Recipe Details*</span>
 
  </div>
  <textarea {...register('recipe', {required: true})} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
  
</label>
<input {...register('image', {required: true})} type="file" className="file-input w-full my-4" />
     <div className="my-4">
    <button className="btn btn-primary">Add Item <FaUtensils></FaUtensils></button>
     </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
