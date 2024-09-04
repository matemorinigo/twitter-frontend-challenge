import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { useTranslation } from "react-i18next";
import { User } from "../../service";
import { ButtonType } from "../../components/button/StyledButton";
import { useHttpRequestService } from "../../service/HttpRequestService";
import Button from "../../components/button/Button";
import ProfileFeed from "../../components/feed/ProfileFeed";
import { StyledContainer } from "../../components/common/Container";
import { StyledH5 } from "../../components/common/text";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ProfilePage = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [following, setFollowing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalValues, setModalValues] = useState({
    text: "",
    title: "",
    type: ButtonType.DEFAULT,
    buttonText: "",
  });
  const service = useHttpRequestService()
  const [user, setUser] = useState<User>()

  const id = useParams().id;
  const navigate = useNavigate();

  const { t } = useTranslation();
  const queryClient = useQueryClient()


  const followMutation = useMutation({
    mutationKey: ["follow", id],
    mutationFn: ({ id }: { id: string }) => service.followUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following"]
      })
      setFollowing(true)
    }
  })

  const unfollowMutation = useMutation({
    mutationKey: ["unfollow", id],
    mutationFn: ({ id }: { id: string }) => service.unfollowUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following"]
      })
      setFollowing(false)
      setShowModal(false);
      getProfileData();
    }
  })

  const deleteProfileMutation = useMutation({
    mutationKey: ["deleteProfile"],
    mutationFn: () => service.deleteProfile(),
    onSuccess: () => {
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  })

  const userQuery = useQuery({
    queryKey: ["me"],
    queryFn: () => service.me()
  })

  const profileDataQuery = useQuery({
    queryKey: ["profile", id],
    queryFn: () => id && service.getProfile(id)
  })

  const profileViewQuery = useQuery({
    queryKey: ["profileView", id],
    queryFn: () => id && service.getProfileView(id)
  })

  useEffect(() => {
    if (userQuery.status === 'success') {
      setUser(userQuery.data)
    }
  }, [userQuery.status, userQuery.data]);

  const handleButtonType = (): { component: ButtonType; text: string } => {
    if (profile?.id === user?.id)
      return { component: ButtonType.DELETE, text: t("buttons.delete") };
    if (following)
      return { component: ButtonType.OUTLINED, text: t("buttons.unfollow") };
    else return { component: ButtonType.FOLLOW, text: t("buttons.follow") };
  };

  const handleSubmit = () => {
    if (profile?.id === user?.id) {
      deleteProfileMutation.mutate();
    } else {
      unfollowMutation.mutate({ id: profile!.id });
      
      service.unfollowUser(profile!.id).then(async () => {
        setFollowing(false);
        setShowModal(false);
        await getProfileData();
      });
    }
  };

  useEffect(() => {
    if (profileDataQuery.status === 'success') {
      setProfile(profileDataQuery.data)
      setFollowing(
        profileDataQuery.data
          ? profileDataQuery.data?.followers.some((follower: User) => follower.id === user?.id)
          : false
      );
    }
  }, [id, profileDataQuery.status, profileDataQuery.data]);

  if (!id) return null;

  const handleButtonAction = async () => {
    if (profile?.id === user?.id) {
      setShowModal(true);
      setModalValues({
        title: t("modal-title.delete-account"),
        text: t("modal-content.delete-account"),
        type: ButtonType.DELETE,
        buttonText: t("buttons.delete"),
      });
    } else {
      if (following) {
        setShowModal(true);
        setModalValues({
          text: t("modal-content.unfollow"),
          title: `${t("modal-title.unfollow")} @${profile?.username}?`,
          type: ButtonType.FOLLOW,
          buttonText: t("buttons.unfollow"),
        });
      } else {
        followMutation.mutate({ id: profile!.id });
        setProfile(profileDataQuery.data)
      }
      return await getProfileData();
    }
  };

  const getProfileData = async () => {
    if (profileDataQuery.status === 'success') {

      setProfile(profileDataQuery.data)
      setFollowing(profileDataQuery.data ?
        profileDataQuery.data.followers.some((follower: User) => follower.id === user?.id)
        :
        false)
    } else {
      setProfile(profileViewQuery.data)
      setFollowing(false)
    }
    setProfile(profileDataQuery.data)
    setFollowing(profileDataQuery.data ?
      profileDataQuery.data.followers.some((follower: User) => follower.id === user?.id)
      :
      false)

  };

  return (
    <>
      <StyledContainer
        maxHeight={"100vh"}
        borderRight={"1px solid #ebeef0"}
        maxWidth={'600px'}
      >
        {profile && (
          <>
            <StyledContainer
              borderBottom={"1px solid #ebeef0"}
              maxHeight={"212px"}
              padding={"16px"}
            >
              <StyledContainer
                alignItems={"center"}
                padding={"24px 0 0 0"}
                flexDirection={"row"}
              >
                <ProfileInfo
                  name={profile!.name!}
                  username={profile!.username}
                  profilePicture={profile!.profilePicture}
                />
                <Button
                  buttonType={handleButtonType().component}
                  size={"100px"}
                  onClick={handleButtonAction}
                  text={handleButtonType().text}
                />
              </StyledContainer>
            </StyledContainer>
            <StyledContainer width={"100%"}>
              {profile.private ? (
                <ProfileFeed />
              ) : (
                <StyledH5>Private account</StyledH5>
              )}
            </StyledContainer>
            <Modal
              show={showModal}
              text={modalValues.text}
              title={modalValues.title}
              acceptButton={
                <Button
                  buttonType={modalValues.type}
                  text={modalValues.buttonText}
                  size={"MEDIUM"}
                  onClick={handleSubmit}
                />
              }
              onClose={() => {
                setShowModal(false);
              }}
            />
          </>
        )}
      </StyledContainer>
    </>
  );
};

export default ProfilePage;
