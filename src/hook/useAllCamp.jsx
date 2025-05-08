import { useQuery } from '@tanstack/react-query';
import { ApiInstance } from '../js/api-instance';

const useAllCamp = () => {
    const {data:all_camps=[],isPending,refetch} = useQuery({
        queryKey:['camps'],
        queryFn: async()=>{
            const response = await ApiInstance.get("/camps")
            return response.data
        }
    })
    return {all_camps,isPending,refetch}
};

export default useAllCamp;