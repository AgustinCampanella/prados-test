"""
Script to initialize test users
Run with: python init_users.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from auth_utils import hash_password
from models import UserInDB

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def init_users():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if users already exist
    existing_admin = await db.users.find_one({"email": "admin@prados.com"})
    existing_user = await db.users.find_one({"email": "user@prados.com"})
    
    # Create admin user
    if not existing_admin:
        admin = UserInDB(
            email="admin@prados.com",
            name="Admin Prados",
            role="admin",
            hashed_password=hash_password("admin123")
        )
        admin_dict = admin.model_dump()
        admin_dict["created_at"] = admin_dict["created_at"].isoformat()
        await db.users.insert_one(admin_dict)
        print("✅ Admin user created:")
        print(f"   Email: admin@prados.com")
        print(f"   Password: admin123")
        print(f"   Role: admin")
    else:
        print("⚠️  Admin user already exists")
    
    # Create regular user
    if not existing_user:
        user = UserInDB(
            email="user@prados.com",
            name="Usuario Prados",
            role="user",
            hashed_password=hash_password("user123")
        )
        user_dict = user.model_dump()
        user_dict["created_at"] = user_dict["created_at"].isoformat()
        await db.users.insert_one(user_dict)
        print("✅ Regular user created:")
        print(f"   Email: user@prados.com")
        print(f"   Password: user123")
        print(f"   Role: user")
    else:
        print("⚠️  Regular user already exists")
    
    client.close()
    print("\n🎉 User initialization complete!")

if __name__ == "__main__":
    asyncio.run(init_users())
