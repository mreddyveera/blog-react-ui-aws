import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { BiCategory } from 'react-icons/bi';
import {useSearchParams} from "react-router-dom";
const SearchResult = () => {
    const [searchParams, setSearchParams]=useSearchParams();
    const q=searchParams.get('q');
    
     const {data:blogData,loading,error}=useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${q}`,{
            method:"get",
            credentials:"include"
          },[searchParams]);
     if(loading) return <div><Loading/></div>
  return (
     <>
    <div className="flex items-center gap-3 mb-3 hover:text-violet-500">
        <BiCategory/>
        <h2 className="text-2xl font-bold">{q}</h2>
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
  )
}

export default SearchResult
