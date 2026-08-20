import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName.js";
import SingleBlogDetails from "@/pages/Blog/SingleBlogDetails.jsx";

const BlogCard = ({ props }) => {
  const user = useSelector((state) => state.user);
  const avatarUrl = "avatarUrl";
 
  
  
  return (
    <Link to={RouteBlogDetails(props?.category?.name, props.slug)}>
      <div>
        <Card className="pt-5">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex justify-between items-center gap-3">
                <Avatar className="w-12 h-12 rounded-full border overflow-hidden">
                  <AvatarImage
                    src={
                      props?.featuredImage ||
                      "http://github.com/shadcn.png"
                    }
                    className="object-cover"
                  />
                </Avatar>

                <span className="text-sm font-medium">
                  {props?.author?.name}
                </span>
              </div>
              {props?.author?.role === "admin" && (
                <Badge variant="outline" className="bg-violet-500">
                  Admin
                </Badge>
              )}
            </div>
            <div className="my-2 w-full h-48 overflow-hidden">
              <img
                src={props.featuredImage}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex items-start gap-2 mb-2">
              <SlCalender className="shrink-0 text-lg" />
              <span className="shrink-0 text-sm">
                {new Date(props.createdAt).toLocaleDateString("en-IN")}
              </span>
              <h2 className="text-2xl font-bold line-clamp-2">{props.title}</h2>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default BlogCard;
