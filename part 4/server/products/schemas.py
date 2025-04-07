from bson import ObjectId
from pydantic import BaseModel, Field


class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    product_name: str
    price: float
    quantity: int
