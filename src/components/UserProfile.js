import React from 'react';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const backgroundUrl = "/ginny-and-georgia.png";

  const user = {
    name: 'Example Example',
    email: 'example@gmail.com',
  };

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

  return (
    <div className="page-wrapper">
      <div
        className="popular-now-bg"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      ></div>
      <div className="overlay"></div>
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo" />

      <div className="main-content">
        <div className="personal-section">
          <h2 className="favorite-title">personal information</h2>
          <div className="info-card">
            <div className="info-row">
            <div className="icon-wrapper">
              <img src="/person-icon.svg" alt="User Icon" className="person-icon" />
            </div>
              <div className="text-left">
                <p className="font-bold">name: <span className='inside-font-bold'>{user.name}</span></p>
                <p className="font-bold">mail: <span className='inside-font-bold'>{user.email}</span></p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="favorite-title">favorite</h2>

        <div className="favorite-section">
          <div className="left-favorite-section">
            <div className="orientation">
              <img className="" src="/list1.png" alt="Choosing oriantation of showing favoutite films" />
              <img className="" src="/list2.png" alt="Choosing oriantation of showing favoutite films" />
            </div>
            <div className="film-section">
                <h3 className="film-title">films</h3>
                <ul className="film-grid">
                {favoriteFilms.map((film, idx) => (
                  <li key={idx} className="show-item show-item-film">
                    <img src={film.image} alt={film.title} className="film-poster" />
                    <p className="text-sm">{film.title}</p>
                    <div className="remove-box">
                      <img src="/unlike.svg" alt="Remove" className="remove-heart" />
                    </div>
                  </li>
                ))}
              </ul>
              </div>
            </div>
            <div className="show-section">
            <h3 className="show-title">shows</h3>
            {/* </div> */}

            <ul className="show-list">
              {favoriteShows.map((show, idx) => (
                <li key={idx} className="show-item">
                  <div className="show-content">
                    <p className="font-semibold text-sm">{show.title}</p>
                    <div className="show-rating">
                      <img src="/star.svg" alt="Rating" className="star-icon" />
                      <span className="rating">{show.rating}<span className="out-of-5">/5</span></span>
                    </div>
                  </div>
                  <div className="remove-box">
                    <img src="/unlike.svg" alt="Remove" className="remove-heart" />
                  </div>
                </li>
              
              ))}
            </ul>

            <div className="arrow-down-container">
              <img src="/arrow-down.svg" alt="Show More" className="arrow-down-icon" />
            </div>
          </div>

          </div>
        </div>
      </div>
  );
};

export default UserProfile;
