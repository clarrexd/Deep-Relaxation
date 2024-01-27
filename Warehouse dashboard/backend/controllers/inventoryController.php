<?php
declare(strict_types=1);
require_once __DIR__ . '/../classes/Inventory.php';


class InventoryController
{
    private Inventory $inventory;

    public function __construct()
    {
        $this->inventory = new Inventory();
    }

    public function sanitizeData(array $data): array {
        $data['product_id'] = (int) filter_var($data['product_id'], FILTER_SANITIZE_NUMBER_INT);
        $data['stock_balance'] = (int) filter_var($data['stock_balance'], FILTER_SANITIZE_NUMBER_INT);

        return $data;
    }

    public function validateData(array $data): array {
        $errors = [];

        if (!isset($data['stock_balance'])) {
            $errors[] = 'Stock balance is required';
        }
        
        if (filter_var($data['stock_balance'], FILTER_VALIDATE_INT) === false) {
            $errors[] = 'Stock balance must be a number';
        }

        return $errors;
    }

    // public function getInventory():array {
    //     //Query to select info from products table and JOIN stock_balance from products_stock. See functions in Tables.php for reference
    //     $query = 
    // }

    public function processRequest(?int $ID = null): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                $data = $this->inventory->getData($ID);
                echo json_encode($data);
                break;
            case 'PATCH':
                $data = json_decode(file_get_contents("php://input"), true);
                $data = $this->sanitizeData($data);
                $errors = $this->validateData($data);
                

                if (count($errors) > 0) {
                    http_response_code(405);
                    echo json_encode(['message' => 'An error has occurred when changing stock balance', 'errors' => $errors]);
                    return;
                }

                $this->inventory->stock_balance = $data['stock_balance'];


                $this->inventory->patch();
                echo json_encode(['message' => 'Stock balance updated successfully']);

                
                break;
            default:
                http_response_code(405);
                echo json_encode(['message' => 'Method not allowed']);
                break;
        }
    }
}