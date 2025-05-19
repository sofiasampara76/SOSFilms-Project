import axios from "axios";

const API_KEY = "470ea91bf1aa61d1fa3e936268faa25e";
const API_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

const tmdb = axios.create({
  baseURL: API_BASE,
  params: {
    api_key: API_KEY,
    language: "en-UK",
  },
});

let movieGenreMap = {};
let tvGenreMap = {};

async function ensureGenreMap() {
  if (Object.keys(movieGenreMap).length === 0) {
    const { data } = await tmdb.get("/genre/movie/list");
    movieGenreMap = data.genres.reduce((m, g) => ((m[g.id] = g.name), m), {});
  }
  if (Object.keys(tvGenreMap).length === 0) {
    const { data } = await tmdb.get("/genre/tv/list");
    tvGenreMap = data.genres.reduce((m, g) => ((m[g.id] = g.name), m), {});
  }
}

export async function fetchAllMovies(page = 1) {
  await ensureGenreMap();
  const { data } = await tmdb.get("/discover/movie", { params: { page } });
  return {
    results: data.results.map((item) => ({
      ...item,
      poster: item.poster_path ? `${IMAGE_BASE}/w500${item.poster_path}` : null,
      genres: item.genre_ids.map((id) => movieGenreMap[id] || "Unknown"),
    })),
    total_pages: data.total_pages,
  };
}

export async function fetchAllTVShows(page = 1) {
  await ensureGenreMap();
  const { data } = await tmdb.get("/discover/tv", { params: { page } });
  return {
    results: data.results.map((item) => ({
      ...item,
      poster: item.poster_path ? `${IMAGE_BASE}/w500${item.poster_path}` : null,
      genres: item.genre_ids.map((id) => tvGenreMap[id] || "Unknown"),
    })),
    total_pages: data.total_pages,
  };
}

export async function fetchMostPopularMovie() {
  const { results } = await fetchAllMovies(1);
  const movie = results[0];
  if (!movie) return null;

  const details = await fetchMovieDetails(movie.id);
  return details;
}

export async function fetchMostPopularShow() {
  const { results } = await fetchAllTVShows(1);
  const movie = results[0];
  if (!movie) return null;

  const details = await fetchShowDetails(movie.id);
  return details;
}

export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${API_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!res.ok) throw new Error("Search failed");
  const json = await res.json();
  return json;
}

export async function searchShows(query, page = 1) {
  const res = await fetch(
    `${API_BASE}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!res.ok) throw new Error("Search failed");
  const json = await res.json();
  return json;
}

// export async function fetchAllTVShows(page = 1) {
//   const { data } = await tmdb.get('/discover/tv', {
//     params: { page }
//   });
//   return data.results;
// }

// export async function fetchAllMoviesAllPages() {
//   const all = [];
//   let page = 1;

//   while (true) {
//     const movies = await fetchAllMovies(page);
//     if (!movies || movies.length === 0) break;
//     all.push(...movies);
//     page++;
//     await new Promise(r => setTimeout(r, 250));
//   }

//   return all;
// }

// export async function fetchMostPopularMovie() {
//   const { results } = await fetchAllMovies(1);
//   return results.length > 0 ? results[0] : null;
// }

export async function fetchAllMoviesAllPages(limitPages = 2) {
  const all = [];
  await ensureGenreMap();
  for (let p = 1; p <= limitPages; p++) {
    const { results } = await fetchAllMovies(p);
    all.push(...results);
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log("Fetched movies (limited):", all.length);
  return all;
}

export async function fetchAllTVShowsAllPages(limitPages = 2) {
  const all = [];
  await ensureGenreMap();
  for (let p = 1; p <= limitPages; p++) {
    const { results } = await fetchAllTVShows(p);
    all.push(...results);
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log("Fetched shows (limited):", all.length);
  return all;
}

// export async function fetchAllTVShowsAllPages() {
//   const all = [];
//   let page = 1;

//   while (true) {
//     const shows = await fetchAllTVShows(page);
//     if (!shows || shows.length === 0) break;
//     all.push(...shows);
//     page++;
//     await new Promise(r => setTimeout(r, 250));
//   }

//   return all;
// }

export async function fetchMoviesByGenre(genreId, page = 1) {
  const { data } = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return data.results;
}

export async function fetchMovieDetails(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "videos,credits,images",
    },
  });

  return {
    id: data.id,
    title: data.title,
    originalTitle: data.original_title,
    description: data.overview,
    releaseDate: data.release_date,
    duration: data.runtime,
    status: data.status,
    genres: data.genres.map((g) => g.name),
    rating: data.vote_average,
    languages: data.spoken_languages.map((lang) => lang.english_name),
    officialpage: data.homepage,
    poster: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : null,
    backdrop: data.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}`
      : null,

    trailers: data.videos.results
      .filter((v) => v.site === "YouTube" && v.type === "Trailer")
      .map((v) => `https://www.youtube.com/watch?v=${v.key}`),

    cast: data.credits.cast.map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profile: c.profile_path
        ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
        : null,
    })),

    images: data.images.backdrops.map((img) => ({
      url: `https://image.tmdb.org/t/p/w780${img.file_path}`,
    })),
  };
}

export async function fetchShowDetails(showId) {
  const { data } = await tmdb.get(`/tv/${showId}`, {
    params: { append_to_response: "videos,credits,images" },
  });
  return {
    id: data.id,
    title: data.name,
    originalTitle: data.original_name,
    description: data.overview,
    releaseDate: data.first_air_date,
    duration: data.episode_run_time?.[0] ?? null,
    status: data.status,
    genres: data.genres.map((g) => g.name),
    rating: data.vote_average,
    languages: data.spoken_languages.map((lang) => lang.english_name),
    officialpage: data.homepage,
    poster: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : null,
    backdrop: data.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}`
      : null,
    trailers: data.videos.results
      .filter((v) => v.site === "YouTube" && v.type === "Trailer")
      .map((v) => `https://www.youtube.com/watch?v=${v.key}`),
    cast: data.credits.cast.map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profile: c.profile_path
        ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
        : null,
    })),
    images: data.images.backdrops.map((img) => ({
      url: `https://image.tmdb.org/t/p/w780${img.file_path}`,
    })),
  };
}
