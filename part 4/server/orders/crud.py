from fastapi.encoders import jsonable_encoder

from database import orders_collection
from orders.schemas import Order, Status


def get_all() -> list[Order]:
    orders = orders_collection.find()
    return [Order.model_validate(order) for order in orders]


def add_order(order: Order) -> None:
    orders_collection.insert_one(jsonable_encoder(order))


def update_order_status(order_id: str, status: Status) -> None:
    orders_collection.update_one(
        {"id": order_id},
        {"$set": {"status": jsonable_encoder(status)}}
    )
