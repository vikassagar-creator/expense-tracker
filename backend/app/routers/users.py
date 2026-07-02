from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserLogin
from ..auth import hash_password, verify_password,create_access_token

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
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {
         "message": "User registered successfully"
    }
@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()  
    if not db_user or not verify_password(user.password, db_user.hashed_password):
                raise HTTPException(status_code=401, detail="Invalid username or password")
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}
      
