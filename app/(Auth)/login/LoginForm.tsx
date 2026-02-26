"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HandleLogin from "./login.actions";
import { signIn } from "next-auth/react";

type LoginFormType = {
  username: string;
  password: string;
};

export default function Login() {
  const RHFobj = useForm<LoginFormType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = RHFobj;

  const passwordValue = watch("password");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function mySubmit(data: LoginFormType) {
    setLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((result) => {
        if (result?.error) {
          toast.error("Login failed. Please check your credentials.", {
            position: "top-right",
            duration: 3000,
            style: {
              background: "#FEE2E2", 
              color: "#B91C1C", 
              border: "1px solid #FCA5A5",
            },
          });
        } else {
          toast.success("Login successful!", {
            position: "top-right",
            duration: 3000,
            style: {
              background: "#D1FAE5",
              color: "#065F46",
              border: "1px solid #10B981",
            },
          });
          reset();
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("An error occurred during login. Please try again.", {
          position: "top-right",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-primary/5">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10 border border-primary/20">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-primary">Login</h1>
          <p className="text-muted-foreground">Enter your name and password</p>
        </div>

        <Form {...RHFobj}>
          <form
            onSubmit={handleSubmit(mySubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={control}
              name="username"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium transition hover:opacity-90 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
