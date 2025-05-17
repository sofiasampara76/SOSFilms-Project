import React, { useState, useEffect } from "react";
import "../styles/MainSlider.css";
import "../styles/NavBar.css";
import Slider from "./Slider";
import PosterCard from "./PosterCard";
import FilterForm from "./FilterForm";
import { Link } from "react-router-dom";
import { fetchAllMoviesAllPages } from "../api/tmdbService";
import { fetchAllTVShowsAllPages } from "../api/tmdbService";

// let films = [
//   {
//     status: "to be determined",
//     officialPage: "https://ab3.army/",
//     releaseDate: "April 4",
//     rating: 4.5,
//     duration: "1h 41m",
//     description:
//       "Four misfits are pulled through a mysterious portal into a bizarre cubic world. To return home, they must master this strange dimension.",
//     languages: ["Ukrainian", "English", "Switzerland"],
//     title: "Rick & Morty",
//     poster: "/rick-and-morty.jpg",
//     genres: ["comedy", "horror"],
//   },
//   {
//     status: "to be determined",
//     officialPage: "https://ab3.army/",
//     releaseDate: "April 4",
//     rating: 4.5,
//     duration: "1h 41m",
//     description:
//       "Four misfits are pulled through a mysterious portal into a bizarre cubic world. To return home, they must master this strange dimension.",
//     languages: ["Ukrainian", "English", "Switzerland"],
//     title: "3 body problem",
//     poster: "/3-body-problem.jpg",
//     genres: ["comedy", "horror", "sien-fiction", "love"],
//   },
//   {
//     status: "to be determined",
//     officialPage: "https://ab3.army/",
//     releaseDate: "April 4",
//     rating: 4.5,
//     duration: "1h 41m",
//     description:
//       "Four misfits are pulled through a mysterious portal into a bizarre cubic world. To return home, they must master this strange dimension.",
//     languages: ["Ukrainian", "English", "Switzerland"],
//     title: "The white lotus",
//     poster: "/white-lotus.jpg",
//     genres: ["comedy", "horror"],
//   },
//   {
//     status: "to be determined",
//     officialPage: "https://ab3.army/",
//     releaseDate: "April 4",
//     rating: 4.5,
//     duration: "1h 41m",
//     description:
//       "Four misfits are pulled through a mysterious portal into a bizarre cubic world. To return home, they must master this strange dimension.",
//     languages: ["Ukrainian", "English", "Switzerland"],
//     title: "Rick & Morty",
//     poster: "/rick-and-morty.jpg",
//     genres: ["comedy", "horror"],
//   },
//   {
//     status: "to be determined",
//     officialPage: "https://ab3.army/",
//     releaseDate: "April 4",
//     rating: 4.5,
//     duration: "1h 41m",
//     description:
//       "Four misfits are pulled through a mysterious portal into a bizarre cubic world. To return home, they must master this strange dimension.",
//     languages: ["Ukrainian", "English", "Switzerland"],
//     title: "Rick & Morty",
//     poster: "/rick-and-morty.jpg",
//     genres: ["comedy", "horror"],
//   },
// ];

const MainSlider = ({ backgroundUrl, onSelectType }) => {
  const [selected, setSelected] = useState("films");
  const [centerIndex, setCenterIndex] = useState(1);
  const [filtersOpen, setfiltersOpen] = useState(false);

  const [films, setFilms] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchAllMoviesAllPages()
      .then(data => setFilms(data))
      .catch(err => {
        console.error("Error fetching all movies:", err);
        setFilms([]);
      });
    fetchAllTVShowsAllPages()
      .then(data => setShows(data))
      .catch(err => {
        console.error("Error fetching all shows:", err);
        setShows([]);
      });
  }, []);

  const handleSelect = (type) => {
    setSelected(type);
    setCenterIndex(0); 
    onSelectType(type);
  };

  const items = selected === "films" ? films : shows;
  const length = items.length;

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

  if (length === 0) {
    return <div>Loading {selected}…</div>;
  }

  const backgroundUrlk = items[centerIndex].poster;

  return (
    <section className="films-slider-container">
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
      <div
        className="popular-now-bg"
        style={{ backgroundImage: `url(${backgroundUrlk})` }}
      />
      <div className="navbar-slider">
        <FilterForm filtersOpen={filtersOpen} setFiltersOpen={setfiltersOpen}/>
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
            <p>series</p>
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
        <button className="arrow left-arrow" onClick={prev}>
          <img src="left-arrow.svg" alt="Left Arrow"></img>
        </button>
        <div className="films">
          {items.map((film, index) => (
            <PosterCard
              key={index}
              filmInfo={film}
              isCenter={index === centerIndex}
              className={getClassName(index)}
            />
          ))}
        </div>
        <button className="arrow right-arrow" onClick={next}>
          <img src="right-arrow.svg" alt="Right Arrow"></img>
        </button>
      </div>
    </section>
  );
};

export default MainSlider;
