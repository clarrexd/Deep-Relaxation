<?php
declare(strict_types=1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'Database.php';

class OrderDetailsList extends Tables
{
    protected string $tableName = 'orders_products';

    

    public function getAllOrderDetails(?int $orderId = null): array
    {
        
        $query = 'SELECT op.orders_id, op.products_id, p.Name, p.color, p.size, op.quantity, o.status
                  FROM orders_products op
                  JOIN products p ON op.products_id = p.id
                  JOIN orders o ON op.orders_id = o.id';

        // If a specific orderId is provided, add a WHERE clause to filter by that orderId
        if ($orderId !== null) {
            $query .= ' WHERE op.orders_id = :orderId';
        }
        $stmt = $this->connection->prepare($query);

        // If a specific orderId is provided, bind the parameter
        if ($orderId !== null) {
            $stmt->bindParam(':orderId', $orderId, PDO::PARAM_INT);
        }
        $stmt->execute();
        $tableContent = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $tableContent;
    }

        public function getOrderDetailsById(int $orderId): array
    {
        return $this->getAllOrderDetails($orderId);
    }
}





?>
