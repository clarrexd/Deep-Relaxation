from sqlalchemy import create_engine, Column, Integer, String, MetaData, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import databases

DATABASE_URL = "mysql+asyncmysql://root@localhost:3306/Deep_Relaxation"

database = databases.Database(DATABASE_URL)
metadata = MetaData()

engine = create_engine(DATABASE_URL)
base = declarative_base()

base.metadata.create_all(bind=engine)
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Item(base):
    __products__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    price = Column(String)
    color = Column(String)
    size = Column(String)
    stock = Column(Integer)
    imageURL = Column(String)

#Getting the database session
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()