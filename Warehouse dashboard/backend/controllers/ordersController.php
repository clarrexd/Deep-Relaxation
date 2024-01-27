<?php
declare(strict_types=1);
require_once __DIR__ . '/../classes/Orders.php';


class OrdersController
{
    private Orders $orders;

    public function __construct()
    {
        $this->orders = new Orders();
    }

    public function sanitizeData(array $data): array {
        $data['status'] = filter_var($data['status'], FILTER_SANITIZE_SPECIAL_CHARS);
        $data['placed_by'] = (int) filter_var($data['placed_by'], FILTER_SANITIZE_NUMBER_INT);
        $data["totalSum"] = (int) filter_var($data['totalSum'], FILTER_SANITIZE_NUMBER_INT);
        


        return $data;
    }

    public function validateData(array $data): array {
        $errors = [];

        if (!isset($data['status']) || strlen($data['status']) < 1) {
            $errors[] = 'Status is required';
        }

        if (filter_var($data['status'], FILTER_VALIDATE_REGEXP, ['options' => ['regexp' => '/^[a-zåäö A-ZÅÄÖ]*$/']]) === false) {
            $errors[] = 'Status can only contain letters and spaces';
        }

        // if (!isset($data['placed_by'])) {
        //     $errors[] = 'placed_by is required';
        // }

        if (filter_var($data['placed_by'], FILTER_VALIDATE_INT) === false) {
            $errors[] = 'placed_by must be a number';
        }

        // if (!isset($data['totalSum'])) {
        //     $errors[] = 'Total sum is required';
        // }

        if (filter_var($data['totalSum'], FILTER_VALIDATE_INT) === false) {
            $errors[] = 'Total sum must be a number';
        }


        
        return $errors;
    }

    public function processRequest(?int $ID = null): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                $data = $this->orders->getData($ID);
                echo json_encode($data);
                break;
            case 'PATCH':

            $json_data = json_decode(file_get_contents("php://input"), true);

            if ($json_data === null) {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid JSON data']);
                return;
            }

            // Use the properties from the JSON data
            $id_from_json = isset($json_data['id']) ? (int)$json_data['id'] : null;
            $status_from_json = isset($json_data['status']) ? $json_data['status'] : null;

            // Update status using the retrieved properties
            $data = [
                'data' => $json_data,
                'statusUpdated' => $this->orders->updateStatus($id_from_json, $status_from_json)
            ];

            if ($id_from_json === null) {
                http_response_code(400);
                echo json_encode(['message' => 'Please provide an "id" in the JSON data']);
                return;
            }

            break;
            default:
                http_response_code(405);
                echo json_encode(['message' => 'Method not allowed']);
                break;
        }
    }
}