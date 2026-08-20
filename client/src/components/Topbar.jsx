import React from "react";
import logo from "@/assets/images/logo-white.png";
import { Button } from "./ui/button";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox.jsx";
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import userprofile from "../assets/images/userprofile.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { removeUser } from "@/redux/user/user.slice";
const Topbar = () => {
  const user = useSelector((state) => state?.user);

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try{
      const response=await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`,{
        method:'get',
        credentials:'include',
      })
      const data=await response.json();
     if(!response.ok){
      return showToast('error',data.message);
     }
     dispatch(removeUser());
     showToast("success", data.message);
     navigate(RouteIndex);
    }
    catch(error){
      showToast("error", error.message);
    }

  }
  return (
    <>
      <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-4 md:px-8">
        <div>
          <img src={logo} alt="Site Logo" className="h-8 object-contain" />
        </div>
        <div className="hidden sm:block w-full sm:w-72 md:w-[500px]">
          <SearchBox />
        </div>
        <div>
          {user.isLoggedIn ? (
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage
                      src={user?.user?.avatar || userprofile}
                      alt={user?.user?.name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-sm font-medium">
                      {user.user?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={8} className="w-64">
                <DropdownMenuLabel className="truncate">
                  <p>{user?.user?.name || "My Account"}</p>
                  <p className="text-sm">{user?.user?.email || "My Account"}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to={RouteProfile} className="flex items-center gap-2">
                    <FaRegUser className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to={RouteBlogAdd} className="flex items-center gap-2">
                    <FaPlus className="h-4 w-4" />
                    <span>Create Blog</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
                  <Button variant="ghost" onClick={handleLogout} className="w-full flex items-center gap-2">
                    <IoLogOutOutline className="h-4 w-4 " />
                    <span>Logout</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="rounded-full">
              <Link to={RouteSignIn}>
                <BiLogIn className="mr-1" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
