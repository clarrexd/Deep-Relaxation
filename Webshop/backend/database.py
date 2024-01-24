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
        r = await cur.fetchall()
        await cur.close()
        self.conn.close()
        return r

    


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
    

    async def authenticateUser(self, username: str, password: str):
        await self.connectToDatabase()
        cur = await self.conn.cursor(aiomysql.DictCursor)

        # Retrieve stored hashed password and salt for the given username
        query = "SELECT username,password, email FROM users WHERE username = %s"
        await cur.execute(query, [username])
        user_data = await cur.fetchone()

        if user_data:
            stored_hashed_password = user_data["password"]

            # Check if the entered password matches the stored hashed password
            if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
                del user_data['password']
                return user_data
            else:
                return False
        else:
            return False


    async def createOrder(cartList:CreateOrder):
        for product in cartList:
            query = f"INSERT INTO orders (placed_by) VALUES ({cartList.email})"
