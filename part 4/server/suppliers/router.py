from fastapi import APIRouter, Depends

from suppliers.crud import get_supply_by_username_password, add_supply, get_all_suppliers, get_supply_by_id
from suppliers.dependencies import is_valid_supply
from suppliers.schemas import Supply

suppliers_router = APIRouter()


@suppliers_router.get("/supply/{username}/{password}")
def get_supply(username: str, password: str) -> Supply:
    return get_supply_by_username_password(username, password)


@suppliers_router.get("/supply/{supply_id}")
def get_one_supply_by_id(supply_id: str) -> Supply:
    return get_supply_by_id(supply_id)


@suppliers_router.post("/supply")
def post_supply(supply: Supply = Depends(is_valid_supply)) -> None:
    add_supply(supply)


@suppliers_router.get("/supply")
def get_suppliers() -> list[Supply]:
    return get_all_suppliers()
