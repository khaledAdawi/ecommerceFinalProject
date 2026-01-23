import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axiosInstance";
import useAuthStore from "../store/useAuthStore";
import { jwtDecode } from "jwt-decode";


export default function useLogin() {
    const navigate = useNavigate();
    const setToken = useAuthStore((state)=>state.setToken);
    const setUser = useAuthStore((state)=>state.setUser);
    const [serverErrors, setServerErrors] = useState([]);

    const loginMutation = useMutation({
        mutationFn: async (values) => {
            return axiosInstance.post(`/Auth/Account/Login`, values);
        },
        onSuccess: (response) => {
            const token = response.data.accessToken;
            const decoded = jwtDecode(token);
            console.log(decoded);
            const user = {
                name:decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                role:decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            }
            setToken(token);
            setUser(user);
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
