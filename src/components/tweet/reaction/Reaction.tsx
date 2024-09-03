import React, { useEffect, useState } from "react";
import { Icon, IconType } from "../../icon/Icon";
import { StyledReactionContainer } from "./ReactionContainer";
interface ReactionProps {
  img: IconType;
  count: number;
  reacted: boolean;
  reactionFunction: () => void;
  increment: number;
}
const Reaction = ({
  img,
  count,
  reacted,
  reactionFunction,
  increment,
}: ReactionProps) => {
  const [reactionCount, setReactionCount] = useState(count);
  const [reactionReacted, setReactionReacted] = useState(reacted);


  useEffect(() => {
    setReactionCount(count);
    setReactionReacted(reacted);
  },[reacted, count])

  const handleReaction = async () => {
    try {
      await reactionFunction();
      setReactionCount(
        reactionReacted ? reactionCount - increment : reactionCount + increment
      );
      setReactionReacted(!reactionReacted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledReactionContainer>
      {
        Icon({
          width: "16px",
          height: "16px",
          onClick: handleReaction,
          active: reactionReacted,
        })[img]
      }
      <p>{reactionCount}</p>
    </StyledReactionContainer>
  );
};

export default Reaction;
