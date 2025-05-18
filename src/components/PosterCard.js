import React, { useState, useRef } from "react";
import "../styles/PosterCard.css";
import { Link } from "react-router-dom";
import { FavouriteButton } from "./FavouriteButton";

const PosterCard = ({ filmInfo, isCenter, className, filmType }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  const genreRef = useRef(null);

  const scrollLeft = () => {
    genreRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = () => {
    genreRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };
  return (
    <div className={className}>
      <Link to={`/review/${filmInfo.id}`} state={{ filmInfo, type: filmType }}>
        <img
          className="poster-card-image"
          src={filmInfo.poster}
          alt="Film Poster"
        ></img>
      </Link>
      <div className="genres-slider">
        {isCenter && (
          <div className="genres-wrapper">
            <button className="genre-arrow left" onClick={scrollLeft}>
              <img src="left-arrow.svg" alt="Left Arrow"></img>
            </button>
            <div className="genres scrollable" ref={genreRef}>
              {filmInfo.genres.map((g, i) => (
                <span key={i} className="genre-tag">
                  {g}
                </span>
              ))}
            </div>
            <button className="genre-arrow right" onClick={scrollRight}>
              <img src="right-arrow.svg" alt="Right Arrow"></img>
            </button>
          </div>
        )}
      </div>
      <div className="film-info">
        <Link
          to={`/review/${filmInfo.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          state={{ filmInfo, type: filmType}}
        >
          <p className="film-title">{filmInfo.title ?? filmInfo.name}</p>
        </Link>
        <FavouriteButton item={{ "id": filmInfo.id, "title": filmInfo.title ?? filmInfo.original_name, "posterUrl": filmInfo.poster, "rating": filmInfo.vote_average ?? filmInfo.rating }} type={ filmType } />
      </div>
    </div>
  );
};

export default PosterCard;
