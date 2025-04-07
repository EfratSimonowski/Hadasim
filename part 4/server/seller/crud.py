from database import seller_collection
from seller.schemas import Seller


def get_seller_by_username_password(username: str, password: str) -> Seller | None:
    seller = seller_collection.find_one({"username": username, "password": password})
    return Seller.model_validate(seller) if seller else None


