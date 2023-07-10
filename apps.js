// API (movie title): "https://www.omdbapi.com/?apikey=87c5d2f1&s=love"

const movieResultsEl = document.querySelector(" .movie__results")
const searchTitleEl = document.querySelector(" .title")
const loadingSpinEl = document.querySelector(" .loading")
const sortEL = document.querySelector("#sort")

async function renderMovies (sort) {

    setTimeout(() => {        
        loadingSpinEl.classList += ' movies__loading';
        }, 400)

    movieResultsEl.style.visibility='hidden';

    const movieTitles= await fetch (`https://www.omdbapi.com/?apikey=87c5d2f1&s=${word}`);
    const movieTitlesData = await movieTitles.json();
    const movieTitlesArray = movieTitlesData.Search.slice(0,8);

    setTimeout(() => {
        movieResultsEl.style.visibility='visible';
        movieResultsEl.innerHTML = movieTitlesArray.map((movie) => movieHTML(movie)).join("");
        searchTitleEl.innerHTML = `Results for: ${word}`;
        sortEL.style.display='flex';
        loadingSpinEl.classList.remove('movies__loading');
    }, 1200);

    if (sort === "NEW_TO_OLD") {
        movieTitlesArray.sort ((a, b) => b.Year - a.Year)
    }
    else if (sort === "OLD_TO_NEW") {
        movieTitlesArray.sort ((a, b) => a.Year - b.Year)
    }

}

function onSearchChange(event){
    word = event.target.value;
    event.preventDefault();
    renderMovies();
}

function movieHTML(movie) {
    return `<div class="movie">
        <figure class="movie__cover--wrapper">
            <img class="movie__cover" src="${movie.Poster}" alt="">
        </figure>
        <h2 class="movie__title">${movie.Title}</h2>
        <p class="movie__year">${movie.Year}</p>
    </div>`;
}


function sortMovieYear(event) {
    renderMovies(event.target.value)
}

function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}