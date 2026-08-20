import { getEnv } from '@/helpers/getEnv';
import { RouteBlogDetails } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { Link } from 'react-router-dom';

const RelatedBlog = ({props}) => {
  
    
     const { data, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/get-relatedblog/${props.category}/${props.slug}`,
        {
          method: "get",
          credentials: "include",
        }
      );
  
      if(loading) return <div>Loading...</div>
  return (
   <>
   <h2 className="text-2xl font-bold justify-center items-center mb-5">Related Blog</h2>
   <div>
    {data && data.blog.length>0 ?
    data.blog.map(blog=>{
      return(
        <Link key={blog._id} to={RouteBlogDetails(props.category,blog.slug)}>
        <div className="flex items-center gap-2 mb-3">
        <img className="w-20 h-12 sm:w-24 sm:h-16 object-cover rounded-md flex-shrink-0" src={blog.featuredImage} />
        <h4 className="line-clamp-2 text-lg font-semibold">{blog.title}</h4>
         </div>
        </Link>
         


   

      )
    })
   
    :
    <div>
      No Related Blog
    </div>
    }
    

   </div>
   </>
  )
}

export default RelatedBlog
