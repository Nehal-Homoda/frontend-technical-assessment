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
import { RegisterFormType } from "./register.types";
import { registerUser } from "@/app/_services/auth.service";
import { useState } from "react";
import HandleRegister from "./register.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const RHFobj = useForm<RegisterFormType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = RHFobj;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const password = watch("password");

  async function mySubmit(data: RegisterFormType) {
    setLoading(true);
    setMessage("");

    const result = await HandleRegister(data);

    if (result) {
      toast.success("Registration successful!", {
        position: "top-right",
        duration: 3000,
        style: {
          background: "#D1FAE5",
          color: "#065F46",
          border: "1px solid #10B981",
        },
      });
      reset();
      router.push("/login");
    } else {
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        duration: 3000,
      });
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-primary/5">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10 border border-primary/20">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p className="text-muted-foreground">
            Fill the form below to register
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 text-center py-2 rounded ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <Form {...RHFobj}>
          <form
            onSubmit={handleSubmit(mySubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={control}
              name="name"
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
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
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

            <FormField
              control={control}
              name="rePassword"
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm your password"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.rePassword ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.rePassword && (
                    <p className="text-red-500 text-sm">
                      {errors.rePassword.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              rules={{
                required: "Phone is required",
                pattern: {
                  value: /^01\d{9}$/,
                  message: "Invalid phone number",
                },
              }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
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
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
