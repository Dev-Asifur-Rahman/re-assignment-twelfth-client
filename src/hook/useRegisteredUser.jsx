import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ApiInstance } from '../js/api-instance';

const useRegisteredUser = () => {
    const {data:registered_users=[],isPending,refetch} = useQuery({
        queryKey:["registered-users"],
        queryFn : async()=>{
            const response = await ApiInstance.get("registered-users")
            return response.data
        }
    })
    return {registered_users,isPending,refetch}
};

export default useRegisteredUser;