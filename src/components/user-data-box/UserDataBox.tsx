import React from "react";
import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.png";
import { useNavigate } from "react-router-dom";
import "./UserDataBox.css";
import { StyledUserDataBoxContainer } from "./StyledUserDataBoxContainer";
import { StyledUserInfoContainer } from "./StyledUserInfoContainer";
import { StyledUserDataBoxP } from "./StyledUserDataBoxP";

interface UserDataBoxProps {
  name?: string;
  username?: string;
  profilePicture?: string;
  id: string;
  onClick?: () => void;
}
export const UserDataBox = ({
  name,
  username,
  profilePicture,
  id,
  onClick,
}: UserDataBoxProps) => {
  const navigate = useNavigate();

  return (
    <StyledUserDataBoxContainer onClick={onClick}>
      <Avatar
        width={"48px"}
        height={"48px"}
        src={profilePicture ?? icon}
        onClick={() => onClick ?? navigate(`/profile/${id}`)}
        alt={name ?? "Name"}
      />
      <StyledUserInfoContainer>
        <StyledUserDataBoxP>{name ?? "Name"}</StyledUserDataBoxP>
        <StyledUserDataBoxP style={{ color: "#566370" }}>{"@" + username ?? "@Username"}</StyledUserDataBoxP>
      </StyledUserInfoContainer>
    </StyledUserDataBoxContainer>
  );
};

export default UserDataBox;
