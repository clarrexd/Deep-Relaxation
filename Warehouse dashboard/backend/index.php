<?php
declare(strict_types=1);
require_once __DIR__ . '/controllers/inventoryController.php';
require_once __DIR__ . '/controllers/ordersController.php';
require_once __DIR__ . '/controllers/orderDetailsController.php';


//CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");




$URI = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

//Handling CORS pre-flight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    exit;
}


$URI = trim($URI, '/');



try {
    //Split the URL into different parts with the divider "/" to separate each part
    $parts = explode('/', $URI);

    if ($parts[0] == "warehouse") {
        $id = null;
        $status = null;

        switch($parts[1]) {
            case "orders":
                
                $controller = new OrdersController();
                break;
            case "inventory":
                $controller = new InventoryController();
                break;
            case "order-details":
                $controller = new OrderDetailsController();
                break;
            default:
                throw new Exception("Invalid path");
        }
        //Check to see that the third part of the URL must be a number to match for an id
        if(count($parts) > 2){
            if (is_numeric($parts[2])) {
                $id = (int) $parts[2];
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Invalid path input. Please provide a number corresponding to a specific ID.']);
                return;
            }
        }
        
        $controller->processRequest($id, $status);
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