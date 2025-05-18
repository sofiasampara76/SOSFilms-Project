import { React, useState, useMemo, useEffect, useCallback } from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../api/tmdbService";
import debounce from "lodash.debounce";

const NavBarMainPage = ({ onSelectType, selected }) => {
  // const [selected, setSelected] = useState("shows");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage]                   = useState(1);
  const [totalPages, setTotalPages]       = useState(1);

  // const navigate = useNavigate();

  const doSearch = useMemo(() => debounce(async (term, p=1) => {
    if (!term.trim()) return;
    try {
      const { results, total_pages } = await searchMovies(term, p);
      setTotalPages(total_pages);
      setPage(p);
      setSearchResults(prev => p === 1 ? results : [...prev, ...results]);
    } catch (e) {
      console.error(e);
    }
  }, 300), []);

  // const debouncedSearch = useMemo(
  //   () =>
  //     debounce(async (term) => {
  //       if (!term.trim()) return setSearchResults([]);
  //       try {
  //         const { results } = await searchMovies(term, 1);
  //         setSearchResults(results.slice(0, 5));
  //       } catch (e) {
  //         console.error(e);
  //         setSearchResults([]);
  //       }
  //     }, 300),
  //   []
  // );

    useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    doSearch(searchTerm, 1);
    return () => doSearch.cancel();
  }, [searchTerm, doSearch]);

  // useEffect(() => {
  //   debouncedSearch(searchTerm);
  //   // очистка при unmount або перед новим викликом
  //   return () => debouncedSearch.cancel();
  // }, [searchTerm, debouncedSearch]);

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
      <img
        className="filter-icon"
        src="/filter-icon.svg"
        alt="Filter icon"
      ></img>
      <p className="navbar-text">Filter</p>

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
                    <span
                      key={m.id}
                      className="search-item"
                      onClick={() => {
                        // navigate(`/movie/${m.id}`);
                        setSearchTerm("");
                        setSearchResults([]);
                      }}
                    >
                      {m.title}
                    </span>
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
