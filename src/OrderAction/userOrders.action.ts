"use server";
import { getMyToken } from "@/utilities/getMyToken";
import { getUserId } from "@/utilities/getUserId";

export async function getUserOrders() {
    try {
        const myToken = await getMyToken();
        const userId = await getUserId();
        console.log("userId:", userId);

        if (!myToken) throw new Error("you should logged in first!");
        if (!userId) throw new Error("User not logged in");

        const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
            {
                headers: {
                    token: myToken,
                },
            }
        );
        const payload = await res.json();
        return payload;
    } catch (error) {
        return error;
    }
}

