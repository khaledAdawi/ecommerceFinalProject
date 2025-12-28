import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function useRegister() {

    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState([]);

    const registerMutation = useMutation({
        mutationFn: async (values) => {
            return await axiosInstance.post(`/Auth/Account/Register`, values);
        },
        onSuccess: () => {
            navigate('/login');
        },
        onError: (err) => {
            const data = err.response?.data;
            if (data?.errors) {
                const messages = Object.values(data.errors).flat();
                setServerErrors(messages);
            } else if (data?.message) {
                setServerErrors([data.message]);
            } else {
                setServerErrors(['Register failed. Please try again.']);
            }
        }
    })

    return { serverErrors, registerMutation };
}