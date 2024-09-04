import React, { useEffect } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { updateFeed } from "../../redux/user";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSeuggestionContainer";
import { Post } from "../../service";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);
  const service = useHttpRequestService();
  const getPostsQuery = useQuery({
    queryKey: ["posts", query],
    queryFn: () => service.getPosts(query)
  })


  useEffect(() => {
    if(getPostsQuery.status === "success"){
      dispatch(updateFeed(getPostsQuery.data));
    } else if(getPostsQuery.status === "error"){
      navigate("/sign-in");
    }
  }, [getPostsQuery.status, getPostsQuery.data]);

  return (
    <>
      <ContentContainer />
      <StyledUserSuggestionContainer>
        <SearchBar />
        <SuggestionBox />
      </StyledUserSuggestionContainer>
    </>
  );
};

export default HomePage;
