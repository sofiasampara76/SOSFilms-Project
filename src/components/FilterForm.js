import React, { useState } from "react";
import "../styles/FilterForm.css";

let genres = [
  "horror",
  "comedy",
  "drama",
  "crime",
  "thriller",
  "action",
  "mystery",
  "sci-fi",
  "adventure",
  "romance",
  "animation",
  "history",
  "western",
  "sport",
  "biography",
];

const FilterForm = ({ filtersOpen, setFiltersOpen }) => {
  return (
    <div
      className="filter-form"
      style={{
        display: filtersOpen ? "flex" : "none"
      }}
    >
      <span className="genres-text">genres</span>
      <div className="genres-grid">
        {genres.map((genre, i) => (
          <div key={i} className="genre-pill">
            {genre}
          </div>
        ))}
      </div>
      <button
        className="close-filter-button"
        onClick={() => setFiltersOpen(false)}
      >
        <img src="/close-button.svg" alt="Closing filter form button"></img>
      </button>
    </div>
  );
};

export default FilterForm;
