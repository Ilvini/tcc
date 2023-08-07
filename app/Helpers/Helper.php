<?php

use App\Services\ApiMessage;

if (!function_exists('apiResponse')) {
    function apiResponse(bool $error, string $message, mixed $data = [], int $status = 200) {
        return response()->json((new ApiMessage($error, $message, $data))->getResponse(), $status);
    }
}
