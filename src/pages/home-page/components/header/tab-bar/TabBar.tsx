import React, { useState } from "react";
import Tab from "./tab/Tab";
import { setQuery, updateFeed } from "../../../../../redux/user";
import { useHttpRequestService } from "../../../../../service/HttpRequestService";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { StyledTabBarContainer } from "./TabBarContainer";
import { useQuery } from "@tanstack/react-query";

const TabBar = () => {
  const [activeFirstPage, setActiveFirstPage] = useState(true);
  const dispatch = useAppDispatch();
  const service = useHttpRequestService();
  const { t } = useTranslation();
  const query = useAppSelector((state) => state.user.query);

  const getPostsQuery = useQuery({
    queryKey: ["posts", query],
    queryFn: () => service.getPosts(query)
  })

  const handleClick = async (value: boolean, query: string) => {
    setActiveFirstPage(value);
    dispatch(setQuery(query));
    if(getPostsQuery.status === "success"){
      dispatch(updateFeed(getPostsQuery.data));
    }
  };

  return (
    <>
      <StyledTabBarContainer>
        <Tab
          active={activeFirstPage}
          text={t("header.for-you")}
          onClick={() => handleClick(true, "")}
        />
        <Tab
          active={!activeFirstPage}
          text={t("header.following")}
          onClick={() => handleClick(false, "following")}
        />
      </StyledTabBarContainer>
    </>
  );
};

export default TabBar;
