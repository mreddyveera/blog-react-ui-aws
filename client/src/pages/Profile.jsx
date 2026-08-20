import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { getEnv } from "@/helpers/getEnv";
import { Navigate, useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch.js";
import Loading from "@/components/Loading.jsx";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice.js";
import { RouteIndex } from "@/helpers/RouteName";

const Profile = () => {
  const [filePreview,setPreview]=useState();
  const [file,setFile]=useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const email = user?.email;
  const navigate=useNavigate();

  const {
    data: userData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/user/get-user/${email}`, {
    method: "get",
    credentials: "include",
  });
  const formSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 character long."),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be atleast 3 character long."),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });
  useEffect(() => {
    if (userData?.user) {
      form.reset({
        name: userData.user.name || "",
        email: userData.user.email || "",
        bio: userData.user.bio || "",
        password: "", // NEVER prefill passwords
      });
    }
  }, [userData, form]);

  const avatarUrl = userData?.user?.avatar?.trim()
    ? userData.user.avatar
    : "http://github.com/shadcn.png";

  async function onSubmit(values) {
    try {
      
      const formData=new FormData();
      formData.append('file',file);
      formData.append('data',JSON.stringify(values));
      const email=userData?.user?.email || values.email;
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${email}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message || "Something error occured");
        return;
      }
      dispatch(setUser(data.user));
      showToast("success", data.message);
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleFileSelection=(files)=>{
    const file=files[0];
    const preview=URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  }
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <div>
        <Card className="max-w-screen-md mx-auto">
          <CardContent>
            <div className="flex flex-col justify-center items-center mt-10">
              <Dropzone onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Avatar className="w-28 h-28 relative group">
                      <AvatarImage src={filePreview?filePreview: avatarUrl} />
                      <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer">
                        <IoCameraOutline color="#7c3aed" />
                      </div>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </Dropzone>

              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
                    <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your name"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Write about yourself"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter your password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <Button type="submit" className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            <div></div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
