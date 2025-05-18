import React from "react";
import { fetchMovieDetails } from "../api/tmdbService";

const SearchedCard = ({ filmId }) => {
    const filmInfo = fetchMovieDetails(filmId);

    return (
        <div className="film-info-container">
            <div className="film-info-poster">
                <img src=""></img>
            </div>
            <div className="film-info">
                <div className="film-info-title">

                </div>
                <div className="something">
                    <div className="film-info-year">

                    </div>
                    <div className="film-info-rating">

                    </div>
                    <div className="film-info-genres">

                    </div>
                </div>
            </div>
        </div>
    );
};
