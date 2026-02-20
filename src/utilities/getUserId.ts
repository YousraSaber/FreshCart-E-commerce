"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserId(){
    const decodeToken = (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("__secure-next-auth.session-token")?.value

    if(!decodeToken) return null
    const token = await decode({token :decodeToken , secret : process.env.AUTH_SECRET!})
    
    console.log(token)

    return token?.sub;
}