"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function addToWishlist(id: string) {
    try {
        const myToken = await getMyToken();
        if (!myToken) throw new Error("you should logged in first!");

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            method: "POST",
            headers: {
                token: myToken,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                productId: id,
            }),
        });
        const payload = await res.json();
        return payload;
    } catch (error) {
        return error;
    }
}
