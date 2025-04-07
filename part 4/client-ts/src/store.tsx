import { Order, Seller, Supply } from "./types";
import { create } from 'zustand';

export interface SupplyState {
    supply: Supply;
    setSupply: (supply: Supply) => void;
}

export const useSupplyStateStore = create<SupplyState>((set) => ({
    supply: {} as Supply,
    setSupply: (supply: Supply) => set({ supply }),
}));

export interface SellerState {
    seller: Seller;
    setSeller: (seller: Seller) => void;
}

export const useSellerStateStore = create<SellerState>((set) => ({
    seller: {} as Seller,
    setSeller: (seller: Seller) => set({ seller }),
}));

export interface OrdersState {
    orders: Order[];
    setOrders: (orders: Order[]) => void;
}

export const useOrdersStateStore = create<OrdersState>((set) => ({
    orders: [] as Order[],
    setOrders: (orders: Order[]) => set({ orders }),
}));


