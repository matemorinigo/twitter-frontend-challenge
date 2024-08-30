import React, {useEffect, useState} from "react";
import {StyledTweetContainer} from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import type {Post, User} from "../../service";
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

interface TweetProps {
  post: Post;
}

const Tweet = ({post}: TweetProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const service = useHttpRequestService();
  const [actualPost, setActualPost] = useState<Post>(post);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>()
  
  const fetchPost = async () => {
    service
      .getPostById(post.id)
      .then(async (res) => {
        const reactions = await service.getReactionsByPostId(res.id, "ALL")
        const comments = await service.getCommentsByPostId(res.id)
        setActualPost({
          ...res,
          reactions,
          comments
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    fetchPost()
    handleGetUser().then(r => setUser(r))
  }, [])

  useEffect(() => {
    fetchPost()
  }, [post])


  const handleGetUser = async () => {
    return await service.me()
  }

  if(!post.reactions || !post.comments)
    return null

  const getCountByType = (type: string): number => {
    return actualPost.reactions?.filter((r) => r.type === type).length ?? 0;
  };

  const handleReaction = async (type: string) => {
    const reacted = actualPost.reactions.find(
        (r) => r.type === type && r.userId === user?.id
    );
    if (reacted) {
      await service.deleteReaction(reacted.postId, type);
    } else {
      await service.createReaction(actualPost.id, type);
    }
    const newPost = await service.getPostById(post.id);
    setActualPost({
      ...newPost,
      reactions: await service.getReactionsByPostId(post.id, "ALL"),
      comments: await service.getCommentsByPostId(post.id)
    });
  };


  const hasReactedByType = (type: string): boolean => {
    return actualPost.reactions && actualPost.reactions.some(
        (r) => r.type === type && r.userId === user?.id
    );
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
          {post.authorId === user?.id && (
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
              count={actualPost?.comments?.length}
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
