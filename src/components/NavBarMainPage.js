import { React, useState, useMemo, useEffect, useCallback } from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  searchMovies,
  searchShows,
  fetchAllMoviesAllPages,
  fetchAllTVShowsAllPages,
  fetchMovieGenres,
  fetchTVGenres,
} from "../api/tmdbService";
import debounce from "lodash.debounce";
import SearchedCard from "./SearchedCard";
import FilterFormMain from "./FilterFormMain";

const NavBarMainPage = ({ onSelectType, selected }) => {
  // const [selected, setSelected] = useState("shows");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [allFilms, setAllFilms] = useState([]);
  const [allShows, setAllShows] = useState([]);

  useEffect(() => {
    fetchAllMoviesAllPages().then(setAllFilms).catch(console.error);
    fetchAllTVShowsAllPages().then(setAllShows).catch(console.error);
  }, []);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    Promise.all([fetchMovieGenres(), fetchTVGenres()])
      .then(([movieGenres, tvGenres]) => {
        const m = {};
        movieGenres.forEach((g) => (m[g.id] = g.name.toLowerCase()));
        tvGenres.forEach((g) => (m[g.id] = g.name.toLowerCase()));
        setGenreMap(m);
      })
      .catch(console.error);
  }, []);

  const doSearch = useMemo(
    () =>
      debounce(async (term, p = 1) => {
        if (!term.trim()) {
          setSearchResults([]);
          return;
        }
        const data =
          selected === "films"
            ? await searchMovies(term, p)
            : await searchShows(term, p);

        const typedResults = data.results.map((item) => ({
          ...item,
          type: selected === "films" ? "films" : "shows",
          genres: (item.genre_ids || [])
            .map((id) => genreMap[id])
            .filter(Boolean),
        }));

        setTotalPages(data.total_pages);
        setPage(p);
        setSearchResults((prev) =>
          p === 1 ? typedResults : [...prev, ...typedResults]
        );
      }, 300),
    [selected, genreMap]
  );

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    doSearch(searchTerm, 1);
    return () => doSearch.cancel();
  }, [searchTerm, doSearch]);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      if (scrollTop + clientHeight >= scrollHeight - 5 && page < totalPages) {
        doSearch(searchTerm, page + 1);
      }
    },
    [searchTerm, page, totalPages, doSearch]
  );

  const availableGenres = useMemo(() => {
    const items = selected === "films" ? allFilms : allShows;
    const all = items.flatMap((item) =>
      Array.isArray(item.genres) ? item.genres.map((g) => g.toLowerCase()) : []
    );
    return [...new Set(all)].sort();
  }, [allFilms, allShows, selected]);

  const filteredResults = useMemo(() => {
    if (!selectedGenres.length) return searchResults;
    return searchResults.filter((item) => {
      const itemGenres = Array.isArray(item.genres)
        ? item.genres.map((g) => g.toLowerCase())
        : [];
      return selectedGenres.every((g) => itemGenres.includes(g));
    });
  }, [searchResults, selectedGenres]);

  useEffect(() => {
    if (searchTerm && filteredResults.length < 2 && page < totalPages) {
      doSearch(searchTerm, page + 1);
    }
  }, [filteredResults.length, searchTerm, page, totalPages, doSearch]);

  const handleSelect = (type) => {
    // setSelected(type);
    onSelectType(type);
  };
  return (
    <>
      <div className="navbar-biggest-container">
        <FilterFormMain
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          selectedGenres={selectedGenres}
          toggleGenre={toggleGenre}
          allGenres={availableGenres}
        />
        <div className="navbar-container">
          <div
            className="navbar-item"
            onClick={() => {
              setFiltersOpen((open) => !open);
            }}
          >
            <img
              className="filter-icon"
              src="/filter-icon.svg"
              alt="Filter icon"
            ></img>
            <p className="navbar-text">Filter</p>
          </div>
          <Link to="/profile">
          <div
            className="navbar-item"
          >
            
              <img src="/heart-btn.svg" alt="Favourite icon"></img>
              <p className="navbar-text">Favourite</p>
            
            
            
          </div>
              </Link>
          <div className="navbar-search-container">
            <div className="navbar-search">
              <img src="/search-icon.svg" alt="Search Icon"></img>
              <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (!filtersOpen) setFiltersOpen(true);
                }}
              />
              {searchTerm && (
                <ul className="search-dropdown" onScroll={handleScroll}>
                  {filteredResults.map((m) => (
                    <SearchedCard filmId={m.id} type={m.type} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {localStorage.getItem("user") && (
          <Link to="/profile" className="profile-icon-container">
            <img src="/profile-icon.svg" alt="Profile Icon" />
          </Link>
        )}
      </div>
      <div className="series-films-slider">
        <div
          className={`slider-indicator ${
            selected === "shows" ? "left" : "right"
          }`}
        />
        <div className="series-container" onClick={() => handleSelect("shows")}>
          <p>shows</p>
        </div>
        <div className="films-container" onClick={() => handleSelect("films")}>
          <p>films</p>
        </div>
      </div>
    </>
  );
};

export default NavBarMainPage;
