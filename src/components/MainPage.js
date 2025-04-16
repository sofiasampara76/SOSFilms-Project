import React, { useState } from "react";
import "../styles/MainPage.css";
import FilmPoster from "./FilmPoster";
import BigPoster from "./BigPoster";
import NavBarMainPage from "./NavBarMainPage";
import MainSlider from "./MainSlider";

const MainPage = () => {
  const [viewType, setViewType] = useState("shows");

  let backgroundUrl = "/ginny-and-georgia.png";
  let posterUrl = "/poster-ginny-and-georgia.jpg";
  let mainImgUrl = backgroundUrl;
  let filmTitle = "Ginny & Georgia".toUpperCase();
  let filmType = "shows";
  let backgroundUrl2 = "/3-body-problem.jpg";
  return (
    <>
    <section className="popular-now-container">
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
      {/* Blurred Background */}
      <div
        className="popular-now-bg"
        style={{
          backgroundImage: `url(${
            viewType === "shows" ? backgroundUrl : backgroundUrl2
          })`
        }}
      />

      <NavBarMainPage onSelectType={setViewType} />

      {/* Content */}
      <div className="most-popular-text">
        <p>MOST POPULAR NOW:</p>
      </div>
      {viewType === "shows" ? (
        <div className="popular-now-content">
          <FilmPoster
            posterUrl={posterUrl}
            filmTitle={filmTitle}
            filmType={filmType}
          />
          <BigPoster mainImgUrl={mainImgUrl} />
        </div>
      ) : (
        <div className="popular-now-content">
          <FilmPoster
            posterUrl={backgroundUrl2}
            filmTitle={"Rick & Morty"}
            filmType={"movie"}
          />
          <BigPoster mainImgUrl={mainImgUrl} />
        </div>
      )}

      {/* Arrow Down */}
      <div className="arrow-down">
        <img src="/arrow-down.svg" alt="Arrow down"></img>
      </div>
    </section>
    <MainSlider backgroundUrl={backgroundUrl2} onSelectType={setViewType} />
    </>
  );
  // return (
  //   <>
  //   <FilmsSlider backgroundUrl={backgroundUrl2}/>
  //   </>
  // );
};

export default MainPage;
