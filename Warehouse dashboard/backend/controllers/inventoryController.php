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




    public function processRequest(?int $ID = null): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                $data = $this->inventory->getInventoryData($ID);
                echo json_encode($data);
                break;
            case 'PATCH':
            $data = json_decode(file_get_contents("php://input"), true);

            // This makes sure both 'id' and 'stock_balance' are provided in the request body
            if (isset($data['id']) && isset($data['stock_balance'])) {
                $id = (int)$data['id'];
                $stock_balance = (int)$data['stock_balance'];

                // Update the stock balance using the method from Inventory class
                $this->inventory->updateStockBalance($id, $stock_balance);

                echo json_encode(['message' => 'Stock balance updated successfully']);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid request body. Both "id" and "stock_balance" are required.']);
            }
            break;
            default:
                http_response_code(405);
                echo json_encode(['message' => 'Method not allowed']);
                break;
        }
    }
}