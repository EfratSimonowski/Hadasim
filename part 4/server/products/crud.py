from bson import ObjectId
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from database import products_collection
from products.schemas import Product


def get_all_products() -> list[Product]:
    return products_collection.find() or []


def add_product(product: Product) -> Product:
    result = products_collection.insert_one(jsonable_encoder(product))
    product.id = str(result.inserted_id)

    return Product.model_validate(product)


def get_product_by_id(product_id: str) -> Product:
    product = products_collection.find_one({"id": product_id})
    return Product.model_validate(product)
