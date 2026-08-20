import Comment from "@/components/Comment";
import CommentCount from "@/components/CommentCount";
import CommentList from "@/components/CommentList";
import LikeCount from "@/components/LikeCount";
import Loading from "@/components/Loading";
import RelatedBlog from "@/components/RelatedBlog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getEnv } from "@/helpers/getEnv.js";
import { useFetch } from "@/hooks/useFetch.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { decode } from "entities";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const SingleBlogDetails = ({}) => {
  const { blog,category } = useParams();
  
 

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },[blog,category]
  );
  

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-20">
      {data && data.blog && (
        <>
          <div className="border rounded w-full md:w-7/12 p-5">
            <h1 className="text-2xl font-bold mb-5">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                  <AvatarImage src={data.blog.featuredImage} />
                </Avatar>
                <div>
                  <span className="font-bold">{data.blog.author.name}</span>
                  <p>{new Date(data.blog.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex justify-between items-center gap-5">
                <LikeCount props={{blogid:data.blog._id}}/>
                <CommentCount props={{blogid:data.blog._id}}/>
              </div>

            </div>
            <div className="my-6 w-full max-h-[420px] overflow-hidden rounded-xl border">
              <img
                src={data.blog.featuredImage}
                alt={data.blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: decode(data.blog.blogContent),
              }}
            />
            <div className="border-t mt-5 pt-5">
              <Comment props={{ blogid: data.blog._id }} />
            </div>
          </div>
        </>
      )}

      <div className="border rounded w-full md:w-5/12 p-5 mt-6 md:mt-0">
        <RelatedBlog props={{category:category,slug:blog}}/>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
