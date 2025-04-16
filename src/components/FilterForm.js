import React, { useState } from "react";
import "../styles/FilterForm.css"

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

const FilterForm = ({ filtersOpen }) => {

  return (
    <div className="filter-form" style={{
        display: `url(${
          filtersOpen === true ? "flex" : "none"
        })`}}>
      <span className="genres-text">genres</span>
      <div className="genres-grid">
        {genres.map((genre, i) => (
          <div key={i} className="genre-pill">
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterForm;
