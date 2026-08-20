import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv.js";
import { useFetch } from "@/hooks/useFetch.js";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { useParams } from "react-router-dom";
//BlogRoute.get("/get-blog-by-category/:category",getBlogByCategory);

const BlogByCategory = () => {
    
  const { category } = useParams();
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`,
    {
      method: "get",
      credentials: "include",
    },
    [category]
  );


  
  if(loading) return <div><Loading/></div>
  return (
    <>
    <div className="flex items-center gap-3 mb-3 hover:text-violet-500">
        <BiCategory/>
        <h2 className="text-2xl font-bold">{category}</h2>
        {blogData &&blogData.blog.length}
    </div>
    <div>
      <div className="grid grid-cols-3 gap-10">
        {blogData && blogData.blog.length > 0 ? (
          <>
            {blogData.blog.map((blog) => (
               
              <BlogCard key={blog._id} props={blog} />
            ))}
          </>
        ) : (
          <div>Data Not Found.</div>
        )}
      </div>
    </div>
    </>
    
  );
};

export default BlogByCategory;
