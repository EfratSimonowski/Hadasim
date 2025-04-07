from enum import Enum
from bson import ObjectId
from pydantic import BaseModel, Field



class Status(Enum):
    STARTED = "Started"
    IN_PROGRESS = "In Progress"
    FINISHED = "Finished"


class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    supply: str
    quantity_to_order: int
    status: Status
    product: str
