import {useState} from "react";
import {StyledTweetContainer} from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import type {Post } from "../../service";
import {StyledReactionsContainer} from "./ReactionsContainer";
import Reaction from "./reaction/Reaction";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {IconType} from "../icon/Icon";
import {StyledContainer} from "../common/Container";
import ThreeDots from "../common/ThreeDots";
import DeletePostModal from "./delete-post-modal/DeletePostModal";
import ImageContainer from "./tweet-image/ImageContainer";
import CommentModal from "../comment/comment-modal/CommentModal";
import {useNavigate} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface TweetProps {
  post: Post;
}

const Tweet = ({post}: TweetProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const service = useHttpRequestService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["me"],
    queryFn: () => service.me()
  })

  const postQuery = useQuery({
    queryKey: ["post", post.id],
    queryFn: (): Promise<Post> => service.getPostById(post.id)
  })

  const deleteReactionMutation = useMutation({
    mutationKey: ["deleteReaction"],
    mutationFn: ({id, type}: {id: string, type: string}) => service.deleteReaction(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", post.id]
      });
    } 
  })

  const createReactionMutation = useMutation({
    mutationKey: ["createReaction"],
    mutationFn: ({id, type}: {id: string, type: string}) => service.createReaction(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", post.id]
      }); 
    } 
  })

  if(!post.reactions || !post.comments)
    return null

  const getCountByType = (type: string): number => {
    return postQuery.data ? postQuery.data.reactions.filter((r) => r.type === type).length ?? 0 : 0;
  };

  const handleReaction = async (type: string) => {
    if(postQuery.status === "success"){
      const reacted = postQuery.data.reactions.find(
          (r) => r.type === type && r.userId === userQuery.data?.id
      );
      
      if (reacted) {
        deleteReactionMutation.mutate({id: postQuery.data.id, type});
      } else {
        createReactionMutation.mutate({id: postQuery.data.id, type});
      }

    }
    
  };

  const hasReactedByType = (type: string): boolean => {
    
    return postQuery.data ? postQuery.data.reactions.some(
        (r) => r.type === type && r.userId === userQuery.data?.id
    ) : false;
  };


  return (
      <StyledTweetContainer>
        <StyledContainer
            style={{width: "100%"}}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            maxHeight={"48px"}
        >
          <AuthorData
              id={post.author.id}
              name={post.author.name ?? "Name"}
              username={post.author.username}
              createdAt={post.createdAt}
              profilePicture={post.author.profilePicture}
          />
          {post.authorId === userQuery.data?.id && (
              <>
                <DeletePostModal
                    show={showDeleteModal}
                    id={post.id}
                    onClose={() => {
                      setShowDeleteModal(false);
                    }}
                />
                <ThreeDots
                    onClick={() => {
                      setShowDeleteModal(!showDeleteModal);
                    }}
                />
              </>
          )}
        </StyledContainer>
        <StyledContainer onClick={() => navigate(`/post/${post.id}`)}>
          <p>{post.content}</p>
        </StyledContainer>
        {post.images && post.images!.length > 0 && (
            <StyledContainer padding={"0 0 0 10%"}>
              <ImageContainer images={post.images}/>
            </StyledContainer>
        )}
        <StyledReactionsContainer>
          <Reaction
              img={IconType.CHAT}
              count={postQuery.data ? postQuery.data.comments.length : 0}
              reactionFunction={() =>
                  window.innerWidth > 600
                      ? setShowCommentModal(true)
                      : navigate(`/compose/comment/${post.id}`)
              }
              increment={0}
              reacted={false}
          />
          <Reaction
              img={IconType.RETWEET}
              count={getCountByType("RETWEET")}
              reactionFunction={() => handleReaction("RETWEET")}
              increment={1}
              reacted={hasReactedByType("RETWEET")}
          />
          <Reaction
              img={IconType.LIKE}
              count={getCountByType("LIKE")}
              reactionFunction={() => handleReaction("LIKE")}
              increment={1}
              reacted={hasReactedByType("LIKE")}
          />
        </StyledReactionsContainer>
        <CommentModal
            show={showCommentModal}
            post={post}
            onClose={() => setShowCommentModal(false)}
        />
      </StyledTweetContainer>
  );
};

export default Tweet;
