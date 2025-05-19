# SOSFilms

A React web application for browsing, searching, filtering and reviewing movies & TV shows powered by The Movie Database (TMDb) API.

---

## Features

- **Home / Main Slider**  
  - Shows the currently most popular movie & TV show with a blurred backdrop  
  - Switch between “Films” and “Shows”  
  - Carousel slider (`MainSlider` + `PosterCard`) with center-scale animation and next/prev arrows  

- **Search & Filter**  
  - Debounced search (300 ms) via TMDb `/search` endpoints  
  - Infinite scroll in the dropdown results  
  - Dynamic genre-filter panel (`FilterFormMain`) listing all genres from the full catalog  
  - Auto-load next pages when fewer than 2 filtered results remain  

- **Review Page**  
  - Detailed metadata (poster, title, year, runtime, status, rating, description, languages, genres)  
  - Up to 3 YouTube trailers with thumbnail previews linking out to YouTube  
  - “More Like This” section by genre: card carousel + list view with paging controls  
  - Add/remove favorites (stored in `localStorage`)  

- **Authentication**  
  - Simple Login/Register modal (localStorage-backed stub)  
  - Show/Hide Log In vs. Log Out button  

- **Reusable Components**  
  - `NavBarMainPage`, `FilterFormMain`, `MainSlider`, `PosterCard`, `SearchedCard`, `FilmPoster`, `BigPoster`, `FavouriteButton`, `AuthModal`, etc.  

- **API Service** (`src/api/tmdbService.js`)  
  - Axios wrapper with genre-map caching  
  - Discover (paged), Search, Details (with videos, credits, images), Discover by genres  

---

## Project Structure

SOSFilms-Project/
├── public/
│ ├── index.html
│ └── assets/ (icons, images)
├── src/
│ ├── api/tmdbService.js
│ ├── components/
│ │ ├── NavBarMainPage.jsx
│ │ ├── FilterFormMain.jsx
│ │ ├── MainSlider.jsx
│ │ ├── PosterCard.jsx
│ │ ├── FilmPoster.jsx
│ │ ├── BigPoster.jsx
│ │ ├── SearchedCard.jsx
│ │ ├── FavouriteButton.jsx
│ │ ├── Review.jsx
│ │ └── AuthModal.jsx
│ ├── styles/
│ │ ├── NavBar.css
│ │ ├── MainSlider.css
│ │ ├── PosterCard.css
│ │ ├── Review.css
│ │ └── FilterForm.css
│ ├── App.jsx
│ └── index.js
├── .env # REACT_APP_TMDB_API_KEY
├── package.json
└── README.md

