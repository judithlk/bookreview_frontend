"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useLoginMutation } from "@/redux/services/auth.service";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";

const formSchema = z.object({
  email: z.string().email({
    message: "Email cannot be null",
  }),
  password: z.string().min(6, {
    message: "Password cannot be null"
  })
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const router = useRouter()

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [login, loginState] = useLoginMutation();

  async function onSubmit(values: z.infer<typeof formSchema>, e:any) {
    e.preventDefault();
    setIsLoading(true);
    const result: any = await login(values);
    try {     
        dispatch(
          setCredentials({
            user: result.data.user,
            token: result.data.accessToken,
          })
        );     
        // toast({
        //   title: "Success",
        //   description: "Successfully logged in",
        // })
        router.push('/')
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to log in",
      // })
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <>
      <div className="relative h-[90vh] flex items-center justify-center">
        <div className="sm:w-[50%] lg:w-[35%] xl:w-[30%] bg-white p-5 flex items-center justify-center">
          <div className="space-y-5 w-[95%] p-8 rounded-xl">
          <h2 className="text-2xl">Login to Rivu</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
              <Button type="submit">Login</Button>
              </div>
            </form>
          </Form>
          <h2 className="text-center text-base">Don't have an account? <Link href="/signin/new-user" className="hover:underline font-[500]">Sign up</Link> here</h2>
          </div>
        </div>

      </div>
    </>
  );
}
