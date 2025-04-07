from fastapi import APIRouter

from seller.crud import get_seller_by_username_password
from seller.schemas import Seller

seller_router = APIRouter()


@seller_router.get("/seller/{username}/{password}")
def get_seller(username: str, password: str) -> Seller | None:
    return get_seller_by_username_password(username, password)
