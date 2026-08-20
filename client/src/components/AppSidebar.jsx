import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from "@/assets/images/logo-dark.png";
import { FaHome } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { GoDot } from "react-icons/go";
import {useDispatch,useSelector} from "react-redux";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteComments, RouteUser } from "@/helpers/RouteName";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";

export function AppSidebar() {
   
  const user=useSelector((state)=>state.user);
 
  
  const {data:categoryData}=useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-categorys`,{
      method:"get",
      credentials:"include"
    });
  
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} width={120}/>
        </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup> 
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FaHome/>
                        <Link to="/">Home</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                {user?.isLoggedIn && user?.user?.role==="admin" &&
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BiSolidCategoryAlt/>
                        <Link to={RouteCategoryDetails}>Categories</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>}
              
                {user?.isLoggedIn &&
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FaBlog/>
                        <Link to={RouteBlog}>Blogs</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>}
                 {user?.isLoggedIn && user?.user?.role==="admin" &&
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FaComments/>
                        <Link to={RouteComments}>Comments</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>}

                {user?.isLoggedIn && user?.user?.role==="admin" &&<SidebarMenuItem>
                    <SidebarMenuButton>
                      <HiUsers/>
                        <Link to={RouteUser}>Users</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>}

            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup> 
          <SidebarGroupLabel className="from-neutral-950">
            Categories
          </SidebarGroupLabel>
            <SidebarMenu>
              {categoryData && categoryData.category.length>0 && categoryData.category.map(category=>
              <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton>
                      <GoDot className="group-hover/menu-item:text-violet-600" />
                        <Link to={RouteBlogByCategory(category.name)} className="group-hover/menu-item:text-violet-600">{category.name}</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

              )}
                

            </SidebarMenu>
        </SidebarGroup>
        
      </SidebarContent>
    </Sidebar>
  )
}