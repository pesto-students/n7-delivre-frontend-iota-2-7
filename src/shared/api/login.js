import { signInWithPopup, signOut } from "@firebase/auth";
import { createApi } from "../api/crud";
import { auth, provider } from "../utils/firebase";

export const googleSignIn = async () => {
  console.log("Signing in...");
  try{
  const result = await signInWithPopup(auth, provider);
  // console.log(result.user);
  if (result.user) {
    const body = {
      id: result.user.uid,
      name: result.user.displayName,
      email: result.user.email,
    };
    const response = await createApi(body, "login");
    console.log("User", response);

    return response;
  }
  }
  catch(err){
    console.log(err);
  }

  
};

export const logout = async () => {
  signOut(auth)
    .then(() => {
      console.log("SignOut Successfull");
      localStorage.clear();
      window.location.assign('/');
    })
    .catch((err) => console.log("Error while sign out", err));
};
