import React from "react";
import "../styles/Review.css";

const Review = ({
  backgroundUrl,
  posterUrl,
  status,
  officialPage,
  releaseDate,
  releaseYear,
  duration,
  title,
  rating,
  description,
}) => {
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
            <span class="status-badge">{status}</span>
            <span class="official-page-badge">{officialPage}</span>
          </div>

          <div class="poster-container">
            <img
              src={posterUrl}
              alt="Minecraft Movie Poster"
              class="film-poster"
            />

            <div class="release-date">{releaseDate}</div>
          </div>

          <div class="card-meta">
            <span class="year">{releaseYear}</span>
            <img src="/Star.svg" alt="Star Rating" class="rating-icon" />
            <span class="rating">{rating}</span>
            <span class="duration">{duration}</span>
          </div>

          <div class="film-title">{title}</div>
        </section>

        <section class="about-section">
          <h2 class="section-title">about</h2>
          <p class="description">{description}</p>

          <div class="tag-row">
            <div class="tag-label">genres</div>
            <div class="tags">
              <span class="tag">comedy</span>
              <span class="tag">adventure</span>
              <span class="tag">action</span>
            </div>
          </div>

          <div class="tag-row">
            <div class="tag-label">language</div>
            <div class="tags">
              <span class="tag">Ukrainian</span>
              <span class="tag">English</span>
              <span class="tag">Switzerland</span>
            </div>
          </div>

          <div class="trailers">
            <div class="trailer-item">
              <img src="trailer1.jpg" alt="Trailer 1" />
            </div>
            <div class="trailer-item">
              <img src="trailer2.jpg" alt="Trailer 2" />
            </div>
            <div class="trailer-item">
              <img src="trailer3.jpg" alt="Trailer 3" />
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
              <ul class="show-list">
                <li class="show-item">
                  <span class="show-name">Rick and Morty</span>
                  <span class="show-rating">⭐ 4★</span>
                </li>
                <li class="show-item">
                  <span class="show-name">3 Body Problem</span>
                  <span class="show-rating">⭐ 5★</span>
                </li>
                <li class="show-item">
                  <span class="show-name">The White Lotus</span>
                  <span class="show-rating">⭐ 4.5★</span>
                </li>
                <li class="show-item selected">
                  <span class="show-name">Sherlock</span>
                  <span class="show-rating">⭐ 3.5★</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Review;
