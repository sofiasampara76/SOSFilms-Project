import React from "react";
import "../styles/FilmsSlider.css";

const FilmsSlider = ({ backgroundUrl }) => {
  return (
    <section className="films-slider-container">
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
      <div
        className="popular-now-bg"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
    </section>
  );
};

export default FilmsSlider;
