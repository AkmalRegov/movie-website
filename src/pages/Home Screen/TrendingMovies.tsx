import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../customHooks/useDebounce";
import MoviesMap from "./MoviesMap";
import SearchedMovies from "./SearchedMovies";

export type apiResponse = {
  page: string;
  results: movieData[];
  total_pages: number;
  total_results: number;
};

export type movieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

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
  return (
    <>
      <form
        style={{
          display: "flex",
          paddingLeft: "4rem",
          marginTop: "3rem",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedSearch(searchText);
          if (prevSubmittedSearch !== submittedSearch) {
            setCurrentPage(1);
            setSearchedSectionCount(1);
            setPrevSubmittedSearch(submittedSearch);
            console.log(`previous submitted search is: ${prevSubmittedSearch}`);
          }
          setSubmitSearch(true);
        }}
      >
        <input
          placeholder="Search movies"
          style={{
            display: "flex",
            width: "600px",
            height: "40px",
            borderRadius: "20px",
            textIndent: "6px",
            fontSize: "16px",
          }}
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
          }}
        />
        <button
          type="submit"
          style={{
            cursor: "pointer",
            borderRadius: "20px",
            height: "45px",
            position: "relative",
            right: 60,
            backgroundColor: "fuchsia",
          }}
        >
          <p style={{ margin: 0, padding: 0, color: "white" }}>Search</p>
        </button>
      </form>
    </>
  );
};

export const TrendingMovies: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<movieData[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<movieData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [prevSubmittedSearch, setPrevSubmittedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageForMovieSearched, setTotalPageForMovieSearched] = useState(0);
  const [submitSearch, setSubmitSearch] = useState(false);
  // const debouncedSearch = useDebounce(searchText, 2000);
  const [sectionCount, setSectionCount] = useState(1);
  const [searchedSectionCount, setSearchedSectionCount] = useState(1);
  const [maxSearchedSectionCount, setMaxSearchedSectionCount] = useState(1);
  const callOnce = useRef<boolean>(false);
  const apiURL = process.env.API_V3_URL;
  const myV3APIKey = process.env.MY_API_KEY;

  useEffect(() => {
    if (callOnce.current) return;
    fetch(encodeURI(`${apiURL}trending/movie/week?api_key=${myV3APIKey}`))
      .then((res) => res.json())
      .then((data: apiResponse) => {
        console.log(data);
        setTrendingMovies(data.results);
        console.log(`trendingMovies length is: ${trendingMovies.length}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
    callOnce.current = true;
  }, []);

  useEffect(() => {
    if (!submitSearch) return;
    else setSubmitSearch(false);
    fetch(
      encodeURI(
        `${apiURL}search/movie?api_key=${myV3APIKey}&language=en-US&query=${submittedSearch}&page=${currentPage}&include_adult=false`,
      ),
    )
      .then((res) => res.json())
      .then((data: apiResponse) => {
        console.log(data);
        setSearchedMovies(data.results);
        setMaxSearchedSectionCount(() => {
          var count = Math.floor(data.results.length / 4);
          console.log(`count is: ${count}`);
          var remainder = data.results.length % 4;
          if (remainder > 0) count += 1;
          return count;
        });
        console.log(`max section count is: ${maxSearchedSectionCount}`);
        setTotalPageForMovieSearched(data.total_pages);
        console.log(`searchedMovies length is: ${searchedMovies.length}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [submitSearch, setSubmitSearch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <p>Trending Movies</p>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h1 style={{ margin: 0 }}>I want to show trending movies here.</h1>
        </div>
        {trendingMovies.length !== 0 && (
          <MoviesMap
            movies={trendingMovies}
            sectionCount={sectionCount}
            setSectionCount={setSectionCount}
          />
        )}
        <SearchBar
          setSubmitSearch={setSubmitSearch}
          setSearchText={setSearchText}
          searchText={searchText}
          setSubmittedSearch={setSubmittedSearch}
          submittedSearch={submittedSearch}
          prevSubmittedSearch={prevSubmittedSearch}
          setPrevSubmittedSearch={setPrevSubmittedSearch}
          setCurrentPage={setCurrentPage}
          setSearchedSectionCount={setSearchedSectionCount}
        />
        {submitSearch && searchedMovies.length === 0 && (
          <p>No movies found for '{submittedSearch}'</p>
        )}
        {searchedMovies.length !== 0 && (
          <SearchedMovies
            searchedMovies={searchedMovies}
            searchedSectionCount={searchedSectionCount}
            setSearchedSectionCount={setSearchedSectionCount}
            maxSearchedSectionCount={maxSearchedSectionCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageForMovieSearched={totalPageForMovieSearched}
            setSubmitSearch={setSubmitSearch}
          />
        )}
      </div>
    </>
  );
};
