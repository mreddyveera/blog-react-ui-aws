import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button } from "./ui/button";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { showToast } from "@/helpers/showToast";
import { useSelector } from "react-redux";

const LikeCount = ({ props }) => {
  const user = useSelector((state) => state.user);

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const userId = user?.user?._id;

  const { data } = useFetch(
    userId
      ? `${getEnv("VITE_API_BASE_URL")}/bloglike/get-like/${props.blogid}/${userId}`
      : `${getEnv("VITE_API_BASE_URL")}/bloglike/get-like/${props.blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (data) {
      setLikeCount(data.likeCount);
      setLiked(data.liked);
    }
  }, [data]);

  const handleLike = async () => {
    if (!user.isLoggedIn) {
      return showToast("error", "Please login to continue");
    }

    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/bloglike/dolike`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blogid: props.blogid,
            userid: user.user._id,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        return showToast("error", responseData.message);
      }

      // SINGLE SOURCE OF TRUTH
      setLikeCount(responseData.likeCount);
      setLiked(responseData.liked);

      if (responseData.liked) {
        showToast("success", "You liked the post");
      } else {
        showToast("success", "You unliked the post");
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <Button
      onClick={handleLike}
      variant="ghost"
      className="flex items-center gap-2 text-muted-foreground hover:text-primary"
    >
      {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
      {likeCount}
    </Button>
  );
};

export default LikeCount;
