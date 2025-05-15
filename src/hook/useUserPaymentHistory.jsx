import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "../js/api-instance";


const useUserPaymentHistory = () => {
    const {data,isPending,refetch} = useQuery({
        queryKey:['payment-history'],
        queryFn: async()=>{
            const result = await ApiInstance.get('/payment-history')
            return result.data
        }
    })
    return {data,isPending,refetch}
};

export default useUserPaymentHistory;