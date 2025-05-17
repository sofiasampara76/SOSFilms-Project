import React, { useState, useEffect } from "react";
import "../styles/MainPage.css";
import FilmPoster from "./FilmPoster";
import BigPoster from "./BigPoster";
import NavBarMainPage from "./NavBarMainPage";
import MainSlider from "./MainSlider";
import {
  fetchMostPopularMovie,
  fetchMostPopularShow,
} from "../api/tmdbService";

const MainPage = () => {
  const [viewType, setViewType] = useState("series");
  const [popular, setPopular] = useState(null);
  const [popularShow, setPopularShow] = useState(null);

  useEffect(() => {
    fetchMostPopularMovie()
      .then((movie) => {
        if (movie) {
          setPopular(movie);
          setViewType("films");
        }
      })
      .catch((err) => {
        console.error("Error fetching most popular movie:", err);
      });
  }, []);

  useEffect(() => {
    fetchMostPopularShow()
      .then((movie) => {
        if (movie) {
          setPopularShow(movie);
          setViewType("series");
        }
      })
      .catch((err) => {
        console.error("Error fetching most popular show:", err);
      });
  }, []);

  if (!popular) {
    return (
      <section className="popular-now-container">
        <p>Loading most popular movie…</p>
      </section>
    );
  }

  if (!popularShow) {
    return (
      <section className="popular-now-container">
        <p>Loading most popular movie…</p>
      </section>
    );
  }

  const trailerUrl =
    popular.trailers.length > 0
      ? popular.trailers[0].replace("watch?v=", "embed/") + "?autoplay=1"
      : null;

  const trailerShowUrl =
    popularShow.trailers.length > 0
      ? popularShow.trailers[0].replace("watch?v=", "embed/") + "?autoplay=1"
      : null;

  let backgroundUrl = "/ginny-and-georgia.png";
  let mainImgUrl = backgroundUrl;
  let backgroundUrl2 = "/3-body-problem.jpg";

  console.log("MainPage — selected viewType:", viewType);
  console.log("MainPage — trailerUrl (film):", trailerUrl);
  console.log("MainPage — trailerShowUrl (show):", trailerShowUrl);

  return (
    <>
      <section className="popular-now-container">
        <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
        {/* Blurred Background */}
        <div
          className="popular-now-bg"
          style={{
            backgroundImage: `url(${popular.backdrop || popular.poster})`,
          }}
        />

        <NavBarMainPage onSelectType={setViewType} />

        <div className="most-popular-text">
          <p>MOST POPULAR NOW:</p>
        </div>
        {viewType === "series" ? (
          <div className="popular-now-content">
            <FilmPoster
              posterUrl={popularShow.poster}
              filmTitle={popularShow.title.toUpperCase()}
              filmType={"series"}
            />
            <BigPoster trailerUrl={trailerShowUrl} />
          </div>
        ) : (
          <div className="popular-now-content">
            <FilmPoster
              posterUrl={popular.poster}
              filmTitle={popular.title.toUpperCase()}
              filmType={"film"}
            />
            <BigPoster trailerUrl={trailerUrl} />
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
