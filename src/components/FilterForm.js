import React from "react";
import "../styles/FilterForm.css";

const FilterForm = ({
  filtersOpen,
  setFiltersOpen,
  selectedGenres,
  toggleGenre,
  allGenres
}) => {
  return (
    <div
      className="filter-form"
      style={{ display: filtersOpen ? "flex" : "none" }}
    >
      <span className="genres-text">genres</span>
      <div className="genres-grid">
        {allGenres.map((genre) => {
          const isActive = selectedGenres.includes(genre);
          return (
            <div
              key={genre}
              className={`genre-pill ${isActive ? "active" : ""}`}
              onClick={() => toggleGenre(genre)}
              type="button"
            >
              {genre}
            </div>
          );
        })}
      </div>
      <button
        className="close-filter-button"
        type="button"
        onClick={() => setFiltersOpen(false)}
      >
        <img src="/close-button.svg" alt="Close filter form" />
      </button>
    </div>
  );
};

export default FilterForm;
