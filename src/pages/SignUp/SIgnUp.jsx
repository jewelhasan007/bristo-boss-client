import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Firebase/providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../component/socialLogin";

const SIgnUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
      .then(()=>{
        // create user entry in the database
const userInfo ={
  name: data.name,
  email: data.email
}
axiosPublic.post('/users', userInfo)
.then(res=>{
  if(res.data.insertedId){
    console.log('user added to the database ')
    reset();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User Created Successful.",
      showConfirmButton: false,
      timer: 1500
    });
  }
})
        console.log('user profile info updated')
        
      })
            .catch(error=>console.log(error))
      navigate('/')
    });
  };
  
  return (
    <>
      <Helmet>
        <title>SIGN UP</title>
      </Helmet>
      <div className="flex justify-end">
        <button className="btn-sm btn-outline border-b-4 border-blue-400">
          <Link to="/">back to Home</Link>
        </button>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up!</h1>
            <p className="py-6">Please Sign Up the by Email</p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="name"
                  name="name"
                  {...register("name", { minLength: 4 })}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
                {errors.name?.type === "minLength" && (
                  <p role="alert" className="text-red-600">
                    Minimum Character is less than 4
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-600">
                    Email is required
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="photoURL"
                  name="photoURL"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
                {errors.photoURL?.type === "required" && (
                  <p role="alert" className="text-red-600">
                    photo URL is missing
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "minLength" && (
                  <p role="alert" className="text-red-600">
                    Minimum Character is less than 4
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p role="alert" className="text-red-600">
                    Maximum 20 Character
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p role="alert" className="text-red-600">
                    pattern not matched
                  </p>
                )}
                {errors.password?.type === "required" && (
                  <p role="alert" className="text-red-600">
                    password required
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div>
                <select {...register("gender")}>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-outline uppercase border-orange-500 border-b-4">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="m-2 px-4 text-blue-500">
              <Link to="/login">Already have an account</Link>
            </p>
            <div className="divider"></div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default SIgnUp;
