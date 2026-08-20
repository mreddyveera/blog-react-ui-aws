import { auth, provider } from "@/helpers/firebase";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv.js";
import { RouteIndex } from "@/helpers/RouteName.js";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user=googleResponse.user;
      const bodyData={
        name:user.displayName,
        email:user.email,
        avatar:user.photoURL
      }
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/googlelogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Login failed");
      }
      dispatch(setUser(data.user));


      showToast("success", data.message || "LogIn successfully");
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <div>
      <Button variant="outline" className="w-full" onClick={handleLogin}>
        <FcGoogle />
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleLogin;
