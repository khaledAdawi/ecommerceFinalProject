import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";


export function useCategories (){

    const fetchCategories = async () => {
        const response = await axiosInstance.get('/Categories');
        return response.data.response;
    }

    const query = useQuery({
        queryKey: ['categories'],
        staleTime:5 * 60 * 1000,
        queryFn: fetchCategories
    });

    return query;
}