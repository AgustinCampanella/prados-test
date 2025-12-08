"""
Script to initialize colaborador user
Run with: python init_colaborador.py
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

async def init_colaborador():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if colaborador already exists
    existing_colaborador = await db.users.find_one({"email": "colaborador@prados.com"})
    
    # Create colaborador user
    if not existing_colaborador:
        colaborador = UserInDB(
            email="colaborador@prados.com",
            name="Colaborador Prados",
            role="colaborador",
            hashed_password=hash_password("colab123")
        )
        colaborador_dict = colaborador.model_dump()
        colaborador_dict["created_at"] = colaborador_dict["created_at"].isoformat()
        await db.users.insert_one(colaborador_dict)
        print("✅ Colaborador user created:")
        print(f"   Email: colaborador@prados.com")
        print(f"   Password: colab123")
        print(f"   Role: colaborador")
    else:
        print("⚠️  Colaborador user already exists")
    
    client.close()
    print("\n🎉 Colaborador initialization complete!")

if __name__ == "__main__":
    asyncio.run(init_colaborador())
