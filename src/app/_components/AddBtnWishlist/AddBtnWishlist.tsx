"use client";

import { WishlistContext } from "@/Context/WishlistContext";
import { addToWishlist } from "@/WishlistActions/addToWishlist.action";
import { removeWishlistItem } from "@/WishlistActions/removeWishlistItem.action";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddBtnWishlist({ id }: { id: string }) {
    const {
        wishlistProducts,
        setWishlistProducts,
        numberOfWishlistItems,
        setNumberOfWishlistItems,
        refreshWishlist
    } = useContext(WishlistContext)!;

    const isInWishlist = wishlistProducts.some(
        (product) => product.id === id
    );


    const [loading, setLoading] = useState(false);

    async function toggleWishlist() {
        if (loading) return;
        setLoading(true);

        if (!isInWishlist) {
            const res = await addToWishlist(id);

            if (res.status === "success") {
                await refreshWishlist();
                toast.success("Added to wishlist ❤️" , {
                    position : "top-center",
                });
            }
        } else {
            const res = await removeWishlistItem(id);

            if (res.status === "success") {
                await refreshWishlist();
                toast.success("Removed from wishlist 💔" , {
                    position :"top-center"
                });
            }
        }

        setLoading(false);
    }


    return (
        <button
            onClick={toggleWishlist}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300
        ${isInWishlist
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "border border-gray-300 text-gray-500 hover:bg-red-50 hover:text-red-500"
                }`}>
            <i className={`${isInWishlist ? "fa-solid" : "fa-regular"} fa-heart text-md`} ></i>
        </button>
    );
}
