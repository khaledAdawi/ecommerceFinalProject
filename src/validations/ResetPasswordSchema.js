import * as yup from "yup";

export const ResetPasswordSchema = yup.object({
    code: yup.string().required("Code is required"),
    newPassword: yup.string().required("Password Is Required").min(8, "Password Must Be At Least 8 Characters")
            .matches(/[A-Z]/, "Must Contain At Least One UpperCase Letter")
            .matches(/[a-z]/, "Must Contain At Least One LowerCase Letter")
            .matches(/\d/, "Must Contain At Least One Number")
            .matches(/[@#$&!?~]/, "Must Contain At Least One Special Characters"),
});
