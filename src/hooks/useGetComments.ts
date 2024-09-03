import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useQuery } from "@tanstack/react-query";

interface UseGetCommentsProps {
  postId: string;
}

export const useGetComments = ({ postId }: UseGetCommentsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();

  const commentsQuery = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => service.getCommentsByPostId(postId)
  });

  useEffect(() => {
    if (commentsQuery.status === "success") {
      dispatch(updateFeed(commentsQuery.data));
      dispatch(setLength(commentsQuery.data.length));
    }
  }, [postId]);

  return { posts: commentsQuery.data, loading: commentsQuery.isLoading, error: commentsQuery.error };
};
