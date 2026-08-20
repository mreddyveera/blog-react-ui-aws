import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { RouteSignIn } from "@/helpers/RouteName";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";
const Comment = ({props}) => {
    const [newComment,setNewComment]=useState();
    const user=useSelector(state=> state.user);
   
  const formSchema = z.object({
    comment: z.string().min(3, "Comment must be at least 3 characters long"),
   
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
        const newValues={...values, blogid:props.blogid,user:user.user._id}
       
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/comment/add`,
        {
          method: "POST",
          credentials:"include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
     
      if (!response.ok) {
        return showToast("error", data.message || "Registration failed");
      }
      setNewComment(data.comment)
      form.reset();

      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl font-blod">
        <FaRegComment className="text-violet-500" /> Comment
      </h4>
      {user?.isLoggedIn ?
            <Form {...form}>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-sm">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                     <Textarea placeholder="Type your comment" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Form>
      :
      <Button asChild>
        <Link to={RouteSignIn}>SignIn</Link>
      </Button>
      }
      <div className="mt-5">
        <CommentList props={{blogid:props.blogid,newComment}}/>
      </div>

    </div>
  );
};

export default Comment;
