import { Button, DialogActions, DialogContent, } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Product } from "../../types";

interface AddProductProps {
  onClose: (newProduct: Product) => void;
}

export default function AddProduct({ onClose }: AddProductProps) {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [showError, setShowError] = useState<boolean>(false);

  const handleAdd = () => {
    if (productName.trim() && price && price > 0 && quantity && quantity > 0) {
      setShowError(false)
      const newProduct: Product = {
        product_name: productName.trim(),
        price,
        quantity,
      };
      onClose(newProduct);
      setProductName("");
      setPrice(0);
      setQuantity(0);
    } else {
      setShowError(true);
    }
  };
  return (
    <>
      <Box textAlign="center">
        <h2>Add a New Product</h2>
      </Box>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Product Name"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            error={!productName && showError ? true : false}
            helperText={!productName && showError ? "required" : ""}
          />
          <TextField
            label="Price"
            required
            type="number"
            fullWidth
            inputProps={{ min: 1 }}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            error={(!price || price <= 0) && showError ? true : false}
            helperText={!price && showError ? "required" : price <= 0 && showError ? "price must more than 0" : ""}
          />
          <TextField
            label="Minimum quantity"
            required
            type="number"
            fullWidth
            inputProps={{ min: 1 }}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            error={(!quantity || quantity <= 0) && showError ? true : false}
            helperText={!quantity && showError ? "required" : quantity <= 0 && showError ? "quantity must more than 0" : ""}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ width: "95%", display: "flex", justifyContent: "center" }}>
        <Button variant="contained" sx={{ width: "200px", margin: 2, textTransform: "none" }} onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </>
  );
}
