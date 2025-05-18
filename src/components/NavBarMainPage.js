import { React, useState, useMemo, useEffect, useCallback } from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { searchMovies, searchShows } from "../api/tmdbService";
import debounce from "lodash.debounce";
import SearchedCard from "./SearchedCard"

const NavBarMainPage = ({ onSelectType, selected }) => {
  // const [selected, setSelected] = useState("shows");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage]                   = useState(1);
  const [totalPages, setTotalPages]       = useState(1);

  // const navigate = useNavigate();

 const doSearch = useMemo(
    () =>
      debounce(async (term, p = 1) => {
        if (!term.trim()) return setSearchResults([]);
        try {
          const data =
            selected === "films"
              ? await searchMovies(term, p)
              : await searchShows(term, p);

          const typedResults = data.results.map((item) => ({
            ...item,
            type: selected === "films" ? "films" : "shows",
          }));

          setTotalPages(data.total_pages);
          setPage(p);
          setSearchResults((prev) =>
            p === 1 ? typedResults : [...prev, ...typedResults]
          );
        } catch (e) {
          console.error(e);
          setSearchResults([]);
        }
      }, 300),
    [selected]
  );


    useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    doSearch(searchTerm, 1);
    return () => doSearch.cancel();
  }, [searchTerm, doSearch]);

  const handleScroll = useCallback(e => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5
        && page < totalPages) {
      doSearch(searchTerm, page + 1);
    }
  }, [searchTerm, page, totalPages, doSearch]);

  const handleSelect = (type) => {
    // setSelected(type);
    onSelectType(type);
  };
  return (
    <>
      <div className="navbar-biggest-container">
        <div className="navbar-container">
          <div className="navbar-item" onClick={() => alert("Filter clicked")}>
            <img
              className="filter-icon"
              src="/filter-icon.svg"
              alt="Filter icon"
            ></img>
            <p className="navbar-text">Filter</p>
          </div>
          <div
            className="navbar-item"
            onClick={() => alert("Favourite clicked")}
          >
            <img src="/heart-btn.svg" alt="Favourite icon"></img>
            <p className="navbar-text">Favourite</p>
          </div>
          <div className="navbar-search-container">
            <div className="navbar-search">
              <img src="/search-icon.svg" alt="Search Icon"></img>
              <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && searchResults.length > 0 && (
                <ul className="search-dropdown" onScroll={handleScroll}>
                  
                  {searchResults.map((m) => (
                    <SearchedCard filmId={m.id} type={m.type} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div
          className="profile-icon-container"
          onClick={() => alert("Profile clicked")}
        >
          <img src="/profile-icon.svg" alt="Profile Icon"></img>
        </div>
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
