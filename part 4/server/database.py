from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["wholesale_supply_tracker"]
products_collection = db["products"]
orders_collection = db["orders"]
suppliers_collection = db["suppliers"]
seller_collection = db["seller"]


