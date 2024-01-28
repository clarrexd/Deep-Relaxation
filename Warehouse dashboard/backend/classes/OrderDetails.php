<?php
declare(strict_types=1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'Database.php';

class OrderDetailsList extends Database
{
    protected string $tableName = 'orders_products';

    

    protected function getAll(): array
    {
        
        $query = 'SELECT op.orders_id, op.products_id, p.Name, p.color, p.size, op.quantity, o.status
                  FROM ' . $this->tableName . ' op
                  JOIN products p ON op.products_id = p.id
                  JOIN orders o ON op.orders_id = o.id';

        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        $tableContent = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $tableContent;
    }
}

class OrderDetails extends OrderDetailsList
{

    public function getOrderDetailsById(int $orderId): array
    {
        $query = 'SELECT op.orders_id, op.products_id, p.Name, p.color, p.size, op.quantity, o.status
                  FROM ' . $this->tableName . ' op
                  JOIN products p ON op.products_id = p.id
                  JOIN orders o ON op.orders_id = o.id
                  WHERE op.orders_id = :orderId';

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':orderId', $orderId);
        $stmt->execute();
        $orderDetails = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $orderDetails;
    }
}
?>
