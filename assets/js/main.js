// Import the Bootstrap bundle
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

let allMovies = [];

// Function to create a movie card
function createMovieCard(movie) {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-12 col-md-6 col-lg-3 mb-4 d-flex';

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card flex-fill h-100 position-relative';

  const favoritesDiv = document.createElement('button');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isFavorite = favorites.some(fav => fav.id === movie?.id);

  favoritesDiv.className = `btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-info'} position-absolute top-0 end-0 m-2`;
  favoritesDiv.innerHTML = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
  favoritesDiv.addEventListener('click', async () => {
    await addMovieToFavorites(movie, favoritesDiv);
  });

  const img = document.createElement('img');
  img.src = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : 'assets/images/placeholder.svg';
  img.className = 'card-img-top img-fluid';
  img.alt = movie?.title;
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => fetchMovieDetails(movie?.id));

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body d-flex flex-column';

  const cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title';
  cardTitle.textContent = movie?.title;

  const cardText1 = document.createElement('p');
  cardText1.className = 'card-text';
  cardText1.textContent = `Released: ${movie?.release_date} | Rating: ${movie?.vote_average?.toFixed(1)}/10`;

  const cardText2 = document.createElement('p');
  cardText2.className = 'card-text flex-grow-1';
  cardText2.textContent = movie?.overview;

  cardBodyDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(cardText1);
  cardBodyDiv.appendChild(cardText2);

  cardDiv.appendChild(img);
  cardDiv.appendChild(favoritesDiv);
  cardDiv.appendChild(cardBodyDiv);

  colDiv.appendChild(cardDiv);

  return colDiv;
}

// Function to create a placeholder loader for movie cards
function createPlaceholderCard() {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-12 col-md-6 col-lg-3 mb-4 d-flex';

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card flex-fill h-100';

  const img = document.createElement('img');
  img.src = 'assets/images/placeholder.svg';
  img.className = 'card-img-top';
  img.alt = 'Placeholder Movie Poster';

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body d-flex flex-column';

  const cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title placeholder-glow';
  cardTitle.innerHTML = '<span class="placeholder col-6"></span>';

  const cardText1 = document.createElement('p');
  cardText1.className = 'card-text placeholder-glow';
  cardText1.innerHTML = '<span class="placeholder col-2"></span><span class="placeholder col-2"></span><span class="placeholder col-2"></span><span class="placeholder col-4"></span>';

  const cardText2 = document.createElement('p');
  cardText2.className = 'card-text placeholder-glow flex-grow-1';
  cardText2.innerHTML = '<span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span>';

  cardBodyDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(cardText1);
  cardBodyDiv.appendChild(cardText2);

  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBodyDiv);

  colDiv.appendChild(cardDiv);

  return colDiv;
}

// Function to display search results
function displaySearchResults(movies, page = 1, resultsPerPage = 20) {
  const resultsContainer = document.querySelector('.results-container');
  resultsContainer.innerHTML = '';

  if (movies.length === 0) {
    const noResults = document.createElement('p');
    noResults.className = 'text-center';
    noResults.textContent = 'No results found.';
    resultsContainer.appendChild(noResults);
    return;
  }

  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const moviesToDisplay = movies.slice(startIndex, endIndex);

  moviesToDisplay.forEach(movie => {
    const movieCard = createMovieCard(movie);
    resultsContainer.appendChild(movieCard);
  });
}

// Function to create pagination controls
function createPaginationControls(currentPage, totalPages) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  if (totalPages <= 1) {
    return;
  }

  const createPageItem = (page, label = page) => {
    const li = document.createElement('li');
    li.className = `page-item ${page === currentPage ? 'active' : ''}`;
    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.textContent = label;
    a.addEventListener('click', (event) => {
      event.preventDefault();
      fetchMovies(page); // Fetch movies for the selected page
    });
    li.appendChild(a);
    return li;
  };

  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (currentPage > 1) {
    paginationContainer.appendChild(createPageItem(currentPage - 1, 'Previous'));
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationContainer.appendChild(createPageItem(i));
  }

  if (currentPage < totalPages) {
    paginationContainer.appendChild(createPageItem(currentPage + 1, 'Next'));
  }
}

// Function to sort movies
function sortMovies(movies, sortBy) {
  switch (sortBy) {
    case 'title_asc':
      return movies.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
    case 'title_desc':
      return movies.sort((a, b) => b.title.localeCompare(a.title, 'en', { sensitivity: 'base' }));
    case 'release_date_asc':
      return movies.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    case 'release_date_desc':
      return movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    default:
      return movies;
  }
}

// Function to show error message using Bootstrap toast
function showErrorToast(message) {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-danger border-0 mt-1';
  toast.role = 'alert';
  toast.ariaLive = 'assertive';
  toast.ariaAtomic = 'true';

  const toastBody = document.createElement('div');
  toastBody.className = 'd-flex';
  toastBody.innerHTML = `
    <div class="toast-body">
      ${message}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  `;

  toast.appendChild(toastBody);
  toastContainer.appendChild(toast);

  const bootstrapToast = new bootstrap.Toast(toast);
  bootstrapToast.show();
}

