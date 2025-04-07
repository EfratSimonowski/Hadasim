from fastapi import HTTPException
from orders.schemas import Order
from products.crud import get_product_by_id
from products.schemas import Product
from suppliers.crud import get_supply_by_id
from suppliers.schemas import Supply


def is_valid_order(order: Order) -> Order:
    product: Product = get_product_by_id(order.product)
    supply: Supply = get_supply_by_id(order.supply)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    if supply is None:
        raise HTTPException(status_code=404, detail="Supply not found")
    if order.quantity_to_order <= product.quantity:
        raise HTTPException(status_code=400, detail="count must be more the min")
    return order
