import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useOrdersStateStore } from "../../store";
import { Order, Product, Status, Supply } from "../../types";
import { addOrder, getProducts, getSuppliers } from "./query";

export default function Add_order() {
  const [suppliers, setSuppliers] = useState<Supply[]>([]);
  const [order, setOrder] = useState<Order>({} as Order);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsForSupply, setProductsForSupply] = useState<Product[]>([]);
  const { orders, setOrders } = useOrdersStateStore();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    getSuppliers()
      .then((suppliers) => {
        setSuppliers(suppliers);
      })

    getProducts().then((products) => {
      setProducts(products);
    })

  }, []);

  function setSupply(newValue: Supply | null) {
    if (newValue) {
      order.supply = newValue
      setOrder(order)
      getProductsForSupply()
    }
  }

  function setproduct(newValue: Product | null) {
    if (newValue) {
      order.product = newValue
      setOrder(order)
    }
  }

  function setQuantity(newValue: number) {
    debugger
    if (newValue) {
      order.quantity_to_order = newValue
      setOrder(order)
    }
  }

  const navigate = useNavigate();

  function getProductsForSupply() {
    let productForSupply: Product[] = []
    products.map((p) => {
      if (order.supply != undefined && typeof order.supply != "string" && order.supply.products.find((id) => id == p.id)) {
        productForSupply.push(p)
      }
    })

    setProductsForSupply(productForSupply)
  }

  const handleAddClick = () => {
    if (order.supply && order.product && order.quantity_to_order && typeof order.product !== "string" && order.quantity_to_order > order.product.quantity && typeof order.supply !== "string") {
      setShowError(false)
      const supplyId: string = order.supply.id ? order.supply.id : ""
      const productId: string = order.product.id ? order.product.id : ""
      const orderToAdd: Order = { supply: supplyId, product: productId, quantity_to_order: order.quantity_to_order, status: Status.STARTED }
      addOrder(orderToAdd).then(() => {
        alert("Order added successfully")
        navigate('/Orders_admin');
        let ordersToAdd = orders
        ordersToAdd.push(order)
        setOrders(ordersToAdd)
      })
    } else {
      setShowError(true)
    }


  };

  return (
    <div style={{ position: 'relative' }}>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexWrap: "wrap",
          boxShadow: 3,
          borderRadius: "16px",
          "& > :not(style)": {
            m: 4,
            width: 450,
            height: 500,
          },
        }}
      >
        <Box
          width={"80%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <h1>Add order</h1>
          <Autocomplete
            disablePortal
            options={suppliers}
            getOptionLabel={(option) => option.representative_name}
            sx={{ width: 450, marginBottom: 2 }}
            onChange={(event, newValue) => {
              setSupply(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Supplier"
                error={!order.supply && showError}
                helperText={!order.supply && showError ? "required" : ""}
              />
            )}
          />
          <Autocomplete
            disablePortal
            options={productsForSupply}
            getOptionLabel={(option) => option.product_name}
            onChange={(event, newValue) => {
              setproduct(newValue);
            }}
            sx={{ width: 450, marginBottom: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Product"
                error={!order.product && showError}
                helperText={!order.product && showError ? "required" : ""}
              />
            )}
          />
          <TextField
            label="quantity"
            required
            type="number"
            fullWidth
            value={order.quantity_to_order}
            inputProps={{ min: 1 }}
            onChange={(e) => setQuantity(Number(e.target.value))}
            error={(!order.quantity_to_order || order.quantity_to_order <= 0 || (order.product !== undefined && typeof order.product !== "string" && order.quantity_to_order < order.product.quantity)) && showError ? true : false}
            helperText={!order.quantity_to_order && showError ? "required" : order.product !== undefined && typeof order.product !== "string" && order.quantity_to_order < order.product.quantity && showError ? `Quantity should be more than ${order.product.quantity}` : ""}
          />
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{ width: "200px", margin: 2, textTransform: "none" }}
              onClick={handleAddClick}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
