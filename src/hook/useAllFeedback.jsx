import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ApiInstance } from '../js/api-instance';

const useAllFeedback = () => {
    const {data=[],isPending,refetch} = useQuery({
        queryKey:['all-feedback'],
        queryFn: async()=>{
            const response = await ApiInstance.get('/feedbacks')
            return response.data
        }
    })
    return {data,isPending,refetch}
};

export default useAllFeedback;