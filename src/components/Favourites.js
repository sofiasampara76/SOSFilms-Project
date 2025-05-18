import React, { useState } from 'react';
import '../styles/Favourites.css';
import { toggleFavourite } from "./UserService";

export function RenderFilms({ favoriteFilms, type }) {
  const [startIndex, setStartIndex] = useState(0);

  const visibleFilms = [
    favoriteFilms[startIndex],
    favoriteFilms[(startIndex + 1) % favoriteFilms.length],
  ];

  // Create a separate liked state for each visible film
  const getInitialLiked = (film) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const likedList =
      type === "film" ? user.favouriteFilms || [] : user.favouriteSeries || [];
    return likedList.some((item) => item.id === film.id);
  };

  const [likedStates, setLikedStates] = useState(() =>
    visibleFilms.map((film) => getInitialLiked(film))
  );

  const handleToggle = async (film, index) => {
    await toggleFavourite(film, type);

    const updatedStates = [...likedStates];
    updatedStates[index] = !updatedStates[index];
    setLikedStates(updatedStates);
  };

  const handleNext = () => {
    const nextStart = (startIndex + 1) % favoriteFilms.length;
    setStartIndex(nextStart);
    // Recompute liked states for the new visible pair
    const newVisible = [
      favoriteFilms[nextStart],
      favoriteFilms[(nextStart + 1) % favoriteFilms.length],
    ];
    setLikedStates(newVisible.map((film) => getInitialLiked(film)));
  };

  return (
    <div className="film-section">
      <ul className="film-grid">
        {visibleFilms.map((film, idx) => (
          <li key={film.id || idx} className="show-item show-item-film">
            <img src={film.image} alt={film.title} className="film-poster" />
            <p className="text-sm">{film.title}</p>
            <div>
              <img
                src={likedStates[idx] ? "/heart-btn.svg" : "/heart-btn-filled.svg"}
                alt="Toggle like"
                className="remove-heart"
                onClick={() => handleToggle(film, idx)}
              />
            </div>
          </li>
        ))}

        <div className="arrow-down-container" onClick={handleNext}>
          <img src="/arrow_right.png" alt="Next" className="arrow-down-icon" />
        </div>
      </ul>
    </div>
  );
}

export function RenderShows({ favoriteShows }) {
  const [startIndex, setStartIndex] = useState(0);
  const pageSize = 3;

  const handleNext = () => {
    const nextStart = startIndex + 1;
    if (nextStart >= favoriteShows.length) {
      setStartIndex(0);
    } else {
      setStartIndex(nextStart);
    }
  };

  const visibleShows = Array.from({ length: pageSize }, (_, i) => {
    const index = (startIndex + i) % favoriteShows.length;
    return favoriteShows[index];
  });
  

  return (
    <div className="show-section">
      <ul className="show-list">
        {visibleShows.map((show, idx) => (
          <li key={idx} className="show-item">
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
              <img src="/heart-btn.svg" alt="Remove"/>
            </div>
          </li>
        ))}

        <li className="arrow-down-container" onClick={handleNext}>
          <img src="/arrow-down.svg" alt="Show More" className="arrow-down-icon" />
        </li>
      </ul>
    </div>
  );
}


export const FilmSection = () => {

    const favoriteFilms = [
        { title: 'HOW TO TRAIN YOUR DRAGON', image: '/how-to-train.jpg' },
        { title: 'MINECRAFT MOVIE', image: '/minecraft.jpg' },
      ];
    
      const favoriteShows = [
        { title: 'RICK AND MORTY', rating: 4 },
        { title: '3 BODY PROBLEM', rating: 5 },
        { title: 'THE WHITE LOTUS', rating: 4.5 },
        { title: 'SHERLOCK', rating: 3.5 },
      ];

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
                <RenderFilms favoriteFilms={favoriteFilms} type="film" />
                ) : (
                <RenderShows favoriteShows={favoriteFilms} />
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
            <h3 className="favorite-title">series</h3>
            {isCardView2 ? (
            <RenderFilms favoriteFilms={favoriteShows} type="series" />
            ) : (
            <RenderShows favoriteShows={favoriteShows} />
            )}
            </div>
          </div>

          </div>
        </div>
  );
};
