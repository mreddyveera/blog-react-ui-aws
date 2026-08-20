import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignIn, RouteSignUp } from "@/helpers/RouteName";
import { getEnv } from "../helpers/getEnv.js";
import { showToast } from "@/helpers/showToast.js";
import GoogleLogin from "@/components/GoogleLogin.jsx";
import { setUser } from "@/redux/user/user.slice.js";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters long"),
      email: z.string().email("Invalid email format"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Password and Confirm Password should be same",
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Registration failed");
      }
      dispatch(setUser(data.user));
      showToast("success", data.message || "Registered successfully");
      navigate(RouteSignIn);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      
      <Form {...form}>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center items-center text-2xl">
              Create Your Account
            </CardTitle>
          </CardHeader>
          <div>
        <GoogleLogin />
        <div className="border-1 my-5 flex justify-center items-center">
          <span className="absolute bg-white text-sm">Or</span>
        </div>
      </div>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
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

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password again"
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
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-flex justify-center items-center">
            <p>
              Already have an Account?{" "}
              <Link className="text-blue-500 hover:underline" to={RouteSignIn}>
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default SignUp;
