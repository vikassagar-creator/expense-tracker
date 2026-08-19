from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserLogin, UserOut, UserUpdate, ChangePasswordRequest
from ..auth import hash_password, verify_password,create_access_token
from ..jwt_handler import get_current_user

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


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserOut)
def update_me(
    update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if update.username and update.username != current_user.username:
        taken = db.query(User).filter(User.username == update.username).first()
        if taken:
            raise HTTPException(status_code=400, detail="Username already taken")
        current_user.username = update.username

    if update.email and update.email != current_user.email:
        taken = db.query(User).filter(User.email == update.email).first()
        if taken:
            raise HTTPException(status_code=400, detail="Email already in use")
        current_user.email = update.email

    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/change-password")
def change_password(
    payload: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not verify_password(payload.current_password, current_user.hashed_password):
        raise HTTPException(status_code=401, detail="Current password is incorrect")

    current_user.hashed_password = hash_password(payload.new_password)
    db.commit()
    return {"message": "Password updated successfully"}
      
