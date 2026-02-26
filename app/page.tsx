import React from "react";
import { Category, ProductResponse } from "@/app/_interfaces/products.interface";
import ProductsListing from "@/app/_components/Product/ProductListing";
import { getAllProducts } from "./_services/products.service";
import { getAllCategories } from "./_services/categories.service";

export default async function Home() {
  const productList = await getAllProducts();
  const categoryList = await getAllCategories();

  return (
    <>
      <div className="container pt-10 pb-20">
        <ProductsListing
          categories={categoryList || []}
          products={productList || []}
        />
      </div>
    </>
  );
}
