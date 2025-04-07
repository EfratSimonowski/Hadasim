export interface Supply {
    id?: string
    username: string
    password: string
    company_name: string
    representative_name: string
    phone_number: string
    products: Product[] | string[];
}

export enum Status {
    STARTED = "Started",
    IN_PROGRESS = "In Progress",
    FINISHED = "Finished"
}

export interface Order {
    id?: string
    supply: Supply | string
    quantity_to_order: number
    status: Status
    product: Product | string
}

export interface Product {
    id?: string
    product_name: string
    price: number
    quantity: number
}

export interface Seller {
    id: string
    username: string
    password: string
}

