from bson import ObjectId
from pydantic import BaseModel, Field


class Seller(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    username: str
    password: str
