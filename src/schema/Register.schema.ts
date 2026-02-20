import z from 'zod';

export const registerSchema = z.object({
    name : z.string().nonempty("this field can not be empty").min(2 , "mon length is 2 characters").max(15,"max length is 15 character"),
    email : z.email().nonempty("this field can not be empty"),
    password : z.string().min(6 ,"at least 6 characters").nonempty("this field can not be empty"),
    rePassword : z.string().nonempty("this field can not be empty"),
    phone : z.string().regex(/^01[0125][0-9]{8}$/ , "must be egyptian number")
}).refine((obj)=>{
    return obj.password === obj.rePassword;
}, {
    error :"password and rePassword not match.",
    path :["rePassword"]
})

export type registerSchemaType = z.infer<typeof registerSchema>