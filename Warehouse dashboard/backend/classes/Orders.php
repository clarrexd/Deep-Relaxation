<?php
declare(strict_types=1);
ini_set('display_errors', 1);
error_reporting(E_ALL);


require_once 'Database.php';


class OrdersTable extends Tables
{
    protected PDO $connection;
    protected string $tableName = 'orders';

    public int $id;
    public string $created_at;
    public string $status;
    public int $placed_by;
    public int $totalSum;
    
}

class Orders extends OrdersTable
{



    public function getData(?int $id = null): array{

        if ($id != null){
            return $this->getById($id);
        }

        return $this->getAll();
    }


    
    public function updateStatus(int $id, string $status): void
    {
        $query = 'UPDATE ' . $this->tableName . ' SET status = :status WHERE id = :id';

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':status', $status);

        $stmt->execute();

        
    }


}
?>