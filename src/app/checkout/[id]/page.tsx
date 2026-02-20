"use client";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { checkoutSchema, checkoutSchemaType } from "@/schema/Checkout.schema";
import { checkPayment } from "@/CheckoutActions/checkout.action";
import { checkCash } from "@/CheckoutActions/checkoutCash.action";
import { CartContext } from "@/Context/CartContext";
import { removeCart } from "@/CartActions/removeCart.action";

export default function Checkout() {

    const { id }: { id: string } = useParams()
    const router = useRouter();
    const { numberOfItems, setNumberOfItems, products, setProducts } = useContext(CartContext)!;


    const form = useForm<checkoutSchemaType>({
        defaultValues: {
            details: "",
            phone: "",
            city: ""
        },
        resolver: zodResolver(checkoutSchema),
    });

    const { handleSubmit } = form;

    async function handleCheckout(values: checkoutSchemaType) {
        const res = await checkPayment(id, values)
        console.log(res)
        if (res.status == "success") {
            router.push(res.session.url)
        }
    }

    async function handleCheckoutCash(values: checkoutSchemaType) {
        const res = await checkCash(id, values);

        if (res.status === "success") {
            console.log(res)
            const res2 = await removeCart();

            if (res2.status === "success") {
                setProducts([]);
                setNumberOfItems(0);
            }
            router.push(`/allorders`);
        }
    }


    return (
        <>
            <div className="w-[80%] lg:w-[50%] mx-auto my-5">
                <h2 className="text-3xl font-bold text-center text-green-800">
                    Checkout Now!
                </h2>
                <form >
                    <FieldGroup className="mb-3">
                        <Controller
                            name="details" //name input => default values
                            control={form.control} // link to "form" we make it ^
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel
                                        className={fieldState.invalid ? "text-red-600" : ""}
                                    >
                                        Details:
                                    </FieldLabel>
                                    <Input
                                        {...field} //instead of "{...register}"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="on"
                                        type="text"
                                        className={
                                            fieldState.invalid ? "border border-red-600" : ""
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                            className="text-red-600"
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <FieldGroup className="mb-3">
                        <Controller
                            name="phone" //name input => default values
                            control={form.control} // link to "form" we make it ^
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel
                                        className={fieldState.invalid ? "text-red-600" : ""}
                                    >
                                        Phone:
                                    </FieldLabel>
                                    <Input
                                        {...field} //instead of "{...register}"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="on"
                                        type="tel"
                                        className={
                                            fieldState.invalid ? "border border-red-600" : ""
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                            className="text-red-600"
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <FieldGroup className="mb-3">
                        <Controller
                            name="city" //name input => default values
                            control={form.control} // link to "form" we make it ^
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel
                                        className={fieldState.invalid ? "text-red-600" : ""}
                                    >
                                        City:
                                    </FieldLabel>
                                    <Input
                                        {...field} //instead of "{...register}"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="on"
                                        type="text"
                                        className={
                                            fieldState.invalid ? "border border-red-600" : ""
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                            className="text-red-600"
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <div className="flex gap-1 justify-between">
                        <Button onClick={handleSubmit(handleCheckout)} className="bg-green-600 hover:bg-green-800 w-[50%] my-2 cursor-pointer">
                            Pay with Card
                        </Button>
                        <Button onClick={handleSubmit(handleCheckoutCash)} className="bg-yellow-600 hover:bg-yellow-800 w-[50%] my-2 cursor-pointer">
                            Order with Cash
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
