import * as yup from "yup";


export const singupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches( /^\d{11}$/, "Phone must be 11 digits"),
})
export const singInSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches( /^\d{11}$/, "Phone must be 11 digits"),
})