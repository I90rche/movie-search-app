<?php
require_once __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

try {
  $client = new \GuzzleHttp\Client();
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
  $dotenv->load();

  $apiKey = $_ENV['API_KEY'];
  $action = $_GET['action'] ?? '';
  $url = '';
  $method = 'GET';

  switch ($action) {
    case 'search':
      $query = $_GET['query'] ?? '';
      $page = $_GET['page'] ?? 1;

      if (empty($query)) {
        throw new Exception('Please enter a search query.');
      }

      $url = "https://api.themoviedb.org/3/search/movie?query={$query}&page={$page}";
      $method = 'GET';
      break;

    case 'details':
      $movie_id = $_GET['movie_id'] ?? '';

      if (empty($movie_id)) {
        throw new Exception('Looks like there are no detail about this movie.');
      }

      $url = "https://api.themoviedb.org/3/movie/{$movie_id}";
      $method = 'GET';
      break;

    default:
      throw new Exception('Invalid action.');
  }

  $response = $client->request('GET', $url, [
    'headers' => [
      'Authorization' => "Bearer {$apiKey}",
      'accept' => 'application/json',
    ],
  ]);

  echo $response->getBody();
} catch (\GuzzleHttp\Exception\ClientException $e) {
  $response = $e->getResponse();
  $responseBodyAsString = $response->getBody()->getContents();
  $responseBody = json_decode($responseBodyAsString, true);
  $errorMessage = $responseBody['status_message'] ?? 'Client error';
  echo json_encode(['error' => $errorMessage]);
} catch (\GuzzleHttp\Exception\ServerException $e) {
  $response = $e->getResponse();
  $responseBodyAsString = $response->getBody()->getContents();
  $responseBody = json_decode($responseBodyAsString, true);
  $errorMessage = $responseBody['status_message'] ?? 'Server error';
  echo json_encode(['error' => $errorMessage]);
} catch (\Exception $e) {
  echo json_encode(['error' => 'General error: ' . $e->getMessage()]);
}
