import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";
import { useInView } from "react-intersection-observer";

const ContentFeed = () => {
  const { posts, loading, fetchNextPage, hasNextPage, fetching } = useGetFeed();
  const {ref, inView} = useInView();
  
  return <Feed posts={posts} loading={loading||fetching} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} ref={ref} inView={inView} />;
};
export default ContentFeed;
