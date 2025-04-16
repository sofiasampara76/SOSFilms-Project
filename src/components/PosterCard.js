import React, { useState, useRef } from "react";
import "../styles/PosterCard.css";

let genres = ["comedy", "adventure", "action"];

const PosterCard = ({ filmInfo, isCenter, className }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  const genreRef = useRef(null);

  const scrollLeft = () => {
    genreRef.current.scrollBy({ left: -100, behavior: 'smooth' });
  };

  const scrollRight = () => {
    genreRef.current.scrollBy({ left: 100, behavior: 'smooth' });
  };
  return (
    <div className={className}>
      <img
        className="poster-card-image"
        src={filmInfo.poster}
        alt="Film Poster"
      ></img>
      <div className="genres-slider">
        {/* {genres.map((genre) => (
          <div className="genre-container">
            <p>{genre}</p>
          </div>
        ))} */}
        {isCenter && (
        <div className="genres-wrapper">
          <button className="genre-arrow left" onClick={scrollLeft}>&lt;</button>
          <div className="genres scrollable" ref={genreRef}>
            {filmInfo.genres.map((g, i) => (
              <span key={i} className="genre-tag">{g}</span>
            ))}
          </div>
          <button className="genre-arrow right" onClick={scrollRight}>&gt;</button>
        </div>
      )}
      </div>
      <div className="film-info">
        <p className="film-title">{filmInfo.title}</p>
        <img
          className="heart-button"
          src={liked ? "/heart-btn-filled.svg" : "/heart-btn.svg"}
          alt="Heart button"
          onClick={toggleLike}
        ></img>
      </div>
    </div>
  );
};

export default PosterCard;
