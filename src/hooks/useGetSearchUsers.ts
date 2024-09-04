import { useEffect, useState } from "react";
import { Author } from "../service";
import { useHttpRequestService } from "../service/HttpRequestService";
import { LIMIT } from "../util/Constants";
import { useQuery } from "@tanstack/react-query";

interface UseGetRecommendationsProps {
  query: string;
  skip: number;
}
export const useGetSearchUsers = ({
  query,
  skip,
}: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const service = useHttpRequestService();

  const searchUserQuery = useQuery({
    queryKey: ["searchUser", query],
    queryFn: () => service.searchUsers(query, LIMIT, skip),
  })

  useEffect(() => {
    setUsers([]);
  }, [query]);

  useEffect(() => {
    try {

      const updatedUsers = [...users, ...searchUserQuery.data];
      setUsers(
        updatedUsers
          .filter((user, index) => {
            const currentIndex = updatedUsers.findIndex(
              (u) => u.id === user.id
            );
            return currentIndex === index;
          })
          .filter((user) => user.username.includes(query))
      );

      setHasMore(searchUserQuery.data.length > 0);
    } catch (e) {
      console.log(e);
    }
  }, [searchUserQuery.status, searchUserQuery.data, query, skip]);

  return { users, loading:searchUserQuery.isLoading, error: searchUserQuery.error, hasMore };
};
