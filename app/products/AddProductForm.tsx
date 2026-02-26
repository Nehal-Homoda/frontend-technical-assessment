"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/_services/products.service";

type ProductFormType = {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

export default function CreateProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormType>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ProductFormType) => {
    setLoading(true);

    const result = await createProduct({
      title: data.title,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      images: [data.image],
    });

    if (!result) {
      toast.error("Something went wrong.", {
        position: "top-right",
        duration: 3000,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
        },
      });
      setLoading(false);
      return;
    }

    toast.success("Product created successfully!", {
      position: "top-right",
      duration: 3000,
      style: {
        background: "#D1FAE5",
        color: "#065F46",
        border: "1px solid #10B981",
      },
    });
    reset();
    setLoading(false);

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="flex justify-center py-16 px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10 border border-primary/20">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-primary">Add New Product</h1>
          <p className="text-muted-foreground">Enter product details below</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Product Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter product title"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="price"
              rules={{
                required: "Price is required",
                pattern: { value: /^\d+$/, message: "Must be a number" },
              }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter price"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="category"
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter category"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.category && (
                    <p className="text-red-500 text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="image"
              rules={{ required: "Image URL is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-primary font-medium">
                    Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter product image URL"
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition ${
                        errors.image ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </FormControl>
                  {errors.image && (
                    <p className="text-red-500 text-sm">
                      {errors.image.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium transition hover:opacity-90 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
