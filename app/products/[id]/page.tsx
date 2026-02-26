import AddToCardButton from "@/app/_components/Product/AddToCardButton";
import React from "react";
import { getSingleProduct } from "@/app/_services/products.service";
import Image from "next/image";
import MySwiper from "@/app/_components/Base/MySwiper";
import BackButton from "@/app/_components/Base/BackButton";

type Props = {
  params: {
    id: string;
  };
};

export default async function SingleProductPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const product = await getSingleProduct(id);
  if (!product) {
    return (
      <div className="container py-20 text-center text-gray-500">
        Product not found.
      </div>
    );
  }
  return (
    <>
      <div className="pt-10 pb-20">
        <div className="container">
          <BackButton />

          <div className="grid gap-10 grid-cols-1 md:grid-cols-5">
            <div className="col-span-1 md:col-span-2">
              <MySwiper
                slidesPerView={1}
                autoplay={false}
                showPagination={true}
                showNavigation={true}
              >
                {product?.images?.map((img, index) => (
                  <div
                    key={index}
                    className="w-full aspect-4/3 bg-gray-50 overflow-hidden rounded-lg"
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
            </div>
            <div className="col-span-1 md:col-span-3">
              <p className="text-primary font-bold text-sm  uppercase">
                {product?.category}
              </p>
              <h3 className="text-2xl font-bold mb-3">{product?.title}</h3>
              <h3 className="text-2xl text-primary font-bold mb-10">
                ${product?.price}
              </h3>
              <p className="text-muted mb-10">{product?.description}</p>
              <AddToCardButton product={product}></AddToCardButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
