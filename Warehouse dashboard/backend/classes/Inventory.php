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
    public function patch(): void
    {
        $query = 'UPDATE ' . $this->tableName . ' SET stock_balance = :stock_balance WHERE ' . $this->id . '=' . $this->product_id;

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':stock_balance', $this->stock_balance);
        $stmt->execute();
    }

    public function getData(?int $ID = null): array{
        $data = [];

        if ($ID != null){
            $data = $this->getById($ID);
            
            // // Add NumberOfSoldItems
            
            // $data[0]["NumberOfSoldItems"] = $this->getNumberOfSoldItemsBySeller($ID);

            // // Add ItemsSubmittedCount
            
            // $data[0]["ItemsSubmittedCount"] = $this->getItemsSubmittedBySeller($ID);

            // //Add getAllItems

            // $data[0]["AllItemsSubmitted"] = $this->getAllItemsSubmitted($ID);

            // //Add getTotalSales

            // $data[0]["TotalSumSold"] = $this->getTotalSales($ID);

        } else {
            //Change to getInventory()
            $data = $this->getAll();
          

        //     foreach($data as $index => $row) {
        //         // Add NumberOfSoldItems
        //         $data[$index]["NumberOfSoldItems"] = $this->getNumberOfSoldItemsBySeller($row["ID"]);
                
        //         // Add ItemsSubmittedCount
        //         $data[$index]["ItemsSubmittedCount"] = $this->getItemsSubmittedBySeller($row["ID"]);

        //         // Add getAllItems

        //         $data[$index]["AllItemsSubmitted"] = $this->getAllItemsSubmitted($row["ID"]);

        //         //Add getTotalSales

        //         $data[$index]["TotalSumSold"] = $this->getTotalSales($row["ID"]);
        //     }
        // }

        return $data;
    }


    //For reference only
    // public function getTotalSales(int $ID): int {

    //     $query = ' SELECT SUM(items.Price) AS total_sum_sold FROM items
    //     JOIN sellers ON sellers.ID = items.sellerID
    //     WHERE sellers.ID = :ID
    //     GROUP BY sellers.ID;';

    //     $stmt = $this->connection->prepare($query);
    //     $stmt->bindParam(':ID', $ID);
    //     $stmt->execute();
    //     $array = $stmt->fetchAll();
    //     if (count($array)== 0) return 0;
    //     else {
    //         return (int) $array[0]['total_sum_sold'];
    //     }
    // }


//For reference only
    // public function getNumberOfSoldItemsBySeller(int $ID): int {

    //     $query = ' SELECT COUNT(items.SellerID) AS sold_items_count FROM items
    //     JOIN sellers ON sellers.ID = items.sellerID
    //     WHERE sellers.ID = :ID AND items.Sold=1
    //     GROUP BY sellers.ID;';

    //     $stmt = $this->connection->prepare($query);
    //     $stmt->bindParam(':ID', $ID);
    //     $stmt->execute();
    //     $array = $stmt->fetchAll();
    //     if (count($array)== 0) return 0;
    //     else {
    //         return $array[0]['sold_items_count'];
    //     }
    // }

    // public function getItemsSubmittedBySeller(int $ID): int {

    //     $query = ' SELECT COUNT(items.SellerID) AS submitted_items_count FROM items
    //     JOIN sellers ON sellers.ID = items.sellerID
    //     WHERE sellers.ID = :ID
    //     GROUP BY sellers.ID;';

    //     $stmt = $this->connection->prepare($query);
    //     $stmt->bindParam(':ID', $ID);
    //     $stmt->execute();
    //     $array = $stmt->fetchAll();
    //     if (count($array)== 0) return 0;
    //     else {
    //         return $array[0]['submitted_items_count'];
    //     }
    // }

    //For reference only
    // public function getAllItemsSubmitted(int $ID): array {

    //     $query = 'SELECT Name FROM items WHERE items.SellerID = :ID;';

    //     $stmt = $this->connection->prepare($query);
    //     $stmt->bindParam(':ID', $ID);
    //     $stmt->execute();
    //     $rows = $stmt->fetchAll();

    //     $items = [];
    //     foreach($rows as $row) {
    //         array_push($items, $row['Name']);

    //     }
    //     return $items;
    }
}

?>