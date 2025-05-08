import { useQuery } from '@tanstack/react-query';
import { ApiInstance } from '../js/api-instance';

const useCampDetails = (id) => {
    const {data:camp={},isLoading,refetch:campRefetch} = useQuery({
        queryKey:['camp-id',id],
        queryFn: async()=>{
            const response = await ApiInstance.get(`/camp/${id}`)
            return response.data
        }
    })
    return {camp,isLoading,campRefetch}
};

export default useCampDetails;