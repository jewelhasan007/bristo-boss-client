import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import SocialLogin from "../../component/SocialLogin"
import { AuthContext } from "../../Firebase/providers/AuthProvider";

const Login = () => {

  const [disabled, setDisabled] = useState(true);

  const {signIn} = useContext(AuthContext)
  const location =useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  console.log('the location state is', location.state)
  {
    /* captcha load */
  }
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
    .then(result=>{const user = result.user;
      console.log(user)})
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500
      }); 
      navigate(from,{replace:true});
    }

  const handleCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  };

  return (
    <>
    <Helmet>
            <title>SIGN IN</title>
          </Helmet>
    <div>
      <div className="flex justify-end">
        <button className="btn-sm btn-outline border-b-4 border-blue-400">
          <Link to="/">back to Home</Link>
        </button>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type here"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {/* Reload Captcha Reload' */}
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  onBlur={handleCaptcha}
                  placeholder="type the captcha above"
                  className="input input-bordered"
                  required
                />
                
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  className="btn btn-primary "
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
            <p className="m-2 px-4 text-blue-500"><small>New Here? <Link to="/signup">Create an account</Link></small></p>
            <div className="divider"></div>
            <SocialLogin></SocialLogin>
          </div>
         
        </div>
      
      </div>
    </div>
    </>
  );
};

export default Login;
