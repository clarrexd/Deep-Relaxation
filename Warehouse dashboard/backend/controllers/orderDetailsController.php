<?php
declare(strict_types=1);
require_once __DIR__ . '/../classes/OrderDetails.php';

class OrderDetailsController
{
    private OrderDetails $orderDetails;

    public function __construct()
    {
        $this->orderDetails = new OrderDetails();
    }

    public function processRequest(?int $orderId = null): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                if ($orderId !== null) {
                    
                    $data = $this->orderDetails->getOrderDetailsById($orderId);
                    echo json_encode($data);
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
