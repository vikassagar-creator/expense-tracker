from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from ..schemas import UserCreate
from ..auth import hash_password

router = APIRouter(
    prefix="/users",
    tags=["Users"]
) 

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    db_user_by_username = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    if db_user_by_username:
        raise HTTPException(status_code=400, detail="User with this username already exists")

    # Hash the password
    hashed_password = hash_password(user.password)

    # Create the user
    db_user = return{"message": "User registered successfully"}
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user