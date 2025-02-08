# The Movie Search App

Test app for job interview with Software Yard.

## Features

- **Search Movies**: Search for movies by title using a search bar.
- **Display Results**: Show movie posters, titles, release years, and descriptions.
- **View Details**: More details about a movie displayed in a modal or on a new page.
- **Favorites List**: Save favorite movies locally and view the list anytime.
- **Sorting**: Sort search results by title or release year.
- **Pagination**: Navigate between multiple pages of results.

## Technology Stack

### Frontend

- **HTML**
- **CSS** (or Bootstrap for styling)
- **JavaScript** (with AJAX for seamless data fetching)

### Backend

- **PHP**: Acts as a proxy to securely interact with the TMDb API.

## Prerequisites

Before you begin, ensure you have the following:

1. **PHP** installed (e.g., [XAMPP](https://www.apachefriends.org/index.html) or [LAMP](https://ubuntu.com/tutorials/install-and-configure-lamp)).
2. **A TMDb API Key**:
   - Register at [TMDb Developer](https://developer.themoviedb.org/).
   - Obtain your API key.

## Project Structure

```bash
/movie-search-app
├── /css
│   └── styles.css      # Styling for the application
├── /js
│   └── script.js       # Frontend logic (AJAX, favorites, etc.)
├── /php
│   └── search.php      # PHP backend proxy for TMDb API
├── index.html          # Main HTML file
├── README.md           # Project documentation
```

# Setup and Start Script for Movie Search App

This document explains how to modify and execute the `setup-movie-search-app.sh` script to automate the setup process for the Movie Search App.

## Script Features

The script performs the following tasks:

1. Clones the GitHub repository for the app.
2. Copies `.env.example` to `.env` and injects the API key.
3. Installs Node.js and PHP dependencies using `npm` and `composer`.
4. Starts `npm start` in a new terminal for the frontend.
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

1. Open the `setup-movie-search-app.sh` file in a text editor.
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
   chmod +x setup-movie-search-app.sh
   ```
4. Run the script:
   ```bash
   ./setup-movie-search-app.sh
   ```

### Windows

1. Open Git Bash (or another Bash-compatible shell).
2. Navigate to the directory containing the script.
3. Make the script executable (only the first time):
   ```bash
   chmod +x setup-movie-search-app.sh
   ```
4. Run the script:
   ```bash
   ./setup-movie-search-app.sh
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
   - Opens a new terminal and runs `npm start` for the frontend.
     Starts the PHP built-in server at `http://localhost:8080` for the backend.

---

## Notes

- If the `npm start` process doesn't open a new terminal:
  - **Windows**: Make sure you are using Git Bash and `start cmd` is available in your PATH.
  - **Linux**: Ensure `gnome-terminal` or your terminal emulator is properly configured.
  - **macOS**: Ensure the `osascript` command is available for starting new Terminal windows.

---

## Troubleshooting

### Permission Denied

If you encounter a "Permission denied" error when running the script:

1.  Ensure the script is executable:
    ```bash
    chmod +x setup-movie-search-app.sh
    ```
2.  If using Git Bash on Windows, ensure that your shell supports Bash scripting.

### Missing Dependencies

If the script fails due to missing dependencies:

- Install Node.js, PHP, and Composer, and ensure they are in your PATH.

---

## License

This script is licensed under the MIT License. Feel free to use and modify it for your projects.

## Setup Instructions

1. Clone this repository or download the project folder.
   ```bash
   git clone https://github.com/I90rche/movie-search-app.git
   ```

---

### Enjoy using the Movie Search App! 🎥🍿
