"use client"
import { addProductItem } from "@/store/productCart/productCartSlice";
import { AppDispatch } from "@/store/store";
import { Product } from "@/app/_interfaces/products.interface";
import { useDispatch } from "react-redux";


type Props= {
    product: Product
}

export default function AddToCardButton({product }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const addToCart = () => {
        dispatch(addProductItem(product));
    };
    return (
            <button
                onClick={() => addToCart()}
                className="text-primary rounded-full px-10 py-2 ring-1 ring-primary hover:bg-primary-light-800 transition-all duration-150 "
            >
                Add to Cart
                <i className="fa-solid fa-cart-plus ms-2 text-sm"></i>
            </button>
    );
}
