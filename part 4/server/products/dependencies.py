from fastapi import HTTPException

from products.schemas import Product


def is_valid_product(product: Product) -> Product:
    if product.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be at least 1")
    return product
