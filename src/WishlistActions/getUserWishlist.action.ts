"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function getUserWishlist() {
    try {
        const myToken = await getMyToken();

        if (!myToken) throw new Error("you must logged in first!");

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            method: "GET",
            headers: {
                token: myToken,
                "content-type": "application/json",
            },
        });

        const payload = res.json();
        return payload;
        
    } catch (error) {
        return error
    }
}
