import z from 'zod';

export const checkoutSchema = z.object({
    details : z.string().nonempty("this field can not be empty"),
    phone : z.string().nonempty("this field can not be empty").regex(/^01[125][0-9]{8}$/ , "must be egyptian number!"),
    city : z.string().nonempty("this field can not be empty"),
    })

export type checkoutSchemaType = z.infer<typeof checkoutSchema>