import React, { useContext } from "react";
import styled from "styled-components";
import { HomePageContext } from "../../context/HomePage/HomePageContext";

const SForm = styled.form`
  display: flex;
  padding-left: 4rem;
  margin-top: 3rem;
`;

const SInput = styled.input`
  display: flex;
  width: 600px;
  height: 40px;
  border-radius: 20px;
  text-indent: 6px;
  font-size: 16px;
`;

const SSubmitButton = styled.button`
  position: relative;
  right: 60;
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

const SearchBar: React.FC<{
  setSubmitSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  submittedSearch: string;
  setSubmittedSearch: React.Dispatch<React.SetStateAction<string>>;
  prevSubmittedSearch: string;
  setPrevSubmittedSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchedSectionCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  setSubmitSearch,
  setSearchText,
  searchText,
  setSubmittedSearch,
  submittedSearch,
  prevSubmittedSearch,
  setPrevSubmittedSearch,
  setCurrentPage,
  setSearchedSectionCount,
}) => {
  const { state: HomePageState, dispatch: HomePageDispatch } = useContext(HomePageContext);
  return (
    <>
      <SForm
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedSearch(searchText);
          HomePageDispatch({
            type: "set submittedSearch string",
            submittedSearch: HomePageState.searchText,
          });
          if (HomePageState.prevSubmittedSearch !== HomePageState.submittedSearch) {
            setCurrentPage(1);
            setSearchedSectionCount(1);
            setPrevSubmittedSearch(submittedSearch);
            HomePageDispatch({ type: "set currentPage number", currentPage: 1 });
            HomePageDispatch({ type: "set searchedSectionCount number", searchedSectionCount: 1 });
            HomePageDispatch({
              type: "set prevSubmittedSearch string",
              prevSubmittedSearch: HomePageState.submittedSearch,
            });
          }
          setSubmitSearch(true);
          HomePageDispatch({ type: "change submitSearch bool", submitSearch: true });
        }}
      >
        <SInput
          placeholder="Search movies"
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
            HomePageDispatch({ type: "set searchText string", searchText: e.currentTarget.value });
            console.log(`HomePageState.searchText is ${HomePageState.searchText}`);
          }}
        />
        <SSubmitButton type="submit">
          <SSubmitButtonPara>Search</SSubmitButtonPara>
        </SSubmitButton>
      </SForm>
    </>
  );
};

export default SearchBar;
