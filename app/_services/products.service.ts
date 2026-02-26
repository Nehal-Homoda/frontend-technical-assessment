import { Product, ProductResponse } from "@/app/_interfaces/products.interface";


export async function getAllProducts(
  query?: string,
): Promise<Product[] | null> {
  try {
    const url = `https://dummyjson.com/products${query ? `?${query}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Products not found");
    }

    const data: ProductResponse = await response.json();
    return data.products;
  } catch (error) {
    console.log("getAllProducts error:", error);
    return null;
  }
}


export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[] | null> {
  try {
    const url = `https://dummyjson.com/products/category/${encodeURIComponent(
      categorySlug,
    )}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Products not found");
    }

    const data: ProductResponse = await response.json();
    return data.products;
  } catch (error) {
    console.log("getProductsByCategory error:", error);
    return null;
  }
}


export async function getSingleProduct(
  id: string,
): Promise<Product | null> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/${id}`,
    );

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.log("getSingleProduct error:", error);
    return null;
  }
}


export type ProductCreateInput = {
  title: string;
  description: string;
  price: number;
  category: string;
  images?: string[]; // ✅ optional array of image URLs
};

export async function createProduct(data: ProductCreateInput) {
  try {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create product");

    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}


