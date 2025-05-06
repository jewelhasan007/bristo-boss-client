import { FaGoogle } from "react-icons/fa";

import userHook from "../hooks/userHook";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    // const {googleSIgnIn} = useContext(AuthContext)
    const {googleSIgnIn} = userHook()
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const handleGoogleSignIn = ()=>{
    googleSIgnIn()
    .then(result=>{
    console.log(result.user);
    const userInfo = {
      email: result.user?.email,
      name: result.user?.displayName
    }
    axiosPublic.post('/users', userInfo)
    .then(res =>{
      console.log(res.data)
      navigate('/');
    })
    })
  }
  return (
    <div className="p-8">
    <button onClick={handleGoogleSignIn} className="btn btn-xs">
        <FaGoogle></FaGoogle>
        Continue with Google</button>
    </div>
  );
};

export default SocialLogin;
