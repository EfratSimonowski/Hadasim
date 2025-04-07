import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from orders.router import order_router
from products.router import product_router
from seller.router import seller_router
from suppliers.router import suppliers_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(seller_router)
app.include_router(suppliers_router)
app.include_router(order_router)

if __name__ == '__main__':
    uvicorn.run(app, port=8000)
