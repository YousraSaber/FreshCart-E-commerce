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
// import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, loginSchemaType } from "@/schema/Login.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit } = form;

  async function handleLogin(values: loginSchemaType) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (res?.ok) {
      toast.success("you login successfully", {
        duration: 3000,
        position: "top-center",
      });

      router.push("/");
      router.refresh(); 
    }
    else {
      toast.error(res?.error, {
        duration: 3000,
        position: "top-center",
      });
    }
    // axios
    //   .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
    //   .then((res) => {
    //     if (res.data.message == "success") {
    //       toast.success("you login successfully", {
    //         duration: 3000,
    //         position: "top-center",

    //       });
    //       router.push("/");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message, {
    //       duration: 3000,
    //       position: "top-center",
    //     });

    //   });
  }

  return (
    <>
      <div className="w-[80%] lg:w-[50%] mx-auto my-5">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Login Now!
        </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <FieldGroup className="mb-3">
            <Controller
              name="email" //name input => default values
              control={form.control} // link to "form" we make it ^
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className={fieldState.invalid ? "text-red-600" : ""}
                  >
                    Email:
                  </FieldLabel>
                  <Input
                    {...field} //instead of "{...register}"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type="email"
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
                    Password:
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
            Login
          </Button>
          <div className="flex justify-center text-gray-500">
            <Link href={"#"} className="underline">Forget Your Password?</Link>
          </div>
        </form>
      </div>
    </>
  );
}
