<?php
declare(strict_types=1);
ini_set('display_errors', 1);
error_reporting(E_ALL);


class Database
{
    //Database information needed to establish a connection to the database
    protected PDO $connection;
    private const HOST = 'localhost';
    private const DB_NAME = 'deep_relaxation';
    private const USERNAME = 'root';
    private const PASSWORD = '';



    //Constructor for enabling a connection to the database
    public function __construct()
    {

        $this->connection = new PDO('mysql:host=' . self::HOST . ';dbname=' . self::DB_NAME, self::USERNAME, self::PASSWORD);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }
}
?>