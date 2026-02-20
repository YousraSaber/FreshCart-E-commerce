"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function removeCart() {
    try {
        const myToken = await getMyToken()
        if (!myToken) throw new Error("you should logged in first!")

        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "DELETE",
            headers: {
                token: myToken,
                "content-type": "application/json"
            }
        })
        const payload = await res.json()
        return payload;
    } catch (error) {
        return error
    }
}