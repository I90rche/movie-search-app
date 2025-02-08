#!/bin/bash

# Exit immediately if a command fails
set -e

# Variables
REPO_URL="https://github.com/I90rche/movie-search-app.git"
PROJECT_DIR="movie-search-app"
PHP_SERVER_PORT=8080
API_KEY="your_api_key_here" # Replace with your actual API key

# Clone the repository
echo "Cloning the repository..."
git clone "$REPO_URL"

# Change to the project directory
cd "$PROJECT_DIR"

# Copy the .env.example to .env
echo "Copying .env.example to .env..."
cp .env.example .env

# Add the API_KEY to .env
echo "Writing API_KEY to .env..."
if grep -q '^API_KEY=' .env; then
  sed -i "s/^API_KEY=.*/API_KEY=$API_KEY/" .env
else
  echo "API_KEY=$API_KEY" >> .env
fi

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Install PHP dependencies using Composer
echo "Installing PHP dependencies..."
composer install

# Start PHP built-in server
echo "Starting PHP built-in server at http://localhost:$PHP_SERVER_PORT..."
php -S localhost:$PHP_SERVER_PORT
