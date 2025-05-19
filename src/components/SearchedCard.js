import "../styles/SearchedCard.css";
import React, { useState, useEffect } from "react";
import { fetchMovieDetails, fetchShowDetails } from "../api/tmdbService";
import { Link } from "react-router-dom";

const SearchedCard = ({ filmId, type }) => {
    console.log(type);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchFn = type === "films" ? fetchMovieDetails : fetchShowDetails;
    fetchFn(filmId).then(setInfo).catch(console.error);
  }, [filmId, type]);

  if (!info) return <div>Loading…</div>;

  return (
    <Link
      to={`/review/${filmId}`}
      state={{ filmInfo: info, type }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="film-info-container">
        <img
          className="film-info-poster"
          src={info.poster ?? "./no-poster.png"}
          alt="Film Poster"
        ></img>
        <div className="film-info-c">
          <div className="film-info-title">{info.title ?? info.name}</div>

          <div className="metadata">
            <div className="film-info-year">
              {info.releaseDate?.split("-")[0]}
            </div>
            <div className="film-info-rating">{Number(info.rating).toFixed(1)}/10</div>
          </div>

          <div className="film-info-genres">
            {(info.genres || []).join(", ")}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchedCard;
