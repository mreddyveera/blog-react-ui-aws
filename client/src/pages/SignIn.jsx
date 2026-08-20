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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv.js";
import { showToast } from "@/helpers/showToast.js";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(3, "Password feild is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message || "Login failed");
        return;
      }

      dispatch(setUser(data.user));
      showToast("success", data.message || "LogIn successfully");
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center items-center text-2xl">
              Login Into Account
            </CardTitle>
          </CardHeader>
          <div>
        <GoogleLogin />
        <div className="border-1 my-5 flex justify-center items-center">
          <span className="absolute bg-white text-sm">Or</span>
        </div>
      </div>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
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
                <div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-flex justify-center items-center">
            <p>
              Don&apos;t have an Account?{" "}
              <Link className="text-blue-500 hover:underline" to={RouteSignUp}>
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
