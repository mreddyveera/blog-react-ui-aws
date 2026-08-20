import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { FaComment } from "react-icons/fa";
import { Button } from "./ui/button";

const CommentCount = ({ props }) => {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  
  return (
    <>
      <Button type="button" variant="ghost" className="flex justify-between items-center">
        <FaComment />
        {data && data.commentCount}
      </Button>
    </>
  );
};

export default CommentCount;
