import React, { useState, useEffect } from "react";
import "../styles/Review.css";
import { useParams, useLocation } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchShowDetails,
  fetchMoviesByGenres,
  fetchShowsByGenres,
} from "../api/tmdbService";
import { toggleFavourite } from "./UserService";

const Review = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const { type } = location.state || {};

  const [film, setFilm] = useState(null);
  const [similarFilms, setSimilarFilms] = useState([]);
  const [filmsView, setFilmsView] = useState("card");
  const [filmStart, setFilmStart] = useState(0);

  const [listPage, setListPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const [similarShows, setSimilarShows] = useState([]);
  const [showStart, setShowStart] = useState(0);
  const [showsView, setShowsView] = useState("card");
  const [listShowsPage, setListShowsPage] = useState(0);
  const SHOWS_PER_CARD_PAGE = 2;
  const SHOWS_PER_LIST_PAGE = 4;

  function getDurationString(minutes) {
    if (!minutes || isNaN(minutes)) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  useEffect(() => {
    if (!id || !type) return;
  
    const fetchFn = type === "films" ? fetchMovieDetails : fetchShowDetails;
  
    fetchFn(id)
      .then((data) => {
        setFilm(data);
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const listKey = type === "films" ? "favouriteFilms" : "favouriteSeries";
        const favList = user[listKey] || [];
        const alreadyFav = favList.some((item) => item.id === data.id);
        setIsFavourite(alreadyFav);
      })
      .catch((err) => console.error("Error fetching details:", err));
  }, [id, type]);

  useEffect(() => {
    if (!id || !type) return;
    const fetchFn = type === "films" ? fetchMovieDetails : fetchShowDetails;
    fetchFn(id)
      .then((data) => setFilm(data))
      .catch((err) => console.error("Error fetching details:", err));
  }, [id, type]);

  useEffect(() => {
    if (!film || !film.genres) return;
    fetchShowsByGenres(film.genres)
      .then((shows) => setSimilarShows(shows.filter((s) => s.id !== film.id)))
      .catch(console.error);
  }, [film]);

  useEffect(() => {
    setListPage(0);
  }, [similarFilms]);

  useEffect(() => {
    if (!film || !film.genres) return;
    fetchMoviesByGenres(film.genres)
      .then((films) => setSimilarFilms(films.filter((f) => f.id !== film.id)))
      .catch(console.error);
  }, [film]);

  const visibleFilms =
    filmsView === "card"
      ? similarFilms.slice(filmStart, filmStart + 2)
      : similarFilms.slice(
          listPage * ITEMS_PER_PAGE,
          (listPage + 1) * ITEMS_PER_PAGE,
        );
  const hasMoreListFilms =
    (listPage + 1) * ITEMS_PER_PAGE < similarFilms.length;

  const visibleShows =
    showsView === "card"
      ? similarShows.slice(showStart, showStart + SHOWS_PER_CARD_PAGE)
      : similarShows.slice(
          listShowsPage * SHOWS_PER_LIST_PAGE,
          (listShowsPage + 1) * SHOWS_PER_LIST_PAGE,
        );
  const hasMoreListShows =
    (listShowsPage + 1) * SHOWS_PER_LIST_PAGE < similarShows.length;

  const handleNextFilms = () => {
    setFilmStart((prev) => {
      if (similarFilms.length <= 2) return 0;
      return (prev + 1) % (similarFilms.length - 1);
    });
  };
  const handlePrevFilms = () => {
    setFilmStart((prev) => {
      if (similarFilms.length <= 2) return 0;
      return prev === 0 ? similarFilms.length - 2 : prev - 1;
    });
  };
  const handleNextShows = () => {
    setShowStart((prev) => {
      if (similarShows.length <= SHOWS_PER_CARD_PAGE) return 0;
      return (prev + 1) % (similarShows.length - (SHOWS_PER_CARD_PAGE - 1));
    });
  };
  const handlePrevShows = () => {
    setShowStart((prev) => {
      if (similarShows.length <= SHOWS_PER_CARD_PAGE) return 0;
      return prev === 0 ? similarShows.length - SHOWS_PER_CARD_PAGE : prev - 1;
    });
  };
  const handleNextShowsList = () => {
    if ((listShowsPage + 1) * SHOWS_PER_LIST_PAGE < similarShows.length) {
      setListShowsPage((p) => p + 1);
    }
  };
  const handlePrevShowsList = () => {
    if (listShowsPage > 0) setListShowsPage((p) => p - 1);
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
                    rgba(35,40,48,0.78) 10%,
                    rgba(35,40,48,0.88) 90%
                  ),
                    url(${film.poster})
                  `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
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
              title={isFavourite ? "Remove from favorites" : "Add to favorites"}
              onClick={() => {
                const item = {
                  id: film.id,
                  title: film.title,
                  posterUrl: film.poster,
                  rating: film.rating,
                };
                toggleFavourite(item, type);
                setIsFavourite((prev) => !prev);
              }}
            >
              <img
                src={isFavourite ? "/heart-btn-filled.svg" : "/heart-btn.svg"}
                alt="Favourite"
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
              {similarFilms.length > 2 && (
                <li className="arrow-down-container" onClick={handlePrevFilms}>
                  <img
                    src="/right-arrow.svg"
                    alt="Previous"
                    className="arrow-down-icon"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </li>
              )}
              {visibleFilms.map((film_mrlt, idx) => (
                <li key={idx} className="show-item show-item-film">
                  {/* <Link
                  to={`/review/${film_mrlt.id}`}
                  state={{ film_mrlt, type: }}
                  > */}
                  <img
                    src={film_mrlt.poster}
                    alt={film_mrlt.title}
                    className="film-poster"
                  />
                  <p className="film-title">{film_mrlt.title}</p>
                  {/* </Link> */}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(film_mrlt.title)}
                  >
                    {/* <img
                      src="/unlike.svg"
                      alt="Remove"
                      className="remove-heart"
                    /> */}
                  </button>
                </li>
              ))}
              {similarFilms.length > 2 && (
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
              {listPage > 0 && (
                <li
                  className="arrow-up-container"
                  onClick={() => setListPage((p) => p - 1)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20px",
                  }}
                >
                  <img
                    src="/arrow-down.svg"
                    alt="Show Previous"
                    style={{
                      width: "25px",
                      height: "25px",
                      transform: "rotate(180deg)",
                    }}
                  />
                </li>
              )}
              {visibleFilms.map((film_mrlt, idx) => (
                <li className="mlt-list-item" key={film_mrlt.title}>
                  <span className="mlt-title-group">
                    <span className="mlt-list-title">{film_mrlt.title}</span>
                    {/* <button
                      className="remove-btn"
                      onClick={() => handleRemove(film_mrlt.title)}
                    >
                      <img
                        src="/unlike.svg"
                        alt="Remove"
                        className="remove-heart"
                      />
                    </button> */}
                  </span>
                  <img
                    src="/right-arrow.svg"
                    alt="Next"
                    className="mlt-list-arrow"
                  />
                </li>
              ))}
              {/* Down Arrow for next page */}
              {hasMoreListFilms && (
                <li
                  className="arrow-down-container"
                  onClick={() => setListPage((p) => p + 1)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10px",
                  }}
                >
                  <img
                    src="/arrow-down.svg"
                    alt="Show More"
                    style={{ width: "25px", height: "25px" }}
                  />
                </li>
              )}
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
            <ul className="film-grid">
              {similarShows.length > 2 && (
                <li className="arrow-down-container" onClick={handlePrevShows}>
                  <img
                    src="/right-arrow.svg"
                    alt="Previous"
                    className="arrow-down-icon"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </li>
              )}
              {visibleShows.map((show, idx) => (
                <li key={show.id || idx} className="show-item show-item-film">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="film-poster"
                  />
                  <p className="film-title">{show.title}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(show.title)}
                  >
                    {/* Optional: Uncomment to show icon */}
                    {/* <img src="/unlike.svg" alt="Remove" className="remove-heart" /> */}
                  </button>
                </li>
              ))}
              {similarShows.length > 2 && (
                <li className="arrow-down-container" onClick={handleNextShows}>
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
              {visibleShows.map((show, idx) => (
                <li className="mlt-list-item" key={show.id || show.title}>
                  <span className="mlt-list-title">{show.title}</span>
                  <img src="/star.svg" alt="star" className="star-icon" />
                  <span className="mlt-list-rating">
                    {show.rating ? Number(show.rating).toFixed(1) : "-"}
                    /10
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(show.title)}
                  >
                    {/* <img
                      src="/unlike.svg"
                      alt="Remove"
                      className="remove-heart"
                    /> */}
                  </button>
                  <img
                    src="/right-arrow.svg"
                    alt="Next"
                    className="mlt-list-arrow"
                  />
                </li>
              ))}
              {hasMoreListShows && (
                <li
                  className="arrow-down-container"
                  onClick={handleNextShowsList}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20px",
                  }}
                >
                  <img
                    src="/arrow-down.svg"
                    alt="Show Previous"
                    style={{
                      width: "25px",
                      height: "25px",
                    }}
                  />
                </li>
              )}
              {listShowsPage > 0 && (
                <li
                  className="arrow-up-container"
                  onClick={handlePrevShows}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20px",
                  }}
                >
                  <img
                    src="/arrow-down.svg"
                    alt="Show Previous"
                    style={{
                      width: "25px",
                      height: "25px",
                      transform: "rotate(180deg)",
                    }}
                  />
                </li>
              )}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Review;
