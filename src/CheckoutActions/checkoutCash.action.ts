"use server";
import { checkoutSchemaType } from "@/schema/Checkout.schema";
import { getMyToken } from "@/utilities/getMyToken";

export async function checkCash(cartId: string, formValues :checkoutSchemaType) {
    try {
        const myToken = await getMyToken();
        if (!myToken) throw new Error("you should logged in first!");

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            method: "POST",
            headers: {
                token: myToken,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                shippingAddress : formValues
            }),
        });
        const payload = await res.json();
        return payload;
    } catch (error) {
        return error;
    }
}
