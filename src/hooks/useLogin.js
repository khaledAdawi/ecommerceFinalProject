import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

export default function useLogin() {
    const navigate = useNavigate();
    const { setToken, setAccessToken } = useContext(AuthContext);
    const [serverErrors, setServerErrors] = useState([]);

    const loginMutation = useMutation({
        mutationFn: async (values) => {
            return axiosInstance.post(`/Auth/Account/Login`, values);
        },
        onSuccess: (response) => {
            const token = response.data.accessToken;
            setToken(token);
            setAccessToken(token);
            navigate("/home");
        },
        onError: (err) => {
            const data = err.response?.data;
            if (data?.errors) {
                setServerErrors(Object.values(data.errors).flat());
            } else if (data?.message) {
                setServerErrors([data.message]);
            } else {
                setServerErrors(["Login failed. Please try again."]);
            }
        },
    });

    return { loginMutation, serverErrors };
}
