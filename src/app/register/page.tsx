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
import { registerSchema, registerSchemaType } from "@/schema/Register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit } = form;

  function handleRegister(values: registerSchemaType) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        if (res.data.message == "success") {
          toast.success("you registered successfully", {
            duration: 3000,
            position: "top-center",
          });
          router.push("/login");
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
          Register Now!
        </h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <FieldGroup className="mb-3">
            <Controller
              name="name" //name input => default values
              control={form.control} // link to "form" we make it ^
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className={fieldState.invalid ? "text-red-600" : ""}
                  >
                    Name:
                  </FieldLabel>
                  <Input
                    {...field} //instead of "{...register}"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
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
          <FieldGroup className="mb-3">
            <Controller
              name="rePassword" //name input => default values
              control={form.control} // link to "form" we make it ^
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className={fieldState.invalid ? "text-red-600" : ""}
                  >
                    RePassword:
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
                    autoComplete="off"
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

          <Button className="bg-green-600 hover:bg-green-800 w-full my-2 cursor-pointer">
            Register
          </Button>
        </form>
      </div>
    </>
  );
}
