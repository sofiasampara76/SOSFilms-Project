import React from 'react';
import '../styles/UserProfile.css';
import { FilmSection } from './Favourites';
import { Link } from "react-router-dom";

const UserProfile = () => {
  const backgroundUrl = "/ginny-and-georgia.png";

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="page-wrapper">
      <div
        className="popular-now-bg"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      ></div>
      <div className="overlay"></div>
      <Link to="/">
        <img className="logo-image" src="/SOSFilms.svg" alt="Logo" />
      </Link>

      <div className="main-content">
        <div className="personal-section">
          <h2 className="favorite-title">personal information</h2>
          {user ? (
            <div className="info-card">
              <div className="info-row">
                <div className="icon-wrapper">
                  <img src="/person-icon.svg" alt="User Icon" className="person-icon" />
                </div>
                <div className="text-left">
                  <p className="font-bold">
                    <span className="label">name:</span> <span className='inside-font-bold'>{user.name || "Anonymous"}</span>
                  </p>
                  <p className="font-bold">
                    <span className="label">mail:</span> <span className='inside-font-bold'>{user.email}</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="font-bold">Please log in to view profile.</p>
          )}

        </div>

        <h2 className="favorite-title">favorite</h2>
        <FilmSection/>
        </div>
      </div>
  );
};


export default UserProfile;
