import { React, useState } from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";

const NavBarMainPage = ({ onSelectType }) => {
  const [selected, setSelected] = useState("shows");

  const handleSelect = (type) => {
    setSelected(type);
    onSelectType(type);
  };
  return (
    <>
      <img
        className="filter-icon"
        src="/filter-icon.svg"
        alt="Filter icon"
      ></img>
      <p className="navbar-text">Filter</p>

      <div className="navbar-biggest-container">
        <div className="navbar-container">
          <div className="navbar-item" onClick={() => alert("Filter clicked")}>
            <img
              className="filter-icon"
              src="/filter-icon.svg"
              alt="Filter icon"
            ></img>
            <p className="navbar-text">Filter</p>
          </div>
          <div
            className="navbar-item"
            onClick={() => alert("Favourite clicked")}
          >
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
        <div
          className="profile-icon-container"
          onClick={() => alert("Profile clicked")}
        >
          <img src="/profile-icon.svg" alt="Profile Icon"></img>
        </div>
      </div>
      <div className="series-films-slider">
        <div
          className={`slider-indicator ${
            selected === "shows" ? "left" : "right"
          }`}
        />
        <div className="series-container" onClick={() => handleSelect("shows")}>
          <p>shows</p>
        </div>
        <div className="films-container" onClick={() => handleSelect("films")}>
          <p>films</p>
        </div>
      </div>
    </>
  );
};

export default NavBarMainPage;
