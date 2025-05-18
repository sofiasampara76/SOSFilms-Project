import React from "react";
import "../styles/PosterFilm.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FavouriteButton } from "./FavouriteButton";

const FilmPoster = ({ posterUrl, filmTitle, filmType, filmId, filmRating }) => {
  return (
    <motion.div
      className="popular-now-left"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to={`/review/${filmId}`}>
        <img src={posterUrl} alt="poster" className="poster-img" />
      </Link>
      <div className="poster-text-container">
        <div className="poster-text">
          <h2 className="title">{filmTitle}</h2>
          <p className="subtitle">{filmType}</p>
        </div>
        <FavouriteButton item={{ id: filmId, title: filmTitle, posterUrl: posterUrl, rating: filmRating }} type={filmType} />
      </div>
    </motion.div>
  );
};

export default FilmPoster;
