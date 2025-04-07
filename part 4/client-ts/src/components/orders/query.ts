import axios from 'axios';
import { Order, Product, Status, Supply } from "../../types";

async function fetchOrders(): Promise<Order[]> {
  let orders: Order[] = []
  const responseOrders = (await axios.get('http://127.0.0.1:8000/order')).data
  let i
  for (i = 0; i < responseOrders.length; i++) {
    const order = responseOrders[i]
    const supply = (await axios.get(`http://127.0.0.1:8000/supply/${order.supply}`)).data
    const product = (await axios.get(`http://127.0.0.1:8000/product/${order.product}`)).data
    const orderToPush: Order = { id: order.id, quantity_to_order: order.quantity_to_order, supply: supply, product: product, status: order.status }
    orders.push(orderToPush)
  }

  return orders;
}

export function getOrders(): Promise<Order[]> {
  return fetchOrders()
    .then((orders) => {
      return orders;
    })
    .catch((error) => {
      console.error('Failed to fetch orders:', error);
      throw error;
    });
}

async function updateStatus(order_id: string, status: Status): Promise<null> {
  await axios.patch(`http://127.0.0.1:8000/order/${order_id}/${status}`);

  return null;
}

export function updateStatusOrder(order_id: string, status: Status): Promise<null> {
  return updateStatus(order_id, status)
    .then(() => {
      return null;
    })
    .catch((error) => {
      alert("Failed to change status");
      throw error;
    });
}

async function fetchSuppliers(): Promise<Supply[]> {
  return (await axios.get('http://127.0.0.1:8000/supply')).data;
}

export function getSuppliers(): Promise<Supply[]> {
  return fetchSuppliers()
    .then((suppliers) => {
      return suppliers;
    })
    .catch((error) => {
      alert('Failed to fetch suppliers:');
      throw error;
    });
}

async function fetchProducts(): Promise<Product[]> {
  return (await axios.get("http://127.0.0.1:8000/product")).data;
}

export function getProducts(): Promise<Product[]> {
  return fetchProducts()
    .then((products) => {
      return products;
    })
    .catch((error) => {
      alert('Failed to fetch products:');
      throw error;
    });
}

async function postOrder(order: Order): Promise<null> {
  await axios.post("http://127.0.0.1:8000/order", order);

  return null;
}

export function addOrder(order: Order): Promise<null> {
  return postOrder(order)
    .then(() => {
      return null;
    })
    .catch((error) => {
      alert("Failed to add Order");
      throw error;
    });
}

