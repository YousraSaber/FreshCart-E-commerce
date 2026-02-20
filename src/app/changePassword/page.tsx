"use client";
import React from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getMyToken } from "@/utilities/getMyToken";
import { changePasswordSchema, changePasswordSchemaType } from "@/schema/ChangePassword.schema";
import { signOut } from "next-auth/react";

export default function ChangePassword() {
    const router = useRouter();

    const form = useForm<changePasswordSchemaType>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(changePasswordSchema),
    });

    const { handleSubmit } = form;

    async function handleLogin(values: changePasswordSchemaType) {

        const myToken = await getMyToken();
        if (!myToken) throw new Error("you should logged in first!");

        axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, {
            headers: {
                token: myToken
            }
        })
            .then(async (res) => {
                console.log(res)
                if (res.data.message == "success") {
                    toast.success("Your password changed successfully", {
                        duration: 7000,
                        position: "top-center",
                    });

                    await signOut({ callbackUrl: "/login" });
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    duration: 3000,
                    position: "top-center",
                });

            });
    }

    return (
        <>
            <div className="w-[80%] lg:w-[50%] mx-auto my-5">
                <h2 className="text-3xl font-bold text-center text-green-800">
                    Change Password!
                </h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <FieldGroup className="mb-3">
                        <Controller
                            name="currentPassword" //name input => default values
                            control={form.control} // link to "form" we make it ^
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel
                                        className={fieldState.invalid ? "text-red-600" : ""}
                                    >
                                        Currunt Password:
                                    </FieldLabel>
                                    <Input
                                        {...field} //instead of "{...register}"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        type="password"
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
                            name="password" //name input => default values
                            control={form.control} // link to "form" we make it ^
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel
                                        className={fieldState.invalid ? "text-red-600" : ""}
                                    >
                                        New Password:
                                    </FieldLabel>
                                    <Input
                                        {...field} //instead of "{...register}"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        type="password"
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
                            name="rePassword" //name input => default values
                            control={form.control} // link to "form" we make it ^
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel
                                        className={fieldState.invalid ? "text-red-600" : ""}
                                    >
                                        Re-Password:
                                    </FieldLabel>
                                    <Input
                                        {...field} //instead of "{...register}"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        type="password"
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

                    <Button className="bg-green-600 hover:bg-green-800 w-full my-2 cursor-pointer">
                        Change
                    </Button>
                </form>
            </div>
        </>
    );
}
