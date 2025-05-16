import React from "react";
import "../styles/Review.css";
import { useLocation } from "react-router-dom";

const Review = () => {
  const location = useLocation();
  const filmInfo = location.state?.filmInfo;

  if (!filmInfo) return <div>No film data provided!</div>;
  return (
    <section>
      {/* <div
        className="review-section"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
      <div className="review-div">
        <h1 className="review-h1">Review</h1>
        <p className="review-p">
          This is the Review page of our awesome project!
        </p>
      </div> */}

      {/* <div
        className="review-section"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      /> */}

      {/* LOGO */}
      <header class="review-header">
        <img className="logo-image" src="/SOSFilms.svg" alt="Logo"></img>
      </header>

      <main class="review-layout">
        {/* FILM CARD */}
        <section class="film-card">
          <div class="card-header">
            <span class="status-badge">{filmInfo.status}</span>
            <span class="official-page-badge">
              <a
                href={filmInfo.officialPage}
                style={{ textDecoration: "none", color: "black" }}
              >
                Official Page
              </a>
            </span>
          </div>

          <div class="poster-container">
            <img
              src={filmInfo.poster}
              alt="Minecraft Movie Poster"
              class="film-poster"
            />

            <div class="release-date">{filmInfo.releaseDate}</div>
          </div>

          <div class="card-meta">
            <span class="year">{filmInfo.releaseYear}</span>
            <img src="/Star.svg" alt="Star Rating" class="rating-icon" />
            <span class="rating">{filmInfo.rating}</span>
            <span class="duration">{filmInfo.duration}</span>
          </div>

          <div class="film-title">{filmInfo.title}</div>
        </section>

        <section class="about-section">
          <h2 class="section-title">about</h2>
          <p class="description">{filmInfo.description}</p>

          <div class="tag-row">
            <div class="tag-label">genres</div>
            <div class="tags">
              <span class="tag">{filmInfo.genres[0]}</span>
              <span class="tag">{filmInfo.genres[1]}</span>
            </div>
          </div>

          <div class="tag-row">
            <div class="tag-label">language</div>
            <div class="tags">
              <span class="tag">{filmInfo.languages[0]}</span>
              <span class="tag">{filmInfo.languages[1]}</span>
            </div>
          </div>

          <div class="trailers">
            <div class="trailer-item">
              <img src="/" alt="Trailer 1" />
            </div>
            <div class="trailer-item">
              <img src="/" alt="Trailer 2" />
            </div>
            <div class="trailer-item">
              <img src="/" alt="Trailer 3" />
            </div>
          </div>
        </section>

        <section class="more-like-this">
          <h2 class="section-title">more like this</h2>

          <div class="recommendations">
            <div class="films-block">
              <h3 class="subsection-title">films</h3>
              <div class="film-list">
                <div class="film-item">
                  <img src="how-to-train.jpg" alt="How to Train Your Dragon" />
                  <div class="film-title">How to Train Your Dragon</div>
                </div>
                <div class="film-item">
                  <img src="minecraft.jpg" alt="Minecraft Movie" />
                  <div class="film-title">Minecraft Movie</div>
                </div>
              </div>
            </div>

            <div class="shows-block">
              <h3 class="subsection-title">shows</h3>
              <div class="show-list">
                <div class="show-item">
                  <span class="show-name">Rick and Morty</span>
                  <img src="/Star.svg" alt="star" />
                  <span class="show-rating-big">4</span>
                  <span class="show-rating-small">/5</span>
                </div>
                <div class="show-item">
                  <span class="show-name">3 Body Problem</span>
                  <img src="/Star.svg" alt="star" />
                  <span class="show-rating-big">5</span>
                  <span class="show-rating-small">/5</span>
                </div>
                <div class="show-item">
                  <span class="show-name">The White Lotus</span>
                  <img src="/Star.svg" alt="star" />
                  <span class="show-rating-big">4.5</span>
                  <span class="show-rating-small">/5</span>
                </div>
                <div class="show-item selected">
                  <span class="show-name">Sherlock</span>
                  <img src="/Star.svg" alt="star" />
                  <span class="show-rating-big">3.5</span>
                  <span class="show-rating-small">/5</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Review;
