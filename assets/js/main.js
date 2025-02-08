// Import the Bootstrap bundle
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Function to create a movie card
function createMovieCard(movie) {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-12 col-md-6 col-lg-3 mb-4 d-flex';

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card flex-fill h-100';

  const img = document.createElement('img');
  img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'assets/images/placeholder.svg';
  img.className = 'card-img-top';
  img.alt = movie.title;

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body d-flex flex-column';

  const cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title';
  cardTitle.textContent = movie.title;

  const cardText1 = document.createElement('p');
  cardText1.className = 'card-text';
  cardText1.textContent = `Released: ${movie.release_date} | Rating: ${movie.vote_average}/10`;

  const cardText2 = document.createElement('p');
  cardText2.className = 'card-text flex-grow-1';
  cardText2.textContent = movie.overview;

  cardBodyDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(cardText1);
  cardBodyDiv.appendChild(cardText2);

  cardDiv.appendChild(img);
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
function displaySearchResults(movies) {
  const resultsContainer = document.querySelector('.results-container');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (movies.length === 0) {
    const noResults = document.createElement('p');
    noResults.className = 'text-center';
    noResults.textContent = 'No results found.';
    resultsContainer.appendChild(noResults);
    return;
  }

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    resultsContainer.appendChild(movieCard);
  });
}

// Function to create pagination controls
function createPaginationControls(currentPage, totalPages) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = ''; // Clear previous pagination

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
      fetchMovies(page);
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
      return movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    case 'release_date_desc':
      return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    default:
      return movies;
  }
}

// Function to fetch movies
function fetchMovies(page = 1) {
  const query = document.getElementById('search').value;  
  const sortBy = document.getElementById('sort_by').value;
  const url = `/api/search.php?query=${encodeURIComponent(query)}&page=${page}`;

  // Show placeholder cards
  const resultsContainer = document.querySelector('.results-container');
  resultsContainer.innerHTML = ''; // Clear previous results
  for (let i = 0; i < 20; i++) {
    const placeholderCard = createPlaceholderCard();
    resultsContainer.appendChild(placeholderCard);
  }

  // Disable search button and show loading spinner
  const searchButton = document.querySelector('#searchForm button[type="submit"]');
  searchButton.disabled = true;
  searchButton.innerHTML = '<span class="spinner-border spinner-border-sm p-0 m-0" aria-hidden="true"></span><span role="status">Searching...</span>';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        const sortedMovies = sortMovies(data.results, sortBy); // Sort the search results
        displaySearchResults(data.results); // Display the search results
        createPaginationControls(page, data.total_pages); // Create pagination controls
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      // Re-enable search button and hide loading spinner
      searchButton.disabled = false;
      searchButton.innerHTML = 'Search';
    });
}

// Search form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  fetchMovies(); // Fetch movies for the first page
});

document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new bootstrap.Popover(popover)
  });