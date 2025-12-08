from fastapi import APIRouter, HTTPException, Depends, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from models import QuoteRequest, User
from auth_utils import get_current_user, get_current_admin_or_colaborador
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter(prefix="/quotes", tags=["Quotes"])

async def get_db():
    """Dependency to get database instance"""
    from server import db
    return db

security = HTTPBearer(auto_error=False)

async def get_current_user_optional(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[User]:
    """Get current user from JWT token, return None if no token provided"""
    if not credentials:
        return None
    
    try:
        from auth_utils import decode_access_token
        from server import db
        
        token = credentials.credentials
        payload = decode_access_token(token)
        
        user_id = payload.get("sub")
        if user_id is None:
            return None
        
        # Get user from database
        user_data = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user_data is None:
            return None
        
        return User(**user_data)
    except:
        return None

@router.post("/", response_model=QuoteRequest)
async def create_quote(
    quote_data: QuoteRequest,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Create a new quote request (authenticated users have their info auto-filled)"""
    # If user is authenticated, associate quote with user
    if current_user:
        quote_data.user_id = current_user.id
    
    # Save to database
    quote_dict = quote_data.model_dump()
    quote_dict["created_at"] = quote_dict["created_at"].isoformat()
    
    await db.quotes.insert_one(quote_dict)
    
    return quote_data

@router.get("/", response_model=List[QuoteRequest])
async def get_all_quotes(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(get_current_admin_or_colaborador)
):
    """Get all quote requests (admin or colaborador)"""
    quotes = await db.quotes.find({}, {"_id": 0}).to_list(1000)
    return quotes

@router.get("/my-quotes", response_model=List[QuoteRequest])
async def get_my_quotes(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's quote requests"""
    quotes = await db.quotes.find({"user_id": current_user.id}, {"_id": 0}).to_list(1000)
    return quotes
