import Layout from "../src/Layout/Layout.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategoryDetails,
  RouteComments,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./helpers/RouteName.js";
import Index from "./pages/Index.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import AddCategory from "./pages/Category/AddCategory.jsx";
import CategoryDetails from "./pages/Category/CategoryDetails.jsx";
import EditCategory from "./pages/Category/EditCategory.jsx";
import AddBlog from "./pages/Blog/AddBlog.jsx";
import BlogDetails from "./pages/Blog/BlogDetails.jsx";
import EditBlog from "./pages/Blog/EditBlog.jsx";
import SingleBlogDetails from "./pages/Blog/SingleBlogDetails.jsx";
import BlogByCategory from "./pages/Blog/BlogByCategory.jsx";
import SearchResult from "./pages/SearchResult.jsx";
import Comments from "./pages/Comments.jsx";
import Users from "./pages/Users.jsx";
import AuthRouteProtection from "./components/AuthRouteProtection.jsx";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path={RouteProfile} element={<Profile />} />
            

            {/* blog*/}

            <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
            <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
            <Route path={RouteSearch()} element={<SearchResult />} />

            

            <Route element={<AuthRouteProtection />}>
              <Route path={RouteBlogAdd} element={<AddBlog />} />
              <Route path={RouteBlog} element={<BlogDetails />} />
              <Route path={RouteBlogEdit()} element={<EditBlog />} />

              
            </Route>

            
            {/*comments*/}
              <Route path={RouteComments} element={<Comments />} />

              {/*users*/}
            <Route path={RouteUser} element={<Users />} />

            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory} element={<EditCategory />} />
              
            
          </Route>
          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
