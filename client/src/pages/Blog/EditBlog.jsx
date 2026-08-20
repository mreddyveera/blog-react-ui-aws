import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor.jsx";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";
import { decode } from "entities";
import Loading from "@/components/Loading";
const EditBlog = () => {
  const {blogid}=useParams();
  const navigate=useNavigate();
  const user=useSelector((state)=>state.user);
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const {
    data: categoryData
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-categorys`, {
    method: "get",
    credentials: "include",
  });

  const {
    data: blogData, loading:blogLoading
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid}`, {
    method: "get",
    credentials: "include",
  },[blogid]);
 
  

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    blogContent: z
      .string()
      .min(3, "Blog Content must be at least 3 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });
  useEffect(() => {
  if (blogData?.blog) {
    setPreview(blogData.blog.featuredImage)
    form.setValue("category", blogData.blog.category._id);
    form.setValue("title", blogData.blog.title);
    form.setValue("slug", blogData.blog.slug);
    form.setValue("blogContent",decode(blogData.blog.blogContent));
  }
}, [blogData]);


  const blogTitle = form.watch("title");

  useEffect(() => {
    const slug = slugify(blogTitle, { lower: true });
    form.setValue("slug", slug);
  }, [blogTitle]);

  async function onSubmit(values) {
    
    try {
      if(!file){
        showToast('error','Feature image Required');
      }
      const formData=new FormData();
      formData.append('file',file);
      formData.append('data',JSON.stringify(values));
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/update/${blogid}`,
        {
          method: "put",
          credentials:"include",
          body: formData,
        }
      );
      const data = await response.json();
      
      if (!response.ok) {
        return showToast("error", data.message || "Registration failed");
      }
      form.reset();
      setFile();
      setPreview();
      navigate(RouteBlog);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };
  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  };
  if(blogLoading) return <Loading/>
  return (
    <>
      <div>
        <Card className="flex items-center justify-center pt-5 max-w-screen-md mx-auto">
          <Form {...form}>
            <CardContent>
              <CardHeader className="text-2xl font-bold mb-4">Edit Blog</CardHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="mb-3 w-full sm:w-96">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categoryData?.category?.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3 w-full sm:w-96">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter blog title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-3 w-full sm:w-96">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="Slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3 w-full sm:w-96">
                  <span className="mb-2 block">Featured Image</span>
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      handleFileSelection(acceptedFiles)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded">
                          <img src={filePreview} />
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className="mb-3 w-96">
                  <FormField
                    control={form.control}
                    name="blogContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BlogContent</FormLabel>
                        <FormControl>
                          <Editor
                            props={{
                              initialData:field.value,
                              onChange: handleEditorData,
                            }}
                          />
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
        </Card>
      </div>
    </>
  );
};

export default EditBlog;
