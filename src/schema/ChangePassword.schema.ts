import z from 'zod';

export const changePasswordSchema = z.object({
    currentPassword : z.string(),
    password : z.string().min(6 ,"at least 6 characters").nonempty("this field can not be empty"),
    rePassword : z.string().nonempty("this field can not be empty"),
}).refine((obj)=>{
    return obj.password === obj.rePassword;
}, {
    error :"password and rePassword not match.",
    path :["rePassword"]
})

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>