import React from "react";
import "../styles/PosterFilm.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FilmPoster = ({ posterUrl, filmTitle, filmType, filmId }) => {
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
        <button className="heart-btn">
          <img src="/heart-btn.svg" alt="Favourite button"></img>
        </button>
      </div>
    </motion.div>
  );
};

export default FilmPoster;
