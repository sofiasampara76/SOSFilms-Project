import React from "react";
import "../styles/PosterFilm.css";

const FilmPoster = ({ posterUrl, filmTitle, filmType }) => {
  return (
    <div className="popular-now-left">
      <img src={posterUrl} alt="poster" className="poster-img" />
      <div className="poster-text-container">
        <div className="poster-text">
          <h2 className="title">{filmTitle}</h2>
          <p className="subtitle">{filmType}</p>
        </div>
        <button className="heart-btn"><img src="/heart-btn.svg" alt="Favourite button"></img></button>
      </div>
    </div>
  );
};

export default FilmPoster;
