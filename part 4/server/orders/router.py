from fastapi import APIRouter, Depends

from orders.crud import get_all, add_order, update_order_status
from orders.dependencies import is_valid_order
from orders.schemas import Order, Status

order_router = APIRouter()


@order_router.get("/order")
def get_orders() -> list[Order]:
    return get_all()


@order_router.post("/order")
def post_order(order: Order = Depends(is_valid_order)) -> None:
    add_order(order)


@order_router.patch("/order/{order_id}/{status}")
def update_status(order_id: str, status: Status) -> None:
    update_order_status(order_id, status)
