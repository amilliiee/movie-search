// import { apiKey } from './apiKey';
const apiKey = 'apikey=16b4f33b';
const url = 'https://www.omdbapi.com/';
const container = document.getElementById('movie-container');
const poster = document.getElementById('movie-poster');
const title = document.getElementById('movie-title');
const genres = document.getElementById('movie-genres');
const summary = document.getElementById('movie-summary');
const director = document.getElementById('director-text');
const writers = document.getElementById('writers-text');
const stars = document.getElementById('stars-text');
const rating = document.getElementById('rating-text');
const searchBar = document.getElementById('search-bar');


const findMovie = async () => {
  const movieName = searchBar.value.split(' ');
  const moviePath = movieName.join('+');
  const movieEndpoint = `${url}?${apiKey}&t=${moviePath}`;
  
  try {
    const response = await fetch(movieEndpoint);
    if (response.ok) {
      const data = await response.json();
      setInfo(data);
      return;
    }
    
    throw new Error('Movie not found');
  } catch (e) {
    console.log(e);
  }
};

const setInfo = data => {
  poster.src = data["Poster"];
  title.textContent = data["Title"];
  styleGenres(data["Genre"]);
  summary.textContent = data["Plot"];
  director.textContent = data["Director"];
  writers.textContent = data["Writer"];
  stars.textContent = data["Actors"];
  rating.textContent = `${data["imdbRating"]} (${data["imdbVotes"]} votes)`;
  container.style.display = 'flex';
};

const resetInfo = () => {
  poster.src = '';
  title.textContent = '';
  removeGenres();
  summary.textContent = '';
  director.textContent = '';
  writers.textContent = '';
  stars.textContent = '';
  rating.textContent = '';
  container.style.display = 'none';
};

const styleGenres = movieGenres => {
  for (let g of movieGenres.split(',')) {
    const bubble = document.createElement('span');
    bubble.classList.add('bubble');
    bubble.textContent = g;
    genres.appendChild(bubble);
  }
};

const removeGenres = () => {
  while (genres.firstChild) {
    genres.removeChild(genres.firstChild);
  }
};

searchBar.addEventListener('keypress', e => {
  if (e.key === "Enter") {
    resetInfo();
    findMovie();
  }
});