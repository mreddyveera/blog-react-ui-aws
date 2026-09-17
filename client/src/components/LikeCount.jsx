import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button } from "./ui/button";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { showToast } from "@/helpers/showToast";
import { useSelector } from "react-redux";

const LikeCount = ({ props }) => {
  const user = useSelector((state) => state.user);

  const [likeOverride, setLikeOverride] = useState(null);

  const userId = user?.user?._id;

  const apiUrl = userId
    ? `${getEnv("VITE_API_BASE_URL")}/bloglike/get-like/${props.blogid}/${userId}`
    : `${getEnv("VITE_API_BASE_URL")}/bloglike/get-like/${props.blogid}`;

  const { data } = useFetch(
    apiUrl,
    {
      method: "get",
      credentials: "include",
    }
  );

  /*
   * Use API data as the source of truth initially.
   *
   * After the user clicks like/unlike, use the response from
   * that POST request as a temporary local override.
   */
  const likeCount =
    likeOverride?.blogid === props.blogid
      ? likeOverride.likeCount
      : data?.likeCount ?? 0;

  const liked =
    likeOverride?.blogid === props.blogid
      ? likeOverride.liked
      : data?.liked ?? false;

  const handleLike = async () => {
    if (!user?.isLoggedIn) {
      return showToast("error", "Please login to continue");
    }

    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/bloglike/dolike`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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

      // Use the API response directly as the new local state.
      setLikeOverride({
        blogid: props.blogid,
        likeCount: responseData.likeCount,
        liked: responseData.liked,
      });

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
      {liked ? (
        <AiFillHeart className="text-red-500" />
      ) : (
        <AiOutlineHeart />
      )}

      {likeCount}
    </Button>
  );
};

export default LikeCount;