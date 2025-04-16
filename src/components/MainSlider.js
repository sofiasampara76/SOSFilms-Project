import React, { useState } from "react";
import "../styles/MainSlider.css";
import "../styles/NavBar.css";
import Slider from "./Slider";
import PosterCard from "./PosterCard";
import FilterForm from "./FilterForm";

let films = [
  {
    title: "Rick & Morty",
    poster: "/rick-and-morty.jpg",
    genres: ["comedy", "horror"],
  },
  {
    title: "3 body problem",
    poster: "/3-body-problem.jpg",
    genres: ["comedy", "horror", "sien-fiction", "love"],
  },
  {
    title: "The white lotus",
    poster: "/white-lotus.jpg",
    genres: ["comedy", "horror"],
  },
  {
    title: "Rick & Morty",
    poster: "/rick-and-morty.jpg",
    genres: ["comedy", "horror"],
  },
  {
    title: "Rick & Morty",
    poster: "/rick-and-morty.jpg",
    genres: ["comedy", "horror"],
  },
];

const MainSlider = ({ backgroundUrl, onSelectType }) => {
  const [selected, setSelected] = useState("shows");

  const handleSelect = (type) => {
    setSelected(type);
    onSelectType(type);
  };

  const [centerIndex, setCenterIndex] = useState(1);

  const prev = () => {
    setCenterIndex((centerIndex - 1 + films.length) % films.length);
  };

  const next = () => {
    setCenterIndex((centerIndex + 1) % films.length);
  };

  const getClassName = (index) => {
    if (index === centerIndex) return "film center";
    if (index === (centerIndex - 1 + films.length) % films.length)
      return "film left";
    if (index === (centerIndex + 1) % films.length) return "film right";
    return "film hidden";
  };

  const backgroundUrlk = films[centerIndex].poster;

  const [filtersOpen, setfiltersOpen] = useState(false);

  return (
    <section className="films-slider-container">
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
      <div
        className="popular-now-bg"
        style={{ backgroundImage: `url(${backgroundUrlk})` }}
      />
      <div className="navbar-slider">
        <FilterForm filtersOpen={ filtersOpen }/>
        <div className="navbar-item" onClick={() => setfiltersOpen(!filtersOpen)}>
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
      {/* <Slider /> */}
      <div className="cards-slider">
        <button className="arrow left-arrow" onClick={prev}>
          <img src="left-arrow.svg" alt="Left Arrow"></img>
        </button>
        <div className="films">
          {films.map((film, index) => (
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
