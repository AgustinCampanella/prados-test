"""
Script to initialize blog posts from mock data
Run with: python init_blogs.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from models import Blog

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mock_blogs = [
    {
        "title": "Beneficios de vivir en un entorno ecológico",
        "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop",
        "excerpt": "Descubre cómo vivir rodeado de naturaleza puede mejorar significativamente tu calidad de vida y bienestar.",
        "content": "Vivir en un entorno ecológico no solo beneficia al medio ambiente, sino que también mejora nuestra salud física y mental. Los espacios verdes reducen el estrés, mejoran la calidad del aire y promueven un estilo de vida más activo.",
        "author": "Equipo Prados de Paraíso"
    },
    {
        "title": "Puerto de Chancay: Desarrollo y valorización",
        "image": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=500&fit=crop",
        "excerpt": "El nuevo puerto de Chancay está transformando la región y generando un impacto positivo en la inversión inmobiliaria.",
        "content": "El Puerto de Chancay representa uno de los proyectos de infraestructura más importantes del Perú. Su desarrollo está atrayendo inversión y generando oportunidades de crecimiento económico en toda la región norte de Lima.",
        "author": "Análisis del Mercado"
    },
    {
        "title": "Arquitectura sostenible: El futuro es hoy",
        "image": "https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?w=800&h=500&fit=crop",
        "excerpt": "La construcción sostenible no es una tendencia, es una necesidad. Conoce cómo implementamos prácticas eco-amigables.",
        "content": "En Prados de Paraíso, implementamos técnicas de construcción sostenible que minimizan el impacto ambiental. Desde el uso de materiales reciclables hasta sistemas de energía renovable, cada detalle cuenta.",
        "author": "Equipo de Sostenibilidad"
    },
    {
        "title": "Humedales de El Paraíso: Un tesoro natural",
        "image": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=500&fit=crop",
        "excerpt": "Los humedales de El Paraíso son el hogar de más de 100 especies de aves. Conoce este ecosistema único.",
        "content": "Los humedales representan uno de los ecosistemas más ricos en biodiversidad del Perú. En nuestro proyecto, nos comprometemos a preservar y proteger este valioso recurso natural para las futuras generaciones.",
        "author": "Conservación Ambiental"
    },
    {
        "title": "Financiamiento directo: Tu casa más cerca",
        "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
        "excerpt": "Con nuestro sistema de financiamiento directo, hacer realidad tu sueño de tener una casa de campo es más fácil.",
        "content": "Ofrecemos planes de financiamiento directo flexibles y accesibles, sin necesidad de bancos. Con cuotas desde S/690 mensuales, puedes comenzar a construir el futuro que siempre soñaste para tu familia.",
        "author": "Área Comercial"
    }
]

async def init_blogs():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Clear existing blogs
    await db.blogs.delete_many({})
    print("🗑️  Cleared existing blogs")
    
    # Insert mock blogs
    for blog_data in mock_blogs:
        blog = Blog(**blog_data)
        blog_dict = blog.model_dump()
        blog_dict["created_at"] = blog_dict["created_at"].isoformat()
        await db.blogs.insert_one(blog_dict)
        print(f"✅ Created blog: {blog.title}")
    
    client.close()
    print(f"\n🎉 Initialized {len(mock_blogs)} blog posts!")

if __name__ == "__main__":
    asyncio.run(init_blogs())
