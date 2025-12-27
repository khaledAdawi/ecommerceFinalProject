import * as yup from 'yup'

export const RegisterSchema = yup.object({
    fullName: yup.string().required("FullName Is Required"),
    email: yup.string().email("Invalid Email Format").required("Email Is Required"),
    userName: yup.string().matches(/^[a-zA-Z0-9._-]+$/, "Invalid UserName")
        .min(4, "UserName Must Be At Least 4 Characters").required("UserName Is Required"),
    phoneNumber: yup.string().required("PhoneNumber Is Required"),
    password: yup.string().required("Password Is Required")
        .min(8, "Password Must Be At Least 8 Characters")
        .matches(/[A-Z]/, "Must Contain At Least One UpperCase Letter")
        .matches(/[a-z]/, "Must Contain At Least One LowerCase Letter")
        .matches(/\d/, "Must Contain At Least One Number")
        .matches(/[@#$&!?~]/, "Must Contain At Least One Special Characters"),

});