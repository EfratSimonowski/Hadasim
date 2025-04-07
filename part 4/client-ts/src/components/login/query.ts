import axios from "axios"
import { Seller, Supply } from "../../types"

async function fetchSupply(username: string, password: string): Promise<Supply> {
  const responseSupply = (await axios.get(`http://127.0.0.1:8000/supply/${username}/${password}`)).data

  return responseSupply;
}

export function getSupply(username: string, password: string): Promise<Supply> {
  return fetchSupply(username, password)
    .then((supply) => {
      return supply
    })
    .catch((error) => {
      alert("username and password not found")
      throw error;
    });
}


async function fetchSeller(username: string, password: string): Promise<Seller> {
  const responseSeller = (await axios.get(`http://127.0.0.1:8000/seller/${username}/${password}`)).data

  return responseSeller;
}

export function getSeller(username: string, password: string): Promise<Seller> {
  return fetchSeller(username, password)
    .then((seller) => {
      return seller
    })
    .catch((error) => {
      alert('Failed to fetch seller:');
      throw error;
    });
}

