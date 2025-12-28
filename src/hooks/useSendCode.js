import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function useSendCode() {
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState([]);

    const sendCodeMutation = useMutation({
        mutationFn: async (values) => {
            return await axiosInstance.post("/Auth/Account/SendCode", values);
        },

        onSuccess: (_, values) => {
            localStorage.setItem("resetEmail", values.email);
            navigate("/resetPassword");
        },

        onError: (err) => {
            const data = err.response?.data;

            if (data?.errors) {
                const messages = Object.values(data.errors).flat();
                setServerErrors(messages);
            } else if (data?.message) {
                setServerErrors([data.message]);
            } else {
                setServerErrors(["Failed to send code. Please try again."]);
            }
        },
    });

    return { sendCodeMutation, serverErrors };
}
