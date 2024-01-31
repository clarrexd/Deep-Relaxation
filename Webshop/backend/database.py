from aiomysql import Cursor
import aiomysql.sa
import bcrypt
from models import CreateOrder, RegisterUser
  


class Database:
    conn = None
    
    
    async def connectToDatabase(self):
        """Establishes a connection to the database"""
        self.conn = await aiomysql.connect(host='127.0.0.1', port=3306, user='root', password='', db='Deep_Relaxation')


    
    async def getFromDB(self, query):
        """Call this function in every GET endpoint to fetch data from the database"""
        await self.connectToDatabase()
        cur = await self.conn.cursor(aiomysql.DictCursor)
        await cur.execute(query)
        result = await cur.fetchall()
        await cur.close()
        self.conn.close()
        return result

    


    async def insertUser(self, user:RegisterUser):
        await self.connectToDatabase()
        cur: Cursor = await self.conn.cursor(aiomysql.DictCursor)
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        query = "INSERT INTO users (username, password, email) VALUES (%s, %s, %s)"
        await cur.execute(query, [user.username, hashed_password, user.email])
        await self.conn.commit() #Very important row. Commit changes to database
        await cur.execute('SELECT id FROM users WHERE username = %s', [user.username])
        result=await cur.fetchone()
        # result=cur.rowcount
        await cur.close()
        self.conn.close()
        return result
    
    async def insertUserFromGoogle(self, email:str):
        await self.connectToDatabase()
        cur: Cursor = await self.conn.cursor(aiomysql.DictCursor)
        query = "INSERT INTO users (email) VALUES (%s)"
        await cur.execute(query, [email])
        await self.conn.commit() #Very important row. Commit changes to database
        result=cur.rowcount
        await cur.close()
        self.conn.close()
        return result
    

    async def authenticateUser(self, username: str, password: str, required_role: str = None):
        await self.connectToDatabase()
        cur = await self.conn.cursor(aiomysql.DictCursor)

        # Retrieve stored hashed password and salt for the given username
        query = "SELECT username,password, email, role FROM users WHERE username = %s"
        await cur.execute(query, [username])
        user_data = await cur.fetchone()

        if user_data:
            stored_hashed_password = user_data["password"]

            # Check if the entered password matches the stored hashed password
            if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
                del user_data['password']


                        # Check if the user has the required role, if provided
                if required_role and user_data.get('role') != required_role:
                    return False
            
                return user_data
            else:
                return False
        else:
            return False


    async def insertOrder(self, cartList:CreateOrder):
        await self.connectToDatabase()
        cur:Cursor = await self.conn.cursor(aiomysql.DictCursor)
        query = "SELECT id FROM users WHERE email=%s"
        await cur.execute(query, [cartList.email])
        row = await cur.fetchone()
        user_id = row["id"]
            

        query = "INSERT INTO orders (placed_by, status, total_sum) VALUES (%s, %s, %s)"
        # print(isinstance(user_id, int))
        # print(isinstance(cartList.totalSum, int))
        result = await cur.execute(query, [user_id,'Created', cartList.totalSum])
        
        if (result != 1):
            await self.conn.rollback()
            raise Exception("Something went wrong, the order could not be placed. Please try again")
        
        await self.conn.commit()

        query = f"SELECT id FROM orders WHERE placed_by={user_id} ORDER BY created_at DESC"
        await cur.execute(query)
        row = await cur.fetchone()
        order_id =row["id"]
        
        
        for product in cartList.items:
            query = "INSERT INTO orders_products (orders_id,products_id, quantity) VALUES (%s, %s, %s)"
            result = await cur.execute(query, [order_id, product.id, product.quantity])

            if (result != 1):
                await self.conn.rollback()
                raise Exception("Something went wrong, the order could not be placed. Please try again")
            
         # Update stock_balance in inventory table based on quantity per item
            query = "UPDATE inventory SET stock_balance = stock_balance - %s WHERE product_id = %s"
            await cur.execute(query, [product.quantity, product.id])

            if result != 1:
                await self.conn.rollback()
                raise Exception("Failed to update stock_balance in the inventory table.")
            
        await self.conn.commit()
        return order_id    









