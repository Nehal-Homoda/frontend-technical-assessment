"use client";

import { Category, Product } from "@/app/_interfaces/products.interface";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import MySwiper from "../Base/MySwiper";
import SortDropdown from "./SortDropDown";
import { getProductsByCategory } from "@/app/_services/products.service";
import { useRouter } from "next/navigation";

type Props = {
  categories: Category[];
};

type SortType = "TITLE" | "TO_LOW" | "TO_HIGH" | "";

export default function ProductListing({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortType>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].slug);
    }
  }, [categories]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      setLoading(true);
      const data = await getProductsByCategory(selectedCategory);
      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  const displayProducts = useMemo(() => {
    let sorted = [...products];

    if (sortBy === "TITLE") {
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "TO_LOW") {
      return sorted.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "TO_HIGH") {
      return sorted.sort((a, b) => a.price - b.price);
    }

    return sorted;
  }, [products, sortBy]);

  const Spinner = () => (
    <div className="h-60 flex justify-center items-center">
      <i className="fa-solid fa-spinner fa-spin fa-3x text-primary"></i>
    </div>
  );

  return (
    <div>
      <div className="flex gap-3">
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />

        <button onClick={() => router.push("/products/add")} className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition">
          + Add Product
        </button>
      </div>

      <div className="mb-6 mt-4">
        <MySwiper
          slidesPerView={2}
          spaceBetween={10}
          showNavigation
          showPagination={false}
          responsive
        >
          {categories.map((category) => (
            <div
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`capitalize whitespace-nowrap text-center text-xs sm:text-sm md:text-base lg:text-lg font-bold px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 hover:text-primary ${
                category.slug === selectedCategory
                  ? "text-primary bg-primary-light-50"
                  : "text-muted"
              }`}
            >
              {category.name}
            </div>
          ))}
        </MySwiper>
      </div>

      {loading ? (
        <Spinner />
      ) : displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
          {displayProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">No products found.</p>
      )}
    </div>
  );
}
