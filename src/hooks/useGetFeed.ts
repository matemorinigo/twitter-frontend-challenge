import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Post } from "../service";


export const useGetFeed = () => {
  const query = useAppSelector((state) => state.user.query);

  const [feed, setFeed] = useState<Post[]>([]);
  
  const dispatch = useAppDispatch();
  
  const service = useHttpRequestService();
  
  const {data, fetchNextPage, hasNextPage, isLoading, isFetching, isError} = useInfiniteQuery({
    queryKey: ["infinitePosts", query],
    initialPageParam: undefined,
    queryFn: ({pageParam}: {pageParam: string|undefined}): Promise<{data: Post[], nextCursor: string|undefined}> => service.getPosts(query, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  useEffect(() => {
    if(data) {
      setFeed(data ? data.pages.reduce<Post[]>((acc, page) => [...acc, ...page.data], []): []) ;
      dispatch(updateFeed(feed));
      dispatch(setLength(feed.length));
    }
  }, [data, isFetching, isLoading]);

  return { posts: feed, loading: isLoading, error: isError, fetchNextPage, hasNextPage, fetching: isFetching };
};
