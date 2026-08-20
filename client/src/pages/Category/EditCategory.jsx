import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";

const EditCategory = () => {
  const {category_id}=useParams();
  const {data:categoryData,loading,error}=useFetch(`${getEnv('VITE_API_BASE_URL')}/category/show/${category_id}`,{
      method:"get",
      credentials:"include"
    },[category_id]);
  
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
const categoryName=form.watch('name');
  useEffect(()=>{
    
    const slug=slugify(categoryName,{lower:true});
    form.setValue('slug',slug);
  },[categoryName]);
  useEffect(()=>{
    if(categoryData){
      form.setValue('name',categoryData.category.name);
      form.setValue('slug',categoryData.category.slug);
    }

  },[categoryData])

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/update/${category_id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Registration failed");
      }
       showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <>
    <div>
      <Card  className="pt-5 max-w-screen-md mx-auto">
          <Form {...form}>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-3">
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

export default EditCategory;
