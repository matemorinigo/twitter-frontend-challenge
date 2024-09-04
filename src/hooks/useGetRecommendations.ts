import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { Author } from "../service";
import { useQuery } from "@tanstack/react-query";

interface UseGetRecommendationsProps {
  page: number;
}

export const useGetRecommendations = ({ page }: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [hasMore, setHasMore] = useState(true); // Nuevo estado para verificar si hay más elementos
  const service = useHttpRequestService();

  const recommendedUsersQuery = useQuery({
    queryKey: ["recommendedUsers", page],
    queryFn: () => service.getRecommendedUsers(10, page)
  })


  useEffect(() => {
    if (page !== undefined && hasMore) {
      if(recommendedUsersQuery.status === "success"){
        if(recommendedUsersQuery.data.length === 0){
          setHasMore(false);
        } else {
          setUsers((prev) => {
            const uniqueIds = new Set(prev.map((user) => user.id));
            const filteredUsers = recommendedUsersQuery.data.filter(
              (user: Author) => !uniqueIds.has(user.id)
            );
            return [...prev, ...filteredUsers];
          });
        }
      }
    }
  }, [page, hasMore, recommendedUsersQuery.status, recommendedUsersQuery.data]);

  return { users, loading: recommendedUsersQuery.isLoading, error: recommendedUsersQuery.isError };
};
