import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useQuery } from "@tanstack/react-query";


export const useGetFeed = () => {
  const query = useAppSelector((state) => state.user.query);

  
  const dispatch = useAppDispatch();
  
  const service = useHttpRequestService();
  
  const postsQuery = useQuery({
    queryKey: ["posts", query],
    queryFn: () => service.getPosts(query)
  })

  useEffect(() => {
    if(postsQuery.status === "success"){
      dispatch(updateFeed(postsQuery.data));
      dispatch(setLength(postsQuery.data.length));
    }

  }, [postsQuery.status, postsQuery.data]);

  return { posts: postsQuery.data, loading: postsQuery.isLoading, error: postsQuery.error };
};
