import React, { useState, useEffect } from "react";
import "../styles/MainSlider.css";
import "../styles/NavBar.css";
import PosterCard from "./PosterCard";
import FilterForm from "./FilterForm";
import {
  fetchAllMoviesAllPages,
  fetchAllTVShowsAllPages,
} from "../api/tmdbService";

const MainSlider = ({ onSelectType }) => {
  const [selected, setSelected] = useState("movies");
  const [centerIndex, setCenterIndex] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [films, setFilms] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
  fetchAllMoviesAllPages()
    .then((data) => {
      console.log("fetchAllMoviesAllPages data:", data);
      setFilms(data);
    })
    .catch((err) => {
      console.error("Error fetching all movies:", err);
      setFilms([]);
    });

  fetchAllTVShowsAllPages()
    .then((data) => {
      console.log("fetchAllTVShowsAllPages data:", data);
      setShows(data);
    })
    .catch((err) => {
      console.error("Error fetching all shows:", err);
      setShows([]);
    });
}, []);


  const handleSelect = (type) => {
    setSelected(type);
    setCenterIndex(0);
    onSelectType(type);
  };

  const items = selected === "movies" ? films : shows;
  const length = items.length;

  if (length === 0) {
    return <div>Loading {selected}…</div>;
  }

  const backgroundUrlk = items[centerIndex]?.poster;

  const prev = () => {
    setCenterIndex((ci) => (ci - 1 + length) % length);
  };
  const next = () => {
    setCenterIndex((ci) => (ci + 1) % length);
  };
  const getClassName = (i) => {
    if (i === centerIndex) return "film center";
    if (i === (centerIndex - 1 + length) % length) return "film left";
    if (i === (centerIndex + 1) % length) return "film right";
    return "film hidden";
  };

  return (
    <section className="films-slider-container">
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo" />

      <div
        className="popular-now-bg"
        style={{ backgroundImage: `url(${backgroundUrlk})` }}
      />

      <div className="navbar-slider">
        <FilterForm filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen} />

        <div className="series-films-slider-sliding">
          <div className={`slider-indicator-sliding ${selected}`} />

          <div
            onClick={() => handleSelect("movies")}
            className="films-container"
          >
            <p>films</p>
          </div>
          <div
            onClick={() => handleSelect("shows")}
            className="series-container"
          >
            <p>shows</p>
          </div>
        </div>
      </div>

      <div className="cards-slider">
        <button className="arrow left-arrow" onClick={prev}>
          ‹
        </button>
        <div className="films">
          {items.map((item, idx) => (
            <PosterCard
              key={item.id || idx}
              filmInfo={item}
              isCenter={idx === centerIndex}
              className={getClassName(idx)}
              filmType={onSelectType}
            />
          ))}
        </div>
        <button className="arrow right-arrow" onClick={next}>
          ›
        </button>
      </div>
    </section>
  );
};

export default MainSlider;
