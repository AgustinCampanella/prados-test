"""
Script to initialize projects from existing data
Run with: python init_projects.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from models import Project

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mock_projects = [
    {
        "title": "Casa Huerto Ecológico",
        "price": "$400 USD/mes",
        "address": "Km 137 Panamericana Norte",
        "area": "Desde 500 m²",
        "description": "Más de 190 familias felices. Lotes desde 500 m² con financiamiento directo.",
        "image": "https://pradosdeparaiso.com.pe/wp-content/uploads/2025/03/proyecto-casa-huerto.jpg",
        "status": "100% Entregado"
    },
    {
        "title": "Villa Eco-Sostenible",
        "price": "S/690 PEN/mes",
        "address": "Km 137 Panamericana Norte",
        "area": "Desde 200 m²",
        "description": "Frente al Humedal El Paraíso, lotes desde 200m² con acceso directo a la naturaleza.",
        "image": "https://pradosdeparaiso.com.pe/wp-content/uploads/2025/03/proyecto-villa-eco.jpg",
        "status": "Disponible"
    }
]

async def init_projects():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Clear existing projects
    await db.projects.delete_many({})
    print("🗑️  Cleared existing projects")
    
    # Insert mock projects
    for project_data in mock_projects:
        project = Project(**project_data)
        project_dict = project.model_dump()
        project_dict["created_at"] = project_dict["created_at"].isoformat()
        await db.projects.insert_one(project_dict)
        print(f"✅ Created project: {project.title}")
    
    client.close()
    print(f"\n🎉 Initialized {len(mock_projects)} projects!")

if __name__ == "__main__":
    asyncio.run(init_projects())
