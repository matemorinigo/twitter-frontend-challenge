import React, { useEffect, useState } from "react";
import FollowUserBox from "../../../../components/follow-user/FollowUserBox";
import { useHttpRequestService } from "../../../../service/HttpRequestService";
import { useTranslation } from "react-i18next";
import { User } from "../../../../service";
import { StyledSuggestionBoxContainer } from "./SuggestionBoxContainer";
import { useQuery } from "@tanstack/react-query";

const SuggestionBox = () => {
  const [users, setUsers] = useState<User[]>([]);
  const service = useHttpRequestService();
  const { t } = useTranslation();
  const recommendedUsersQuery = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: () => service.getRecommendedUsers(6, 0)
  })

  useEffect(() => {
    if(recommendedUsersQuery.status === "success"){
      setUsers(recommendedUsersQuery.data);
    }
  }, [recommendedUsersQuery.status, recommendedUsersQuery.data]);

  return (
    <StyledSuggestionBoxContainer>
      <h6>{t("suggestion.who-to-follow")}</h6>
      {users.length > 0 ? (
        users
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          })
          .slice(0, 5)
          .map((user) => (
            <FollowUserBox
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              profilePicture={user.profilePicture}
            />
          ))
      ) : (
        <p>{t("suggestion.no-recommendations")}</p>
      )}
      {users.length > 5 && (
        <a href="/recommendations">{t("suggestion.show-more")}</a>
      )}
    </StyledSuggestionBoxContainer>
  );
};

export default SuggestionBox;
