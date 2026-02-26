"use client";

import React, { ReactNode, useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  children?: ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  responsive?: boolean;
};

export default function MySwiper({
  children,
  slidesPerView = 1,
  spaceBetween = 20,
  autoplay = false,
  showPagination = true,
  showNavigation = true,
  responsive = false,
}: Props) {
  const defaultBreakpoints = {
    320: { slidesPerView: 1.2, spaceBetween: 10 },
    480: { slidesPerView: 2.2, spaceBetween: 12 },
    640: { slidesPerView: 2.5, spaceBetween: 15 },
    768: { slidesPerView: 3.5, spaceBetween: 18 },
    1024: { slidesPerView: 4.5, spaceBetween: 20 },
    1280: {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
    },
  };
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [navigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    if (showNavigation) {
      setNavigationReady(true);
    }
  }, [showNavigation]);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={true}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        navigation={
          showNavigation && navigationReady
            ? ({
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              } as any)
            : false
        }
        pagination={showPagination ? { clickable: true } : false}
        breakpoints={
          responsive
            ? defaultBreakpoints
            : undefined
        }
        className="w-full"
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <button
            ref={prevRef}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 bg-primary-light-800 text-primary w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 hover:bg-primary hover:text-white transition"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 bg-primary-light-800 text-primary w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 hover:bg-primary hover:text-white transition"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </>
      )}
    </div>
  );
}
