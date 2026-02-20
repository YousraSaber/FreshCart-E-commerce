import z from 'zod';

export const loginSchema = z.object({
    email : z.email().nonempty("this field can not be empty"),
    password : z.string().nonempty("this field can not be empty"),
    })

export type loginSchemaType = z.infer<typeof loginSchema>