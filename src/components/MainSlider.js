import React, { useState, useEffect, useMemo } from "react";
import "../styles/MainSlider.css";
import "../styles/NavBar.css";
import Slider from "./Slider";
import PosterCard from "./PosterCard";
import FilterForm from "./FilterForm";
import { Link } from "react-router-dom";
import { fetchAllMoviesAllPages } from "../api/tmdbService";
import { fetchAllTVShowsAllPages } from "../api/tmdbService";

const MainSlider = ({ backgroundUrl, onSelectType }) => {
  const [selected, setSelected] = useState("films");
  const [centerIndex, setCenterIndex] = useState(1);
  const [filtersOpen, setfiltersOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const [films, setFilms] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchAllMoviesAllPages().then((d) => setFilms(d)),
      fetchAllTVShowsAllPages().then((d) => setShows(d)),
    ])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAllMoviesAllPages()
      .then((data) => setFilms(data))
      .catch((err) => {
        console.error("Error fetching all movies:", err);
        setFilms([]);
      });
    fetchAllTVShowsAllPages()
      .then((data) => setShows(data))
      .catch((err) => {
        console.error("Error fetching all shows:", err);
        setShows([]);
      });
  }, []);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  useEffect(() => {
    setCenterIndex(0);
  }, [selected, selectedGenres]);

  const handleSelect = (type) => {
    setSelected(type);
    onSelectType(type);
  };

  const items = selected === "films" ? films : shows;

  const availableGenres = useMemo(() => {
    const all = items.flatMap((item) =>
      Array.isArray(item.genres) ? item.genres.map((g) => g.toLowerCase()) : []
    );
    return [...new Set(all)].sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!selectedGenres.length) return items;
    return items.filter((item) => {
      const itemGenres = Array.isArray(item.genres)
        ? item.genres.map((g) => g.toLowerCase())
        : [];
      return selectedGenres.every((g) => itemGenres.includes(g));
    });
  }, [items, selectedGenres]);

  const length = filteredItems.length;

  const prev = () => {
    if (length === 0) return;
    setCenterIndex((ci) => (ci - 1 + length) % length);
  };

  const next = () => {
    if (length === 0) return;
    setCenterIndex((ci) => (ci + 1) % length);
  };

  const getClassName = (index) => {
    if (index === centerIndex) return "film center";
    if (index === (centerIndex - 1 + length) % length) return "film left";
    if (index === (centerIndex + 1) % length) return "film right";
    return "film hidden";
  };

  if (loading) {
    return <div>Loading {selected}…</div>;
  }

  const backgroundUrlk = filteredItems[centerIndex]?.poster;

  return (
    <section className="films-slider-container">
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
      <div
        className="popular-now-bg"
        style={{ backgroundImage: `url(${backgroundUrlk})` }}
      />
      <div className="navbar-slider">
        <FilterForm
          filtersOpen={filtersOpen}
          setFiltersOpen={setfiltersOpen}
          selectedGenres={selectedGenres}
          toggleGenre={toggleGenre}
          allGenres={availableGenres}
        />
        <div
          className="navbar-item"
          onClick={() => setfiltersOpen(!filtersOpen)}
        >
          <img
            className="filter-icon"
            src="/filter-icon.svg"
            alt="Filter icon"
          ></img>
          <p className="navbar-text">Filter</p>
        </div>
        <div className="series-films-slider-sliding">
          <div
            className={`slider-indicator-sliding ${
              selected === "shows" ? "left" : "right"
            }`}
          />
          <div
            className="series-container"
            onClick={() => handleSelect("shows")}
          >
            <p>shows</p>
          </div>
          <div
            className="films-container"
            onClick={() => handleSelect("films")}
          >
            <p>films</p>
          </div>
        </div>
      </div>
      <div className="cards-slider">
      {filteredItems.length === 0 ? (
        <p className="no-results">No {selected} match those filters.</p>
      ) : (
        <>
          <button type="button" className="arrow left-arrow" onClick={prev}>
            <img src="left-arrow.svg" alt="Left Arrow" />
          </button>

          <div className="films">
            {filteredItems.map((film, idx) => (
              <PosterCard
                key={idx}
                filmInfo={film}
                isCenter={idx === centerIndex}
                className={getClassName(idx)}
                filmType={selected}
              />
            ))}
          </div>

          <button type="button" className="arrow right-arrow" onClick={next}>
            <img src="right-arrow.svg" alt="Right Arrow" />
          </button>
        </>
      )}
    </div>
    </section>
  );
};

export default MainSlider;
