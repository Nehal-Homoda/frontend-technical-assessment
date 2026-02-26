"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  removeProductItem,
  dataFromLocalStorage,
} from "@/store/productCart/productCartSlice";
import { Product } from "@/app/_interfaces/products.interface";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function AppNavbar() {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data: isAuthenticated } = useSession();

  const cartItems = useSelector(
    (state: RootState) => state.productCart.cartItems,
  );
  const cartItemsQuantity = useSelector(
    (state: RootState) => state.productCart.cartItemsQuantity,
  );
  const cartItemsCount = useSelector(
    (state: RootState) => state.productCart.cartItemsCount,
  );

  const toggleDrawer = () => setDrawer(!drawer);

  const removeItem = (item: Product) => {
    dispatch(removeProductItem(item));
  };
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
  };

  useEffect(() => {
    dispatch(dataFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      <nav className="sticky bg-background z-50 top-0 shadow-md">
        <div className="mx-auto px-4 max-w-350">
          <div className="flex items-center justify-between py-5">
            <Link
              href="/"
              className="text-primary font-bold text-lg md:text-2xl italic"
            >
              Brand
            </Link>

            <div className="flex items-center space-x-5">
              <Link
                href="/"
                className="font-semibold text-muted hover:text-primary transition"
              >
                Products
              </Link>
             

              {isAuthenticated ? (
                <>
                  

                  <button
                    onClick={handleLogout}
                    className="font-semibold text-muted hover:text-primary transition"
                  >
                    Logout
                  </button>

                  <DropdownMenu open={drawer} onOpenChange={setDrawer}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative p-2">
                        <i className="fa-solid fa-cart-plus text-xl"></i>
                        {cartItemsCount ? (
                          <span className="absolute -top-1 -right-1 rounded-full bg-primary text-white w-5 h-5 text-xs flex items-center justify-center font-bold">
                            {cartItemsCount}
                          </span>
                        ) : null}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      side="right"
                      align="end"
                      className="fixed top-0 right-0 w-[320px] md:w-96 h-screen bg-white shadow-2xl overflow-auto rounded-l-lg p-0 z-[99] flex flex-col"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b">
                        <div>
                          <span className="font-bold text-2xl text-primary">
                            Cart
                          </span>
                          <span className="text-sm text-muted ms-2">
                            {cartItemsCount} item{cartItemsCount > 1 ? "s" : ""}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          className="text-xl p-1"
                          onClick={() => setDrawer(false)}
                        >
                          <span className="mdi mdi-close"></span>
                        </Button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {cartItems.length ? (
                          cartItems.map((item, index) => (
                            <div
                              key={item.id}
                              className="grid grid-cols-5 gap-2 p-2 border rounded-md hover:bg-gray-50 transition"
                            >
                              <div className="col-span-1 h-16 w-full flex overflow-x-auto space-x-1 scroll-snap-x mandatory">
                                {item.images?.map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt={`${item.title} - ${idx + 1}`}
                                    className="w-16 h-16 object-contain rounded-md shrink-0 scroll-snap-center transition-transform duration-200 hover:scale-110"
                                  />
                                ))}
                              </div>

                              <div className="col-span-4 flex flex-col justify-between">
                                <p className="text-sm font-medium truncate">
                                  {item.title}
                                </p>
                                <div className="flex justify-between items-center text-xs mt-1">
                                  <span className="font-bold">
                                    ${item.price}
                                  </span>
                                  <span className="font-bold">
                                    x{cartItemsQuantity[index]}
                                  </span>
                                </div>
                                <button
                                  onClick={() => removeItem(item)}
                                  className="text-xs text-red-500 hover:text-red-700 mt-1 self-start transition"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-sm text-muted">
                            Cart is empty
                          </div>
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {" "}
                  <Link
                    href="/register"
                    className="font-semibold text-muted hover:text-primary transition"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="font-semibold text-muted hover:text-primary transition"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
