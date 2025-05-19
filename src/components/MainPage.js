import React, { useState, useEffect } from "react";
import "../styles/MainPage.css";
import FilmPoster from "./FilmPoster";
import BigPoster from "./BigPoster";
import NavBarMainPage from "./NavBarMainPage";
import MainSlider from "./MainSlider";
import AuthModal from "./AuthModal";
import {
  fetchMostPopularMovie,
  fetchMostPopularShow,
} from "../api/tmdbService";

const MainPage = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [viewType, setViewType] = useState("shows");
  const [popular, setPopular] = useState(null);
  const [popularShow, setPopularShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login")

  useEffect(() => {
    fetchMostPopularMovie()
      .then((movie) => {
        if (movie) {
          setPopular(movie);
          // setViewType("films");
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
          // setViewType("shows");
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
  const backgroundUrl =
  viewType === "shows"
    ? popularShow.backdrop
    : popular.poster; 

  const trailerUrl =
    popular.trailers.length > 0
      ? popular.trailers[0].replace("watch?v=", "embed/") + "?autoplay=1"
      : null;

  const trailerShowUrl =
    popularShow.trailers.length > 0
      ? popularShow.trailers[0].replace("watch?v=", "embed/") + "?autoplay=1"
      : null;

  let backgroundUrl2 = "/3-body-problem.jpg";

  console.log("MainPage — selected viewType:", viewType);
  console.log("MainPage — trailerUrl (film):", trailerUrl);
  console.log("MainPage — trailerShowUrl (show):", trailerShowUrl);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowModal(false);
  };

  return (
    <>
      <section className="popular-now-container">
        <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
        
        {user ? (
          <button className="login-btn" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <button className="login-btn" onClick={handleOpenModal}>
            Log In / Register
          </button>
        )}

        <div
          className="popular-now-bg"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
          }}
        />

        <NavBarMainPage onSelectType={setViewType} selected={viewType} />

        <div className="most-popular-text">
          <p>MOST POPULAR NOW:</p>
        </div>
        {viewType === "shows" ? (
          <div className="popular-now-content">
            <FilmPoster
              posterUrl={popularShow.poster}
              filmTitle={popularShow.title.toUpperCase()}
              filmType={"shows"}
              filmId={popularShow.id}
              filmRating = {popularShow.vote_average ?? popularShow.rating}
            />
            <BigPoster trailerUrl={trailerShowUrl} />
          </div>
        ) : (
          <div className="popular-now-content">
            <FilmPoster
              posterUrl={popular.poster}
              filmTitle={popular.title.toUpperCase()}
              filmType={"films"}
              filmId={popular.id}
              filmRating = {popular.vote_average ?? popular.rating}
            />
            <BigPoster trailerUrl={trailerUrl} />
          </div>
        )}

        {/* Arrow Down */}
        <div className="arrow-down">
          <img src="/arrow-down.svg" alt="Arrow down"></img>
        </div>
      </section>
      <MainSlider backgroundUrl={backgroundUrl2} onSelectType={setViewType} selectedType={viewType} />
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <AuthModal
              mode={authMode}
              setMode={setAuthMode}
              onClose={() => setShowModal(false)}
              onLogin={handleLoginSuccess}
            />
          </div>
        </div>
      )}
    </>
  );

  // return (
  //   <>
  //   <FilmsSlider backgroundUrl={backgroundUrl2}/>
  //   </>
  // );
};

export default MainPage;
