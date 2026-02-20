"use client";
import { addToCart } from "@/CartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/Context/CartContext";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
    const { numberOfItems, setNumberOfItems } = useContext(CartContext)!;

    async function addProductToCart(id: string) {
        const res = await addToCart(id);
        console.log(res);

            if (res.status == "success") {
                toast.success(res.message, {
                    duration: 2000,
                    position: "top-center",
                });
                setNumberOfItems(numberOfItems + 1);
            } else {
                toast.success(res.message, {
                    duration: 2000,
                    position: "top-center",
                });
            }
        
    }
    return (
        <>
            <Button
                onClick={() => {
                    addProductToCart(id);
                }}
                className="bg-green-600 hover:bg-green-700 cursor-pointer"
            >
                Add To Cart
            </Button>
        </>
    );
}
