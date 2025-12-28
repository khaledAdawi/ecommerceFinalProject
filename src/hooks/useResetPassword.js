import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function useResetPassword() {
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState([]);

    const resetPasswordMutation = useMutation({
        mutationFn: async ({ email, code, newPassword }) => {
            return await axiosInstance.patch("/Auth/Account/ResetPassword", { email, code, newPassword,});
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Password Reset Successful",
                text: "You can now login with your new password",
                confirmButtonText: "Go to Login",
                didOpen: () => {
                    const swalContainer = document.querySelector(".swal2-container");
                    if (swalContainer) swalContainer.style.zIndex = 20000;
                },
            }).then(() => {
                localStorage.removeItem("resetEmail");
                navigate("/login");
            });
        },
        onError: (err) => {
            const data = err.response?.data;

            if (data?.errors) {
                const messages = Object.values(data.errors).flat();
                setServerErrors(messages);
            } else if (data?.message) {
                setServerErrors([data.message]);
            } else {
                setServerErrors(["Reset password failed. Please try again."]);
            }
        },
    });

    return { resetPasswordMutation, serverErrors };
}
