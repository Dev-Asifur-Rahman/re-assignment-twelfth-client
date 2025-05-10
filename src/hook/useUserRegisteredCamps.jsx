import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "../js/api-instance";

const useUserRegisteredCamps = (email) => {
  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["user-registered-camps", email],
    queryFn: async () => {
      const response = await ApiInstance.get(
        `/user-registered-camps?email=${email}`
      );
      return response.data;
    },
    enabled: !!email,
  });

  return { data, isPending, refetch };
};

export default useUserRegisteredCamps;
