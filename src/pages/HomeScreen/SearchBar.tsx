import React, { useContext } from "react";
import styled from "styled-components";
import { HomePageContext } from "../../context/HomePage/HomePageContext";

const SForm = styled.form`
  display: flex;
  padding-left: 4rem;
  margin-top: 3rem;
`;

const SInput = styled.input`
  width: 600px;
  height: 40px;
  border-radius: 20px;
  text-indent: 6px;
  font-size: 16px;
`;

const SSubmitButton = styled.button`
  position: relative;
  right: 60px;
  cursor: pointer;
  background-color: fuchsia;
  height: 45px;
  border-radius: 20px;
`;

const SSubmitButtonPara = styled.p`
  margin: 0;
  padding: 0;
  color: white;
`;

const SearchBar: React.FC<{}> = ({}) => {
  const { state: HomePageState, dispatch: HomePageDispatch } = useContext(HomePageContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    HomePageDispatch({
      type: "set submittedSearch string",
      submittedSearch: HomePageState.searchText,
    });
    if (HomePageState.prevSubmittedSearch !== HomePageState.submittedSearch) {
      HomePageDispatch({ type: "set currentPage number", currentPage: 1 });
      HomePageDispatch({ type: "set searchedSectionCount number", searchedSectionCount: 1 });
      HomePageDispatch({
        type: "set prevSubmittedSearch string",
        prevSubmittedSearch: HomePageState.submittedSearch,
      });
    }
    HomePageDispatch({ type: "change submitSearch bool", submitSearch: true });
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    HomePageDispatch({ type: "set searchText string", searchText: e.currentTarget.value });
    console.log(`HomePageState.searchText is ${HomePageState.searchText}`);
  };

  return (
    <>
      <SForm onSubmit={handleSubmit}>
        <SInput placeholder="Search movies" onChange={handleChange} />
        <SSubmitButton type="submit">
          <SSubmitButtonPara>Search</SSubmitButtonPara>
        </SSubmitButton>
      </SForm>
    </>
  );
};

export default SearchBar;
