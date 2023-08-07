<?php

namespace App\Services;

class ApiMessage
{
    private array $response = [];

    public function __construct($error, $message, $results = [])
    {
        $this->response['error'] = $error;
        $this->response['message'] = $message;
        $this->response['results'] = $results;

    }

    public function getResponse(): array
    {
        return $this->response;
    }
}