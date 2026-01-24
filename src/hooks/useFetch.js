import React from 'react'
import axiosInstance from '../Api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export default function useFetch(queryKey, url) {
    const fetchData = async () => {
        const response = await axiosInstance.get(url);
        return response.data.response;
    }

    const query = useQuery({
        queryKey: [queryKey],
        staleTime: 5 * 60 * 1000,
        queryFn: fetchData
    });

    return query;
}
