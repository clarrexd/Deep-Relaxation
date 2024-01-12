import aiomysql.sa
  


class Database:
    conn = None
    
    #Establishes a connection to the database
    async def connectToDatabase(self):
        
        self.conn = await aiomysql.connect(host='127.0.0.1', port=3306, user='root', password='', db='Deep_Relaxation')


    #Call this function in every endpoint that needs an SQL query to the DB
    async def fetchFromDB(self, query):

        await self.connectToDatabase()
        cur = await self.conn.cursor(aiomysql.DictCursor)
        await cur.execute(query)
        r = await cur.fetchall()
        await cur.close()
        self.conn.close()
        return r




