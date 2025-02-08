<?php
require_once __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

try {
    $client = new \GuzzleHttp\Client();
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $apiKey = $_ENV['API_KEY'];
    $query = $_GET['query'] ?? '';
    $page = $_GET['page'] ?? 1;
    // popularity.desc

    $url = "https://api.themoviedb.org/3/search/movie?query={$query}&page={$page}";

    $response = $client->request('GET', $url, [
        'headers' => [
            'Authorization' => "Bearer {$apiKey}",
            'accept' => 'application/json',
        ],
    ]);

    echo $response->getBody();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}