// Function to open movie modal
function openMovieModal(movie) {
  const modalTitle = document.getElementById('movieModalLabel');
  const modalPoster = document.getElementById('modalMoviePoster');
  const modalMovieTitle = document.getElementById('modalMovieTitle');
  const modalMovieReleaseDate = document.getElementById('modalMovieReleaseDate');
  const modalMovieRating = document.getElementById('modalMovieRating');
  const modalMovieRuntime = document.getElementById('modalMovieRuntime');
  const modalMovieOverview = document.getElementById('modalMovieOverview');
  const modalMovieGenres = document.getElementById('modalMovieGenres');

  modalTitle.textContent = movie?.title;
  modalPoster.src = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : 'assets/images/placeholder.svg';
  modalMovieTitle.textContent = movie.title;
  modalMovieReleaseDate.textContent = `Release Date: ${movie?.release_date}`;
  modalMovieRating.textContent = `Rating: ${movie?.vote_average?.toFixed(1)}/10`;
  modalMovieRuntime.textContent = `Runtime: ${movie?.runtime} minutes`;
  modalMovieOverview.textContent = movie?.overview;

  modalMovieGenres.innerHTML = '';
  movie?.genres.forEach(genre => {
    const genreBadge = document.createElement('span');
    genreBadge.className = 'badge text-bg-info me-1';
    genreBadge.textContent = genre.name;
    modalMovieGenres.appendChild(genreBadge);
  });

  const movieModal = new bootstrap.Modal(document.getElementById('movieModal'));
  movieModal.show();
}

// Function to fetch movie details
async function fetchMovieDetails(movieId) {
  const url = `/api/routes.php?action=details&movie_id=${movieId}`;

  // Show loader and disable events
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  document.body.style.pointerEvents = 'none';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Error:', data.error);
      showErrorToast(data.error);
    } else {
      openMovieModal(data); // Open the modal with the movie details
    }
  } catch (error) {
    console.error('Error:', error);
    showErrorToast('An error occurred while fetching the movie details.');
  }

  // Hide loader and enable events
  loader.style.display = 'none';
  document.body.style.pointerEvents = 'auto';
}

// Function to add or remove movie from favorites
async function addMovieToFavorites(movie, button) {
  // Show loader and disable events
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  document.body.style.pointerEvents = 'none';

  try {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movieIndex = favorites.findIndex(fav => fav.id === movie.id);

    if (movieIndex === -1) {
      // Add to favorites
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      button.innerHTML = 'Remove from Favorites';
      button.classList.remove('btn-info');
      button.classList.add('btn-danger');
    } else {
      // Remove from favorites
      favorites.splice(movieIndex, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      button.innerHTML = 'Add to Favorites';
      button.classList.remove('btn-danger');
      button.classList.add('btn-info');
    }
  } catch (error) {
    console.error('Error:', error);
    showErrorToast('An error occurred while updating the favorites.');
  }
  // Hide loader and enable events
  loader.style.display = 'none';
  document.body.style.pointerEvents = 'auto';
}

// Function to fetch all pages of movies
async function fetchAllPages(query) {
  let page = 1;
  let totalPages = 1;
  let allMovies = [];

  while (page <= totalPages) {
    const url = `/api/routes.php?action=search&query=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Error:', data.error);
      showErrorToast(data.error);
      break;
    } else {
      allMovies = allMovies.concat(data.results);
      totalPages = data.total_pages;
      page++;
    }
  }

  return allMovies;
}

// Function to fetch movies
async function fetchMovies(page = 1) {
  const query = document.getElementById('search').value;
  const sortBy = document.getElementById('sort_by').value;

  // Show placeholder cards
  const resultsContainer = document.querySelector('.results-container');
  resultsContainer.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const placeholderCard = createPlaceholderCard();
    resultsContainer.appendChild(placeholderCard);
  }

  // Disable search button and show loading spinner
  const searchButton = document.querySelector('#searchForm button[type="submit"]');
  searchButton.disabled = true;
  searchButton.innerHTML = '<span class="spinner-border spinner-border-sm p-0 m-0" aria-hidden="true"></span><span role="status">Searching...</span>';
  document.body.style.pointerEvents = 'none';

  try {
    const allMovies = await fetchAllPages(query);
    const sortedMovies = sortMovies(allMovies, sortBy); // Sort the combined results
    displaySearchResults(sortedMovies, page); // Display the sorted results
    createPaginationControls(page, Math.ceil(sortedMovies.length / 20)); // Create pagination controls
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
  } catch (error) {
    console.error('Error:', error);
    showErrorToast('An error occurred while fetching the movies.');
    resultsContainer.innerHTML = '';
  }
  // Re-enable search button and hide loading spinner
  searchButton.disabled = false;
  searchButton.innerHTML = 'Search';
  document.body.style.pointerEvents = 'auto';
}

// Search form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  fetchMovies(); // Fetch movies for the first page
});

document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new bootstrap.Popover(popover)
  });