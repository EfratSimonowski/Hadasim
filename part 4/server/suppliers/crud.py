from bson import ObjectId
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from database import suppliers_collection
from suppliers.schemas import Supply
from seller.crud import get_seller_by_username_password

def get_supply_by_username_password(username: str, password: str) -> Supply:
    if get_seller_by_username_password(username, password) is not None:
        raise HTTPException(status_code=400, detail="You cannot use these username and password")
    supply = suppliers_collection.find_one({"username": username, "password": password})
    if supply is None:
        raise HTTPException(status_code=404, detail="Supply not found")
    if not username or not password:
        raise HTTPException(status_code=422, detail="Username and password must be provided")
    return Supply.model_validate(supply)



def get_all_suppliers() -> list[Supply]:
    suppliers = suppliers_collection.find()
    return [Supply.model_validate(supply) for supply in suppliers]


def add_supply(supply: Supply) -> None:
    suppliers_collection.insert_one(jsonable_encoder(supply))


def get_supply_by_id(supply_id: str) -> Supply:
    supply = suppliers_collection.find_one({"id": supply_id})
    return Supply.model_validate(supply)
