from aiomysql import Cursor
import aiomysql.sa
from models import User
  


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

    


    async def insertUser(self, user:User):
        await self.connectToDatabase()
        cur: Cursor = await self.conn.cursor(aiomysql.DictCursor)
        query = "INSERT INTO users (username, password, email) VALUES (%s, %s, %s)"
        await cur.execute(query, [user.username, user.password, user.email])
        await self.conn.commit() #Very important row
        await cur.execute('SELECT id FROM users WHERE username = %s', [user.username])
        result=await cur.fetchone()
        # result=cur.rowcount
        await cur.close()
        self.conn.close()
        return result


