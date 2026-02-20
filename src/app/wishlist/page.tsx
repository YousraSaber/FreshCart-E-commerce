"use client";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { WishlistContext } from "@/Context/WishlistContext";
import { Wishlist2 } from "@/types/wishlist";
import { getUserWishlist } from "@/WishlistActions/getUserWishlist.action";
import { removeWishlistItem } from "@/WishlistActions/removeWishlistItem.action";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Wishlist() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [disableFlag, setDisableFlag] = useState(false);
    const { numberOfWishlistItems, setNumberOfWishlistItems } = useContext(WishlistContext)!;
    const { setWishlistProducts } = useContext(WishlistContext)!;

    async function getUserWishlistProducts() {
        const res = await getUserWishlist();
        console.log(res.data)
        if (res.status == "success") {
            setProducts(res.data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }
    async function removeProductFromWishlist(id: string) {
        setDisableFlag(true);

        const res = await removeWishlistItem(id);

        if (res.status === "success") {
            toast.success("Product removed successfully.", {
                duration: 2000,
                position: "top-center",
            });

            setProducts((prev) => prev.filter((p: Wishlist2) => p.id !== id));
            setWishlistProducts((prev) => prev.filter((p) => p.id !== id));
            setNumberOfWishlistItems((prev) => prev - 1);
            setDisableFlag(false);

        } else {
            toast.error("Product cannot be removed now.", {
                duration: 2000,
                position: "top-center",
            });
            setDisableFlag(false);
        }
    }




    useEffect(() => {
        function flag() {
            getUserWishlistProducts();
        }
        flag()
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex min-h-screen items-center justify-center">
                    <Empty className="w-full">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Spinner className="size-16 text-green-800" />
                            </EmptyMedia>
                            <EmptyDescription className="text-md font-semibold">
                                Just a moment...
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </div>
            ) : products.length > 0 ? (
                <div className="mx-auto w-[95%] lg:w-[85%] mt-14">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                                My <span className="text-green-600">Wishlist</span>
                            </h2>

                            <p className="mt-2 text-sm md:text-base text-gray-500">
                                You have{" "}
                                <span className="font-semibold text-gray-800">
                                    {numberOfWishlistItems}
                                </span>{" "}
                                saved item{numberOfWishlistItems !== 1 && "s"}
                            </p>
                        </div>

                    </div>

                    {/* Products */}
                    <div className="space-y-8">
                        {products.map((prod: Wishlist2) => (
                            <div
                                key={prod.id}
                                className="group flex flex-col lg:flex-row justify-between items-center bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 "
                            >
                                {/* Product Info */}
                                <div className="flex items-center gap-8 w-full lg:w-auto">
                                    <div className="relative">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={prod.imageCover}
                                            className="w-28 h-28 object-cover rounded-2xl shadow-md group-hover:scale-105 transition-all duration-500"
                                            alt="product image"
                                        />
                                        <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {prod.title}
                                        </h3>

                                        <p className="text-green-600 text-lg font-bold mt-3">
                                            {prod.price} EGP
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col lg:flex-row items-center gap-6 mt-6 lg:mt-0">

                                    {/* Remove Button */}
                                    <button
                                        disabled={disableFlag}
                                        onClick={() => removeProductFromWishlist(prod.id)}
                                        className="disabled:text-white disabled:bg-gray-700 px-6 py-2 text-sm font-medium rounded-xl border border-red-400 disabled:border-gray-400 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex w-3/4 mt-12 h-75 mx-auto items-center justify-center rounded-2xl">
                    <Empty className="w-full">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <i className="fa-solid fa-circle-exclamation text-5xl text-green-600"></i>
                            </EmptyMedia>
                            <EmptyDescription className="text-md font-semibold">
                                No Products In Your Wishlist.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </div>
            )}
        </>
    );
}
