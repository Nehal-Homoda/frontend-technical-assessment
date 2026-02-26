import { Category } from "@/app/_interfaces/products.interface";

export async function getAllCategories(): Promise<Category[] | null> {
  try {
    const categoriesResponse = await fetch(
      "https://dummyjson.com/products/categories",
      {
        cache: "force-cache",
      },
    );
    if (!categoriesResponse.ok) {
      throw new Error("Categories  not found");
    }
    const data: Category[] = await categoriesResponse.json();
    return data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
