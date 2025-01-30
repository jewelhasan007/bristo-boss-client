import { useContext } from "react";
import { AuthContext } from "../Firebase/providers/AuthProvider";


const userHook = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default userHook;