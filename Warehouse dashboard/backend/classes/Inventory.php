<?php
declare(strict_types=1);
ini_set('display_errors', 1);
error_reporting(E_ALL);


require_once __DIR__ . '/Tables.php';

class InventoryList extends Tables
{
    protected string $tableName = 'inventory';
    protected ?string $sortBy = 'id';

    public int $id;
    public int $product_id;
    public int $stock_balance;

    
}

class Inventory extends InventoryList
{
    //Function for updating the stock balance
    public function updateStockBalance(int $id, int $stock_balance): void
    {
        $query = 'UPDATE ' . $this->tableName . ' SET stock_balance = :stock_balance WHERE product_id = :id';

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':stock_balance', $stock_balance);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    }

    //Function to get all data or get by id if provided. Null by default to make it optional.
    public function getData(?int $ID = null): array{
        $data = [];

        if ($ID != null){
            $data = $this->getById($ID);
            

        } else {
            
            $data = $this->getAll();
          
        return $data;
    }
    }
        //Get inventory data to display on the frontend. Gets data from products table via JOIN to also display more data than what is in the inventory table alone
        public function getInventoryData(?int $ID = null): array
    {
        $query = 'SELECT products.id, products.name, products.color, products.size, inventory.stock_balance
                  FROM products
                  INNER JOIN inventory ON products.id = inventory.product_id';

        if ($ID !== null) {
            $query .= ' WHERE products.id = :ID';
        }

        $stmt = $this->connection->prepare($query);

        if ($ID !== null) {
            $stmt->bindParam(':ID', $ID);
        }

        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }
}

?>