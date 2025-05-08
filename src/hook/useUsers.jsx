import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "../js/api-instance";

const useUsers = () => {
  const {
    data: users,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await ApiInstance.get("/users");
      return response.data;
    },
  });
  return {users, refetch, isPending};
};

export default useUsers;
