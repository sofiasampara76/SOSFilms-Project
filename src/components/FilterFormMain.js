import React from "react";
import "../styles/FilterFormMain.css";

const FilterForm = ({
  filtersOpen,
  setFiltersOpen,
  selectedGenres,
  toggleGenre,
  allGenres
}) => {
  return (
    <div
      className="filter-form-main"
      style={{ display: filtersOpen ? "flex" : "none" }}
    >
      <span className="genres-text-main">genres</span>
      <div className="genres-grid-main">
        {allGenres.map((genre) => {
          const isActive = selectedGenres.includes(genre);
          return (
            <div
              key={genre}
              className={`genre-pill-main ${isActive ? "active" : ""}`}
              onClick={() => toggleGenre(genre)}
              type="button"
            >
              {genre}
            </div>
          );
        })}
      </div>
      <button
        className="close-filter-button-main"
        type="button"
        onClick={() => setFiltersOpen(false)}
      >
        <img src="/close-button.svg" alt="Close filter form" />
      </button>
    </div>
  );
};

export default FilterForm;
