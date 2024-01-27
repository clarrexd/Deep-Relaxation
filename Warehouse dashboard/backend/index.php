<?php
declare(strict_types=1);
require_once __DIR__ . '/controllers/inventoryController.php';
require_once __DIR__ . '/controllers/ordersController.php';


header('Content-Type: application/json');


$URI = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];


$URI = trim($URI, '/');



try {
    $parts = explode('/', $URI);

    if ($parts[0] == "warehouse") {
        $ID = null;
        $status = null;

        switch($parts[1]) {
            case "orders":
                $controller = new OrdersController();
                break;
            case "inventory":
                //$controller = new InventoryController();
                break;
            default:
                throw new Exception("Invalid path");
        }

        if(count($parts) > 2){
            if (is_numeric($parts[2])) {
                $ID = (int) $parts[2];
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Invalid path input. Please provide a number corresponding to a specific ID.']);
                return;
            }
        }

        $controller->processRequest($ID, $status);
        return;
    }

} catch (Exception $exception) {
    http_response_code(500);
    echo json_encode([
        'message' => 'The server is crashing and burning. Good job',
        'Error' => $exception->getMessage()
    ]);
    return;
}



http_response_code(404);
echo json_encode(['message' => 'Not Found, I am deeply sorry.']);