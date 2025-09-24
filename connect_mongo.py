from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime

# Connection URI from your MongoDB Atlas cluster
uri = "mongodb+srv://sghyashika123:SafarGuardia@safarguardia.ptbrjvk.mongodb.net/?retryWrites=true&w=majority&appName=SafarGuardia"

# Create a new MongoClient with Server API version 1
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Test connection
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"An error occurred while connecting to MongoDB: {e}")
    exit()  # Stop execution if connection fails

# ✅ Define database and collection OUTSIDE try-except
db = client.SafarGuardia  # Access database named 'SafarGuardia'
collection = db.example_collection  # Access collection named 'example_collection'

# Example: Insert a document
result = collection.insert_one({
    "name": "test",
    "value": 123,
    "timestamp": datetime.now()
})
print(f"Inserted document with id {result.inserted_id}")
