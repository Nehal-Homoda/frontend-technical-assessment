"use client";

import { AppDispatch } from "@/store/store";
import { Product } from "@/app/_interfaces/products.interface";
import { useDispatch } from "react-redux";
import { addProductItem } from "@/store/productCart/productCartSlice";
import Link from "next/link";
import AddToCardButton from "./AddToCardButton";
import Image from "next/image";
import MySwiper from "../Base/MySwiper";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = () => {
    dispatch(addProductItem(product));
  };

  return (
    <div className="text-sm text-center rounded-lg shadow-md bg-white">
      <Link href={`/productDetails/${product.id}`}>
        <MySwiper
          slidesPerView={1}
          autoplay={false}
          showPagination={true}
          showNavigation={false}
        >
          {product.images?.map((img, index) => (
            <div
              key={index}
              className="w-full aspect-3/2 bg-gray-50 overflow-hidden rounded-t-lg"
            >
              <Image
                src={img}
                alt={`${product.title} - ${index + 1}`}
                fill
                className="object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </MySwiper>
      </Link>

      <div className="px-5 py-4 w-full">
        <Link href={`/productDetails/${product.id}`}>
          <p className="truncate font-semibold mb-2">{product.title}</p>
          <p className="mb-4 font-bold">${product.price}</p>
        </Link>

        <div className="flex justify-center">
          <AddToCardButton product={product} />
        </div>
      </div>
    </div>
  );
}
