import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";


export const useGetFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);
  const query = useAppSelector((state) => state.user.query);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await service.getPosts(query);

        dispatch(updateFeed(res));
        dispatch(setLength(res.length));
        setLoading(false);

      } catch (e) {
        setError(true);
        console.log(e);
      }
    }

    fetchPosts();


  }, [query]);

  return { posts, loading, error };
};
