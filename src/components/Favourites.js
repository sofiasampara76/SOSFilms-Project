import React, { useState } from 'react';
import '../styles/Favourites.css';
import { toggleFavourite } from "./UserService";

export function RenderFilms({ favoriteFilms, type }) {
  const [films, setFilms] = useState(favoriteFilms);
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    const nextStart = (startIndex + 1) % films.length;
    setStartIndex(nextStart);
  };

  const handleRemove = async (filmId) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const listKey = type === "films" ? "favouriteFilms" : "favouriteSeries";
  
    const updatedList = user[listKey].filter((item) => item.id !== filmId);
  
    const response = await fetch(`http://localhost:3005/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [listKey]: updatedList }),
    });
  
    if (!response.ok) {
      return alert("Failed to update favourites");
    }
  
    const updatedUser = { ...user, [listKey]: updatedList };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setFilms(updatedList); // this updates only visible films, as expected
    setStartIndex(0);
  };
  

  const visibleFilms = [
    films[startIndex],
    films[(startIndex + 1) % films.length],
  ].filter(Boolean);

  return (
    <div className="film-section">
      <ul className="film-grid">
        {visibleFilms.map((film, idx) => (
          <li key={film.id} className="show-item show-item-film">
            <img
              src={film.posterUrl}
              alt={film.title}
              className="film-poster"
            />
            <p className="text-sm">{film.title}</p>
            <div>
              <img
                src="/heart-btn-filled.svg"
                alt="Remove from favourites"
                className="remove-heart"
                onClick={() => handleRemove(film.id)}
              />
            </div>
          </li>
        ))}
        {films.length > 2 && (
          <div className="arrow-down-container" onClick={handleNext}>
            <img
              src="/arrow_right.png"
              alt="Next"
              className="arrow-down-icon"
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export function RenderShows({ favoriteShows, type }) {
  const [shows, setShows] = useState(favoriteShows);
  const [startIndex, setStartIndex] = useState(0);
  const pageSize = 3;

  const handleNext = () => {
    const nextStart = startIndex + 1;
    setStartIndex(nextStart >= shows.length ? 0 : nextStart);
  };

  const handleRemove = async (showId, type) => {
    const listKey = type === "films" ? "favouriteFilms" : "favouriteSeries";
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedList = user.listKey.filter((item) => item.id !== showId);

    await fetch(`http://localhost:3005/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listKey: updatedList }),
    });

    const updatedUser = { ...user, listKey: updatedList };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setShows(updatedList);
    setStartIndex(0);
  };

    
  let visibleShows;
  if (shows.length <= pageSize) {
    visibleShows = shows;
  } else {
    visibleShows = shows.slice(startIndex, startIndex + pageSize);

    if (visibleShows.length < pageSize) {
      visibleShows = visibleShows.concat(
        shows.slice(0, pageSize - visibleShows.length)
      );
    }
  }

  return (
    <div className="show-section">
      <ul className="show-list">
        {visibleShows.map((show, idx) => (
          <li key={show.id} className="show-item">
            <div className="show-content">
              <p className="font-semibold text-sm">{show.title}</p>
              <div className="show-rating">
                <img src="/star.svg" alt="Rating" className="star-icon" />
                <span className="rating">
                  {show.rating}
                  <span className="out-of-5">/5</span>
                </span>
              </div>
            </div>
            <div>
              <img
                src="/heart-btn-filled.svg"
                alt="Remove from favourites"
                className="remove-heart"
                onClick={() => handleRemove(show.id, type)}
              />
            </div>
          </li>
        ))}

        {shows.length > pageSize && (
          <li className="arrow-down-container" onClick={handleNext}>
            <img
              src="/arrow-down.svg"
              alt="Show More"
              className="arrow-down-icon"
            />
          </li>
        )}
      </ul>
    </div>
  );
}

export const FilmSection = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const favoriteFilms = user.favouriteFilms || [];
  const favoriteShows = user.favouriteSeries || [];

  const [isCardView1, setIsCardView1] = useState(true);
  const [isCardView2, setIsCardView2] = useState(true);

  return (
    <div className="page-wrapper">
      <div className="favorite-section">
        <div className="left-favorite-section">
          <div className="orientation">
            <img
              src="/list1.svg"
              alt="Card View"
              onClick={() => setIsCardView1(true)}
              className={isCardView1 ? 'active-icon' : ''}
            />
            <img
              src="/list2.png"
              alt="List View"
              onClick={() => setIsCardView1(false)}
              className={!isCardView1 ? 'active-icon' : ''}
            />
          </div>

          <div className="film-section">
            <h3 className="favorite-title">films</h3>
            {isCardView1 ? (
              <RenderFilms favoriteFilms={favoriteFilms} type="films" />
            ) : (
              <RenderShows favoriteShows={favoriteFilms} type="films"  />
            )}
          </div>
        </div>

        <div className="left-favorite-section">
          <div className="orientation">
            <img
              src="/list1.svg"
              alt="Card View"
              onClick={() => setIsCardView2(true)}
              className={isCardView2 ? 'active-icon' : ''}
            />
            <img
              src="/list2.png"
              alt="List View"
              onClick={() => setIsCardView2(false)}
              className={!isCardView2 ? 'active-icon' : ''}
            />
          </div>

          <div className="film-section">
            <h3 className="favorite-title">shows</h3>
            {isCardView2 ? (
              <RenderFilms favoriteFilms={favoriteShows} type="shows" />
            ) : (
              <RenderShows favoriteShows={favoriteShows} type="shows" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
