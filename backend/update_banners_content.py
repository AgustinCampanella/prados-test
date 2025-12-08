import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

async def update_banners():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Define content for each banner based on title
    banner_contents = {
        "Tu refugio, la naturaleza": "Prados de Paraíso es un proyecto inmobiliario inspirado en la belleza del Humedal El Paraíso. Aquí, sostenibilidad, bienestar familiar y naturaleza se integran para crear un entorno único a solo 3 horas de Lima.",
        "Familia y Naturaleza": "Un espacio perfecto para crear recuerdos inolvidables con tu familia, rodeado de naturaleza y tranquilidad.",
        "Arquitectura Sostenible": "Diseños modernos que respetan el medio ambiente, con materiales ecológicos y tecnología verde de última generación.",
        "Humedales El Paraíso": "Descubre un ecosistema único que inspira nuestro compromiso con la conservación y el desarrollo sostenible."
    }
    
    banners = await db.banners.find({}, {"_id": 0}).to_list(1000)
    
    updated_count = 0
    for banner in banners:
        content = banner_contents.get(banner['title'], "Descubre más sobre este proyecto en Prados de Paraíso.")
        
        result = await db.banners.update_one(
            {"id": banner['id']},
            {"$set": {"content": content}}
        )
        
        if result.modified_count > 0:
            updated_count += 1
            print(f"✓ Actualizado: {banner['title']}")
    
    print(f"\n✓ Total de banners actualizados: {updated_count}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(update_banners())
