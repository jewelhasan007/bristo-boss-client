import { Children, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic()
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
// Update User
const updateUserProfile = (name, photo) =>{
  return updateProfile(auth.currentUser, {
    displayName: name, photoURL: photo
  });
}

  // signIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google signin

  const googleSIgnIn = ()=>{
   setLoading(true)
   return signInWithPopup(auth, googleProvider)
  }

  // LogOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);
      if(currentUser){
      // get token and store client
      // httpOnly
      // local storage
        const userInfo = {email: currentUser.email};
        axiosPublic.post('/jwt', userInfo )
        .then(res=>{
          if(res.data.token) {
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          }
        })
      }
      else{
        // TODO: remove token(if token stored in the client side: 
        // Local Storage, caching, in memory)
        localStorage.removeItem('access-token');
        setLoading(false);
      }

    });
    return () => {
      return () => {
        unsubscribe();
      };
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    signIn,
    googleSIgnIn,
    createUser,
    updateUserProfile,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
