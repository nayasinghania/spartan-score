import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()


def get_database():
    uri = os.getenv("DATABASE_URL")
    client = MongoClient(uri)
    db = client.get_database("spartan_score_db")
    return db
