"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import userRegistration from "@/api/register";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  username: z.string().min(5, {
    message: "Enter a valid username",
  }),
  password: z.string().min(6, {
    message: "Enter a valid password",
  }),
  profileImage: z.instanceof(File),
});

export default function Signup() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      await userRegistration(values);
      router.push('/signin');
    } catch (error: any) {
      console.error("Failed to register user:", error);
    }
  }
  return (
    <>
      <div className="relative h-[90vh] flex items-center justify-center">
        <div className=" sm:w-[50%] lg:w-[35%] xl:w-[30%] bg-white p-5 flex items-center justify-center">
          <div className="space-y-5 w-[95%] p-8 bg-[#5D8AA8] sm:bg-transparent rounded-xl">
            <h2 className="text-2xl">Sign Up to Rivu</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            field.onChange(e.target.files[0]); // Ensure the file object is set correctly
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
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
                  <Button type="submit">Sign up</Button>
                </div>
              </form>
            </Form>
            <h2 className="text-center text-base">
              Back to{" "}
              <Link href="/signin" className="hover:underline font-[500]">
                Login
              </Link>{" "}
              page
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
