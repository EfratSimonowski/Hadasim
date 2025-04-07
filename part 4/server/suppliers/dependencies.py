import re
from builtins import super

from fastapi import HTTPException

from database import suppliers_collection, products_collection
from products.crud import get_product_by_id
from suppliers.schemas import Supply


def is_valid_supply(supply: Supply) -> Supply:
    if suppliers_collection.find_one({"username": supply.username, "password": supply.password}) is not None:
        raise HTTPException(status_code=400, detail=".....")

    if not re.match(r"^\+?[0-9]{10,15}$", supply.phone_number):
        raise HTTPException(status_code=404,
                            detail="Invalid phone number. Must be 10 to 15 digits and may start with a '+'.")
    return supply
