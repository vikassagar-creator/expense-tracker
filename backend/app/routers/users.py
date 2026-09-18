import re

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..auth import create_access_token, hash_password, verify_password
from ..database import get_db
from ..jwt_handler import get_current_user
from ..models import User
from ..schemas import ChangePasswordRequest, UserCreate, UserLogin, UserOut, UserUpdate

router = APIRouter(prefix="/users", tags=["Users"])

# Mirrors the frontend's utils/passwordRules.js so both layers enforce
# the same complexity requirements — previously only checked client-side,
# so this endpoint could be called directly to bypass it entirely.
_PASSWORD_ERROR = (
    "Password must be 8+ characters with an uppercase letter, a lowercase "
    "letter, a number, and a special character."
)


def _validate_password(password: str) -> None:
    if (
        len(password) < 8
        or not re.search(r"[A-Z]", password)
        or not re.search(r"[a-z]", password)
        or not re.search(r"[0-9]", password)
        or not re.search(r"[^A-Za-z0-9]", password)
    ):
        raise HTTPException(status_code=400, detail=_PASSWORD_ERROR)


@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    _validate_password(user.password)

    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    db_user_by_username = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(
            status_code=400, detail="User with this email already exists"
        )
    if db_user_by_username:
        raise HTTPException(
            status_code=400, detail="User with this username already exists"
        )

    # Hash the password
    hashed_password = hash_password(user.password)

    # Create the user
    db_user = User(
        username=user.username, email=user.email, hashed_password=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully"}


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

    _validate_password(payload.new_password)

    current_user.hashed_password = hash_password(payload.new_password)
    db.commit()
    return {"message": "Password updated successfully"}
