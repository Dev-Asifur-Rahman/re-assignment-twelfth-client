import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "../js/api-instance";


const useTopThreeCamps = () => {
    const {data=[],refetch,isPending} = useQuery({
        queryKey:['top-camps'],
        queryFn: async()=>{
            const response = await ApiInstance.get("/top-rated-camps")
            return response.data
        }
    })
    return {data,isPending,refetch}
};

export default useTopThreeCamps;