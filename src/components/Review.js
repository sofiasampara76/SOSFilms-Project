import React, { useState, useEffect } from "react";
import "../styles/Review.css";
import { useParams, useLocation } from "react-router-dom";
import { fetchMovieDetails, fetchShowDetails } from "../api/tmdbService";

const Review = () => {
  const { id } = useParams();
  const location = useLocation();
  const { filmInfo = null, type = null } = location.state || {};

  // ALL HOOKS AT THE TOP:
  const [film, setFilm] = useState(null);

  function getDurationString(minutes) {
    if (!minutes || isNaN(minutes)) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  const [filmsView, setFilmsView] = useState("card");
  const [showsView, setShowsView] = useState("list");
  const [showStart, setShowStart] = useState(0);
  const [filmStart, setFilmStart] = useState(0);

  const shows = [
    { title: "RICK AND MORTY", rating: 4 },
    { title: "3 BODY PROBLEM", rating: 5 },
    { title: "THE WHITE LOTUS", rating: 4.5 },
    { title: "SHERLOCK", rating: 3.5 },
    { title: "HAHA", rating: 6.5 },
  ];

  const films = [
    {
      title: "HOW TO TRAIN YOUR DRAGON",
      image: "/how-to-train.jpg",
      rating: 4,
    },
    { title: "MINECRAFT MOVIE", image: "/minecraft.jpg", rating: 4.5 },
  ];

  useEffect(() => {
    if (!id || !type) return;

    const fetchFn = type === "films" ? fetchMovieDetails : fetchShowDetails;

    fetchFn(id)
      .then((data) => setFilm(data))
      .catch((err) => console.error("Error fetching details:", err));
  }, [id, type]);

  const visibleShows = shows.slice(showStart, showStart + 3);
  const handleNextShows = () => {
    setShowStart((prev) => {
      if (shows.length <= 3) return 0;
      // If at end, go to start; else advance by 1
      return (prev + 1) % (shows.length - 2);
    });
  };

  const visibleFilms = films.slice(filmStart, filmStart + 2);

  const handleNextFilms = () => {
    setFilmStart((prev) => {
      if (films.length <= 2) return 0;
      return (prev + 1) % (films.length - 1);
    });
  };

  const handleRemove = (title) => alert(`Remove "${title}" from favorites?`);
  const handlePlayTrailer = (i) => alert(`Play trailer ${i + 1}`);

  const scrollSlider = (classname, direction = "right") => {
    const slider = document.querySelector(`.${classname}`);
    if (slider) {
      slider.scrollLeft += direction === "left" ? -160 : 160;
    }
  };

  if (!film) return <div>Loading...</div>;

  console.log("Trailer links:", film.trailers);

  return (
    <div
      className="review-bg"
      style={
        film.poster
          ? {
              backgroundImage: `
                    linear-gradient(
                      to bottom,
                      rgba(40,30,45,0.85) 10%,
                      rgba(40,30,45,0.89) 90%
                    ),
                    url(${film.poster})
                  `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              /* fallback color */
              backgroundColor: "#271f27",
            }
          : {}
      }
    >
      {/* Logo */}
      <header className="review-header">
        <img className="logo-image" src="/SOSFilms.svg" alt="Logo" />
      </header>

      {/* Main upper grid */}
      <div className="review-main-grid">
        {/* Film card */}
        <section className="film-card glassy">
          <div className="card-header">
            <div className="status-row">
              <span className="status-badge-main">status</span>
              <span
                className="status-badge-value"
                style={{
                  background:
                    film.status && film.status.toLowerCase().trim() === "ended"
                      ? "rgba(77,255,0,0.2)"
                      : "rgba(255,0,255,0.2)",
                }}
              >
                {film.status && film.status.toLowerCase().trim() === "ended"
                  ? "ended"
                  : "to be determined"}
              </span>
            </div>
            <a
              className="official-page-badge"
              href={film.officialpage}
              target="_blank"
              rel="noopener noreferrer"
            >
              official page
            </a>
          </div>
          <div className="film-poster-meta-block">
            <img src={film.poster} alt="Poster" className="film-main-poster" />
            <div className="film-meta-row">
              <span className="film-meta-year">
                {film.releaseDate ? film.releaseDate.split("-")[0] : ""}
              </span>
              <span className="film-meta-rating">
                <img
                  src="/star.svg"
                  alt="Rating Star"
                  className="film-meta-star"
                />
                <span className="film-meta-rating-value">
                  {film.rating ? Number(film.rating).toFixed(2) : ""}
                  <span className="film-meta-rating-max">/10</span>
                </span>
              </span>
              <span className="film-meta-duration">
                {getDurationString(film.duration)}
              </span>
            </div>
          </div>
          <span className="film-type">
            {type === "films" ? "film" : "show"}
          </span>
          <div className="film-unlike-title">
            <div className="film-title">{film.title}</div>
            <button
              className="remove-btn"
              title="Remove from favorites"
              onClick={() => handleRemove(film.title)}
            >
              {/* Use your icon */}
              <img
                src="/unlike.svg"
                alt="Remove"
                style={{ width: "25px", height: "29px" }}
              />
            </button>
          </div>
        </section>

        {/* About */}
        <section className="about glassy">
          <span className="about-title">about</span>
          <span className="about-desc-title">description</span>
          <p className="about-desc">{film.description}</p>
          <div className="about-row about-row-2col">
            <div className="about-col">
              <span className="about-label">genres</span>
              <div className="tags-slider-container">
                <button
                  className="tags-arrow tags-arrow-left"
                  tabIndex={-1}
                  onClick={() => scrollSlider("genres-slider", "left")}
                >
                  <img src="/left-arrow.svg" alt="left arrow" />
                </button>
                <div className="tags-slider genres-slider" tabIndex={0}>
                  {(film.genres || []).map((tag, i) => (
                    <span className="tag-pill" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="tags-arrow tags-arrow-right"
                  tabIndex={-1}
                  onClick={() => scrollSlider("genres-slider", "right")}
                >
                  <img src="/right-arrow.svg" alt="right arrow" />
                </button>
              </div>
            </div>
            <div className="about-col">
              <span className="about-label">language</span>
              <div className="tags-slider-container">
                <button
                  className="tags-arrow tags-arrow-left"
                  tabIndex={-1}
                  onClick={() => scrollSlider("languages-slider", "left")}
                >
                  <img src="/left-arrow.svg" alt="left arrow" />
                </button>
                <div className="tags-slider languages-slider" tabIndex={0}>
                  {(film.languages || []).map((tag, i) => (
                    <span className="tag-pill" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="tags-arrow tags-arrow-right"
                  tabIndex={-1}
                  onClick={() => scrollSlider("languages-slider", "right")}
                >
                  <img src="/right-arrow.svg" alt="right arrow" />
                </button>
              </div>
            </div>
          </div>
          <div className="about-row about-trailers">
            <div className="about-label">trailers</div>
            <div className="trailers">
              {(film.trailers || []).map((src, i) => (
                <div className="trailer-thumb" key={i}>
                  <img
                    src={src}
                    alt={`Trailer ${i + 1}`}
                    className="trailer-img"
                    onClick={() => handlePlayTrailer(i)}
                  />
                  <div className="trailer-controls">
                    <button
                      className="mute-btn"
                      onClick={(e) => {
                        e.stopPropagation(); /* handle mute */
                      }}
                    >
                      <img src="/mute-icon.svg" alt="Mute" />
                    </button>
                    <button
                      className="play-btn"
                      onClick={() => handlePlayTrailer(i)}
                    >
                      <img src="/play-icon.svg" alt="Play" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* More like this */}
      <section
        className="more-like-this glassy"
        style={{ display: "flex", gap: "44px", justifyContent: "center" }}
      >
        <div style={{ flex: 1 }}>
          <div className="mlt-center-col">
            <span className="mlt-label">films</span>
            <div className="mlt-toggles-bar">
              <div className="mlt-toggles-bubble">
                <div className="mlt-toggles">
                  <button
                    className={`mlt-toggle-btn ${filmsView === "card" ? "active" : ""}`}
                    onClick={() => setFilmsView("card")}
                    title="Card View"
                  >
                    <img src="/two-rectangles.svg" alt="card view" />
                  </button>
                  <button
                    className={`mlt-toggle-btn ${filmsView === "list" ? "active" : ""}`}
                    onClick={() => setFilmsView("list")}
                    title="List View"
                  >
                    <img src="/list.svg" alt="list view" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {filmsView === "card" ? (
            <ul className="film-grid">
              {visibleFilms.map((film, idx) => (
                <li key={idx} className="show-item show-item-film">
                  <img
                    src={film.image}
                    alt={film.title}
                    className="film-poster"
                  />
                  <p className="film-title">{film.title}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(film.title)}
                  >
                    <img
                      src="/unlike.svg"
                      alt="Remove"
                      className="remove-heart"
                    />
                  </button>
                </li>
              ))}
              {films.length > 2 && (
                <li className="arrow-down-container" onClick={handleNextFilms}>
                  <img
                    src="/right-arrow.svg"
                    alt="Next"
                    className="arrow-down-icon"
                  />
                </li>
              )}
            </ul>
          ) : (
            <ul className="mlt-list">
              {films.map((film, idx) => (
                <li className="mlt-list-item" key={film.title}>
                  <span className="mlt-list-title">{film.title}</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(film.title)}
                  >
                    <img
                      src="/unlike.svg"
                      alt="Remove"
                      className="remove-heart"
                    />
                  </button>
                  <img
                    src="/right-arrow.svg"
                    alt="Next"
                    className="mlt-list-arrow"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div className="mlt-center-col">
            <span className="mlt-label">shows</span>
            <div className="mlt-toggles-bar">
              <div className="mlt-toggles-bubble">
                <div className="mlt-toggles">
                  <button
                    className={`mlt-toggle-btn ${showsView === "card" ? "active" : ""}`}
                    onClick={() => setShowsView("card")}
                    title="Card View"
                  >
                    <img src="/two-rectangles.svg" alt="card view" />
                  </button>
                  <button
                    className={`mlt-toggle-btn ${showsView === "list" ? "active" : ""}`}
                    onClick={() => setShowsView("list")}
                    title="List View"
                  >
                    <img src="/list.svg" alt="list view" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showsView === "card" ? (
            <ul className="show-list">
              {visibleShows.map((show, idx) => (
                <li key={idx} className="show-item">
                  <div className="show-content">
                    <span className="show-name">{show.title}</span>
                    <img src="/star.svg" alt="Star" className="star-icon" />
                    <span className="show-rating-big">{show.rating}/5</span>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(show.title)}
                  >
                    <img
                      src="/unlike.svg"
                      alt="Remove"
                      className="remove-heart"
                    />
                  </button>
                </li>
              ))}
              {shows.length > 3 && (
                <li className="arrow-down-container" onClick={handleNextShows}>
                  <img
                    src="/arrow-down.svg"
                    alt="Show More"
                    className="arrow-down-icon"
                  />
                </li>
              )}
            </ul>
          ) : (
            <ul className="mlt-list">
              {shows.map((show, idx) => (
                <li className="mlt-list-item" key={show.title}>
                  <span className="mlt-list-title">{show.title}</span>
                  <img src="/star.svg" alt="star" className="star-icon" />
                  <span className="mlt-list-rating">{show.rating}/5</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(show.title)}
                  >
                    <img
                      src="/unlike.svg"
                      alt="Remove"
                      className="remove-heart"
                    />
                  </button>
                  <img
                    src="/right-arrow.svg"
                    alt="Next"
                    className="mlt-list-arrow"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Review;
