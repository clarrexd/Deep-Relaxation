<?php
declare(strict_types=1);
require_once __DIR__ . '/../classes/OrderDetails.php';

class OrderDetailsController
{
    private OrderDetailsList $orderDetails;

    public function __construct()
    {
        $this->orderDetails = new OrderDetailsList();
    }

    //Fetches order details for a specific order if id is provided, returns all if id is not provided. id is null by default to make it optional
    public function processRequest(?int $orderId = null): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                if ($orderId !== null) {
                    
                    $data = $this->orderDetails->getOrderDetailsById($orderId);
                    echo json_encode($data);
                    break;
                } else {
                    
                    $data = $this->orderDetails->getAllOrderDetails();
                }

                echo json_encode($data);
                break;
            default:
                http_response_code(405);
                echo json_encode(['message' => 'Method not allowed']);
                break;
        }
    }
}
?>
