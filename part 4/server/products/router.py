from fastapi import APIRouter, Depends
from products.crud import get_all_products, add_product, get_product_by_id
from products.dependencies import is_valid_product
from products.schemas import Product

product_router = APIRouter()


@product_router.get("/product")
def get_products() -> list[Product]:
    return get_all_products()


@product_router.get("/product/{product_id}")
def get_product(product_id: str) -> Product:
    return get_product_by_id(product_id)


@product_router.post("/product")
def post_product(product: Product = Depends(is_valid_product)) -> Product:
    return add_product(product)
