import axios from "axios";
import { Product, Supply } from "../../types";

async function postSupply(supply: Supply): Promise<null> {
  await axios.post("http://127.0.0.1:8000/supply/", supply);
  return null;
}

export function getProductID(supply: Supply) {
  debugger
  let pId: string[] = []
  supply.products.map((p) => {
    console.log(typeof p)
    if (typeof p !== "string") {
      addProduct(p).then((data) => {
        debugger

        if (data.id !== undefined){
          debugger
          pId.push(data.id)
        }
          
      })
    }
  })
  debugger
  supply.products = pId


  return supply
}


export function addSupply(supply: Supply): Promise<null> {
  debugger
  return postSupply(supply)
    .then(() => {
      alert(" successfully!");
      return null;
    })
    .catch((error) => {
      alert("Failed to add");
      console.error("Error updating status:", error);
      throw error;
    });
}

async function postProduct(product: Product): Promise<Product> {
  debugger

  return (await (axios.post("http://127.0.0.1:8000/product/", product))).data;
}


export async function addProduct(product: Product): Promise<Product> {
  return await postProduct(product)
    .then((data) => {
      alert(" successfully!");
      debugger
      return data;
    })
    .catch((error) => {
      alert("Failed to add");
      console.error("Error updating status:", error);
      throw error;
    });
}