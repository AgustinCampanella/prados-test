import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from datetime import datetime, timezone
import uuid

load_dotenv()

async def init_banners():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if banners already exist
    existing_count = await db.banners.count_documents({})
    if existing_count > 0:
        print(f"✓ Ya existen {existing_count} banners en la base de datos")
        return
    
    banners = [
        {
            "id": str(uuid.uuid4()),
            "title": "Tu refugio, la naturaleza",
            "description": "Vive en una villa eco-sostenible diseñada para reconectar con la tierra y disfrutar de un estilo de vida más consciente.",
            "image": "https://images.unsplash.com/photo-1686842803181-1c43ea309a3c",
            "order": 1,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Familia y Naturaleza",
            "description": "Crea recuerdos inolvidables en un entorno seguro y natural, perfecto para el bienestar de toda la familia.",
            "image": "https://images.unsplash.com/photo-1592711491694-e85f60a7773a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBvdXRkb29yfGVufDB8fHx8MTc2MzQzMDg0Mnww&ixlib=rb-4.1.0&q=85",
            "order": 2,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Arquitectura Sostenible",
            "description": "Diseños modernos que respetan el medio ambiente, integrando tecnología verde y materiales ecológicos.",
            "image": "https://images.unsplash.com/photo-1761571740780-d9149a88b759",
            "order": 3,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Humedales El Paraíso",
            "description": "A solo 3 horas de Lima, descubre un ecosistema único que inspira nuestro compromiso con la naturaleza.",
            "image": "https://images.unsplash.com/photo-1667170048452-ebecb622b96a",
            "order": 4,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    result = await db.banners.insert_many(banners)
    print(f"✓ {len(result.inserted_ids)} banners iniciales creados exitosamente")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(init_banners())
