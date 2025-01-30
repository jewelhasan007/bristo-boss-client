import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import userHook from "../hooks/userHook";
import { useContext } from "react";
import { AuthContext } from "../Firebase/providers/AuthProvider";


const AdminRoute = ({children}) => {
    // const {user, loading} = userHook();
      const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin()
    if (loading || isAdminLoading) {
        return (
          <progress
            className="progress progress-secondary w-56"
            value="70"
            max="100"
          ></progress>
        );
      }
      if (user && isAdmin) {
        return children;
      }
      return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
    };


export default AdminRoute;