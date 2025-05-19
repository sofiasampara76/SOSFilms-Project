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
            <div className="auth-toggle">
              <button
                className={authMode === "login" ? "active-auth-tab" : ""}
                onClick={() => setAuthMode("login")}
              >
                Log In
              </button>
              <button
                className={authMode === "register" ? "active-auth-tab" : ""}
                onClick={() => setAuthMode("register")}
              >
                Register
              </button>
            </div>
            {authMode === "login" ? (
              <>
                <h2>Log In</h2>
                <form
                  className="register-form"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const email = e.target.email.value;
                    const password = e.target.password.value;

                    try {
                      const response = await fetch(`http://localhost:3005/users?email=${email}`);
                      const users = await response.json();

                      if (users.length === 0) {
                        alert("User not found");
                        return;
                      }

                      const user = users[0];
                      const bcrypt = await import('bcryptjs');
                      const isMatch = await bcrypt.compare(password, user.password);

                      if (isMatch) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);
                        setShowModal(false);
                      } else {
                        alert("Incorrect password");
                      }
                    } catch (err) {
                      console.error("Login error:", err);
                      alert("Login failed");
                    }
                  }}
                >
                  <input type="email" name="email" placeholder="Email" required />
                  <input type="password" name="password" placeholder="Password" required />
                  <button type="submit">Log In</button>
                  <p className="close-modal" onClick={handleCloseModal}>Cancel</p>
                </form>

              </>
            ) : (
              <>
                <h2>Register</h2>
                <form
                  className="register-form"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const name = e.target.name.value;
                    const email = e.target.email.value;
                    const password = e.target.password.value;
                    const confirmPassword = e.target.confirmPassword.value;

                    if (password !== confirmPassword) {
                      alert("Passwords do not match");
                      return;
                    }

                    try {
                      const bcrypt = await import('bcryptjs');
                      const hashedPassword = await bcrypt.hash(password, 10);

                      const response = await fetch("http://localhost:3005/users", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          name,
                          email,
                          password: hashedPassword,
                          favouriteFilms: [],
                          favouriteSeries: []
                        })
                      });

                      if (!response.ok) {
                        throw new Error("Failed to register user");
                      }

                      const createdUser = await response.json();

                      localStorage.setItem("user", JSON.stringify(createdUser));
                      setUser(createdUser);
                      e.target.reset();
                      setShowModal(false);
                    } catch (err) {
                      console.error("Registration error:", err);
                      alert("Registration failed");
                    }
                  }}
                >
                  <input type="text" name="name" placeholder="Name" required />
                  <input type="email" name="email" placeholder="Email" required />
                  <input type="password" name="password" placeholder="Password" required />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
                  <button type="submit">Register</button>
                  <p className="close-modal" onClick={handleCloseModal}>Cancel</p>
                </form>
              </>
            )}
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
