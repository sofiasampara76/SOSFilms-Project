import React, { useState } from "react";
import "../styles/MainPage.css";
import FilmPoster from "./FilmPoster";
import BigPoster from "./BigPoster";
import NavBarMainPage from "./NavBarMainPage";
import FilmsSlider from "./FilmsSlider";

const MainPage = () => {
  let backgroundUrl = "/ginny-and-georgia.png";
  let posterUrl = "/poster-ginny-and-georgia.jpg";
  let mainImgUrl = backgroundUrl;
  let filmTitle = "Ginny & Georgia".toUpperCase();
  let filmType = "shows";
  let backgroundUrl2 = "/rick-and-morty.jpg";
  return (
    <section className="popular-now-container">
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
      {/* Blurred Background */}
      <div
        className="popular-now-bg"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />

      <NavBarMainPage />

      {/* Content */}
      <div className="most-popular-text">
        <p>MOST POPULAR NOW:</p>
      </div>
      <div className="popular-now-content">
        {/* Left Block */}
        <FilmPoster
          posterUrl={posterUrl}
          filmTitle={filmTitle}
          filmType={filmType}
        />

        {/* Right Block */}
        <BigPoster mainImgUrl={mainImgUrl} />
      </div>

      {/* Arrow Down */}
      <div className="arrow-down">
        <img src="/arrow-down.svg" alt="Arrow down"></img>
      </div>
    </section>
  );
  // return (
  //   <>
  //   <FilmsSlider backgroundUrl={backgroundUrl2}/>
  //   </>
  // );
};

export default MainPage;
