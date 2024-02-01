<?php
declare(strict_types=1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'Database.php';

class Tables extends Database
{
    protected string $tableName;
    protected ?string $sortBy = null;

    //General function for GET requests to a specific table
    protected function getAll(): array
    {
        $query = 'SELECT * FROM ' . $this->tableName;

        if ($this->sortBy != null) {
            $query .= ' ORDER BY ' . $this->sortBy;
        }

        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        $tableContent = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $tableContent;
    }

    //General function for GET requests to fetch data based on matching the id that is provided
    protected function getById(int $id): array
    {


        $query = 'SELECT * FROM ' . $this->tableName . ' WHERE id = :id';

        

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':id', $id);

        $stmt->execute();

        $tableContent = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $tableContent;

    }

}

?>