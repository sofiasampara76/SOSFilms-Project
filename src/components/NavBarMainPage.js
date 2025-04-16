import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";

const NavBarMainPage = () => {
  return (
    <>
      <div className="navbar-biggest-container">
        <div className="navbar-container">
          <div className="navbar-item">
            <img
              className="filter-icon"
              src="/filter-icon.svg"
              alt="Filter icon"
            ></img>
            <p className="navbar-text">Filter</p>
          </div>
          <div className="navbar-item">
            <img src="/heart-btn.svg" alt="Favourite icon"></img>
            <p className="navbar-text">Favourite</p>
          </div>
          <div className="navbar-search-container">
            <div className="navbar-search">
              <img src="/search-icon.svg" alt="Search Icon"></img>
              <input
                type="text"
                className="search-input"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div className="profile-icon-container">
          <img src="/profile-icon.svg" alt="Profile Icon"></img>
        </div>
      </div>
      <div className="series-films-slider">
        <div className="series-container">
          <p>series</p>
        </div>
        <div className="films-container">
          <p>films</p>
        </div>
      </div>
    </>
  );
};

export default NavBarMainPage;
