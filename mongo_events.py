from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime

# MongoDB Connection URI
uri = "mongodb+srv://sghyashika123:SafarGuardia@safarguardia.ptbrjvk.mongodb.net/?retryWrites=true&w=majority&appName=SafarGuardia"
client = MongoClient(uri, server_api=ServerApi('1'))

# Test connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. Connected to MongoDB! ✅")
except Exception as e:
    print(f"Connection failed: {e}")
    exit()

# Database & Collection
db = client.SafarGuardia
collection = db.events  # Collection for all events (login, SOS, etc.)

# Function to log events
def log_event(username, event_type):
    data = {
        "username": username,
        "event": event_type,
        "timestamp": datetime.now()
    }
    collection.insert_one(data)
    print(f"{event_type} event logged for {username}")

# Example usage
log_event("Yashika", "login")   # Call when user logs in
log_event("Yashika", "SOS")     # Call when user clicks SOS
