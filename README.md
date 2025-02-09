# The Movie Search App

Test app for job interview with Software Yard.

## Notes about the requirements

- The API's https://api.themoviedb.org/3/search/movie does not provide sort by functionality, I had to improvise a solution but it is slow with so many results, and it is affecting the pagination.

## Features

- **Search Movies**: Search for movies by title using a search bar.
- **Display Results**: Show movie posters, titles, release years, and descriptions.
- **View Details**: More details about a movie displayed in a modal or on a new page.
- **Favorites List**: Save favorite movies locally.
- **Sorting**: Sort search results by title or release year.
- **Pagination**: Navigate between multiple pages of results.
- **Responsive Design**: The app is fully responsive and works seamlessly on all devices.
- **SEO Compliant**: The app is optimized for search engines.
- **Bootstrap**: Fully utilizes Bootstrap for styling and responsiveness.
- **Error Handling**: Gracefully handles errors and displays user-friendly messages.
- **Beautiful Placeholder Loaders**: Displays attractive placeholder loaders while fetching data.
- **Seamless UX**: Provides a smooth and intuitive user experience.

## Technology Stack

### Frontend

- **HTML**
- **CSS** (Bootstrap for styling)
- **JavaScript** (with AJAX for seamless data fetching)

### Backend

- **PHP**: Acts as a proxy to securely interact with the TMDb API.

## Project Structure

```bash
/movie-search-app
├── /assets
│   ├── /css
│   │   └── styles.css           # Styling for the application, generated when you run the project
│   ├── /images                  # Image files used in the project
│   └── /js
│       └── main.js              # Frontend logic (AJAX, favorites, etc.)
├── /api
│   └── routes.php               # PHP backend proxy for TMDb API
├── /scss                        # Source SCSS files for styling
├── /screenshots                 # Screenshots or preview images for the app
├── /node_modules                # Dependencies installed via npm
├── /vendor                      # Dependencies installed via Composer
├── index.html                   # Main HTML file of the application
├── .env                         # Environment variables (contains API keys, etc.)
├── .env.example                 # Example environment variables template
├── .gitignore                   # Git ignore file for sensitive or unnecessary files
├── apple-touch-icon.png         # Touch icon for Apple devices
├── composer.json                # Composer dependency manager configuration
├── composer.lock                # Locked dependency versions for Composer
├── favicon-96x96.png            # Favicon in 96x96 resolution
├── favicon.ico                  # Favicon for the app
├── favicon.svg                  # Scalable favicon
├── LICENSE                      # License file for the project
├── package.json                 # NPM dependency manager configuration
├── package-lock.json            # Locked dependency versions for NPM
├── README.md                    # Project documentation
├── setup-script.sh              # Bash script to set up the project
├── site.webmanifest             # Web app manifest for progressive web apps
├── web-app-manifest-144x144.png # Manifest image for PWA (144x144 resolution)
├── web-app-manifest-192x192.png # Manifest image for PWA (192x192 resolution)
└── web-app-manifest-512x512.png # Manifest image for PWA (512x512 resolution)
```

## Prerequisites

Before you begin, ensure you have the following:

1. **PHP** installed (e.g., [XAMPP](https://www.apachefriends.org/index.html) or [LAMP](https://ubuntu.com/tutorials/install-and-configure-lamp)).
2. **A TMDb API Key**:
   - Register at [TMDb Developer](https://developer.themoviedb.org/).
   - Obtain your API key.

# Setup and Start Script for Movie Search App

This document explains how to modify and execute the `setup-script.sh` script to automate the setup process for the Movie Search App.

## Script Features

The script performs the following tasks:

1. Clones the GitHub repository for the app.
2. Copies `.env.example` to `.env` and injects the API key.
3. Installs Node.js and PHP dependencies using `npm` and `composer`.
4. Starts `npm start` for the frontend.
5. Launches the PHP built-in server on `http://localhost:8080` for the backend.

---

## Requirements

### General Requirements

- **Git**: To clone the repository.
- **Bash Shell**: Required to run the script.
  - Linux: Pre-installed.
  - macOS: Pre-installed.
  - Windows: Use **Git Bash** or **WSL** (Windows Subsystem for Linux).

### Software Dependencies

- **Node.js**: Ensure `npm` is available in your PATH.
- **PHP**: Ensure the PHP CLI is installed and available in your PATH.
- **Composer**: PHP dependency manager.

---

## How to Modify the Script

1. Open the `setup-script.sh` file in a text editor.
2. Locate the following line:
   ```bash
   API_KEY="your_api_key_here"
   ```
3. Replace `your_api_key_here` with your actual TMDb API key. For example:
   ```bash
   API_KEY="abcd1234apikeyexample"
   ```
4. Save the file.

---

## How to Run the Script

### Linux / macOS

1. Open a terminal.
2. Navigate to the directory containing the script.
3. Make the script executable (only the first time):
   ```bash
   chmod +x setup-script.sh
   ```
4. Run the script:
   ```bash
   ./setup-script.sh
   ```

### Windows

1. Open Git Bash (or another Bash-compatible shell).
2. Navigate to the directory containing the script.
3. Make the script executable (only the first time):
   ```bash
   chmod +x setup-script.sh
   ```
4. Run the script:
   ```bash
   ./setup-script.sh
   ```

---

## What Happens After Running the Script

1. Clone the Repository:
   - The repository is cloned into the current directory.
2. Environment Setup:
   - `.env.example` is copied to `.env` and updated with your API key.
3. Dependency Installation:
   - Installs all required Node.js and PHP packages.
4. Start Services:
   - Runs `npm start` for the frontend.
   - Starts the PHP built-in server at `http://localhost:8080` for the backend.

---

## Troubleshooting

### Permission Denied

If you encounter a "Permission denied" error when running the script:

1.  Ensure the script is executable:
    ```bash
    chmod +x setup-script.sh
    ```
2.  If using Git Bash on Windows, ensure that your shell supports Bash scripting.

### Missing Dependencies

If the script fails due to missing dependencies:

- Install Node.js, PHP, and Composer, and ensure they are in your PATH.

---

## License

This script is licensed under the MIT License. Feel free to use and modify it for your projects.

# Or You Can Follow A Manual Step By Step Setup Instructions

1. Clone this repository or download the project folder.
   ```bash
   git clone https://github.com/I90rche/movie-search-app.git
   ```
2. Navigate to the project directory.
   ```bash
   cd movie-search-app
   ```
3. Copy the `.env.example` file to `.env`.
   ```bash
   cp .env.example .env
   ```
4. Open the `.env` file in a text editor and add your TMDb API key.
   ```env
   API_KEY=your_api_key_here
   ```
5. Install Node.js dependencies.
   ```bash
   npm install
   ```
6. Install PHP dependencies using Composer.
   ```bash
   composer install
   ```
7. Start the PHP built-in server.
   ```bash
   php -S localhost:8080
   ```
8. In a new terminal, start the frontend development server.
   ```bash
   npm start
   ```

---

# Enjoy using The Movie Search App! 🎥🍿
