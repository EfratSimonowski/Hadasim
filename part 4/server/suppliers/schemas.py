from bson import ObjectId
from pydantic import BaseModel, Field

from products.schemas import Product


class Supply(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    username: str
    password: str
    company_name: str
    representative_name: str
    phone_number: str
    products: list[str]
