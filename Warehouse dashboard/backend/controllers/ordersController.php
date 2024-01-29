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



    public function processRequest(?int $id = null): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                $data = $this->orders->getData($id);
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

            echo json_encode((['message' => 'Status updated successfully.']));

            break;
            default:
                http_response_code(405);
                echo json_encode(['message' => 'Method not allowed']);
                break;
        }
    }
}