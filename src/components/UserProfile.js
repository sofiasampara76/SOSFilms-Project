import React from 'react';
import '../styles/UserProfile.css';
import { FilmSection } from './Favourites';

const UserProfile = () => {
  const backgroundUrl = "/ginny-and-georgia.png";

  const user = {
    name: 'Example Example',
    email: 'example@gmail.com',
  };

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
        <FilmSection/>
        </div>
      </div>
  );
};


export default UserProfile;
