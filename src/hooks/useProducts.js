import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";


export function useProducts (){

    const fetchProducts = async () => {
        const response = await axiosInstance.get('/Products');
        return response.data.response;
    }

    const query = useQuery({
        queryKey: ['products'],
        staleTime:5 * 60 * 1000,
        queryFn: fetchProducts
    });

    return query;
}