import AddIcon from "@mui/icons-material/Add";
import EastIcon from '@mui/icons-material/East';
import { IconButton } from '@mui/material';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product, Supply } from "../../types";
import AddProduct from "./add_product";
import { addProduct, addSupply } from "./query";

export default function Sign_up() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [supply, setSupply] = useState<Supply>({} as Supply);
  const [showError, setShowError] = useState<boolean>(false);

  const handleBackClick = () => {
    navigate("/Login");
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    setOpen(false);
  };

  const handleAddSupply = async () => {
    if (supply.username && supply.company_name && supply.password && supply.phone_number && /^05\d{8}$/.test(supply.phone_number) && supply.representative_name && products.length > 0) {
      setShowError(false)
      let pId: string[] = []
      let i
      for (i = 0; i < products.length; i++) {
        await addProduct(products[i]).then((data: Product) => {
          if (data.id !== undefined) {
            pId.push(data.id)
          }
        })
      }
      supply.products = pId

      addSupply(supply)
      navigate("/login")
    } else {
      setShowError(true)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    const isNumber = /^[0-9]$/.test(key);
    const allowedControlKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'
    ];

    if (!isNumber && !allowedControlKeys.includes(key)) {
      event.preventDefault();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        onClick={handleBackClick}
        sx={{
          position: 'absolute',
          top: 1,
          right: 10,
        }}
      >
        <EastIcon />
      </IconButton>
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
            height: 600,
          },
        }}
      >
        <Box width={"80%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
          <h1>Sign up</h1>
          <TextField
            required
            label="User name"
            multiline
            maxRows={4}
            sx={{ marginBottom: 2 }}
            onChange={(event) => setSupply({ ...supply, username: event.target.value })}
            error={!supply.username && showError ? true : false}
            helperText={!supply.username && showError ? "required" : ""}
          />
          <TextField
            required
            label="Password"
            multiline
            maxRows={4}
            sx={{ marginBottom: 2 }}
            onChange={(event) => setSupply({ ...supply, password: event.target.value })}
            error={!supply.password && showError ? true : false}
            helperText={!supply.password && showError ? "required" : ""}
          />
          <TextField
            required
            label="Company name"
            multiline
            maxRows={4}
            sx={{ marginBottom: 2 }}
            onChange={(event) => setSupply({ ...supply, company_name: event.target.value })}
            error={!supply.company_name && showError ? true : false}
            helperText={!supply.company_name && showError ? "required" : ""}
          />
          <TextField
            required
            label="Phone number"
            multiline
            maxRows={4}
            sx={{ marginBottom: 2 }}
            onChange={(event) => setSupply({ ...supply, phone_number: event.target.value })}
            error={
              showError &&
              (!supply.phone_number ||
                !/^05\d{8}$/.test(supply.phone_number))
            }
            helperText={
              showError &&
              (!supply.phone_number
                ? "Required"
                : !/^05\d{8}$/.test(supply.phone_number)
                  ? "Phone number must start with 05 and be 10 digits"
                  : "")
            }
            onKeyDown={handleKeyDown}
          />
          <TextField
            required
            label="Representative name"
            multiline
            maxRows={4}
            sx={{ marginBottom: 2 }}
            onChange={(event) => setSupply({ ...supply, representative_name: event.target.value })}
            error={!supply.representative_name && showError ? true : false}
            helperText={!supply.representative_name && showError ? "required" : ""}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Chip
              icon={<AddIcon />}
              label="Add product"
              onClick={() => setOpen(true)}
              sx={{ width: "150px", fontSize: "0.8rem", padding: "5px" }}
            />
          </Box>
          <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            <AddProduct onClose={handleAddProduct} />
          </Dialog>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{ width: "200px", margin: 2, textTransform: "none" }}
              onClick={handleAddSupply}
            >
              Sign up
            </Button>
          </Box>
        </Box>

        {products.length > 0 && (
          <Box
            sx={{
              maxHeight: "570px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "8px",
              marginBottom: "16px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {products.map((product, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={` ${product.product_name}`}
                      secondary={` price: ${product.price} ₪ | min quantity: ${product.quantity}`}
                    />
                  </ListItem>
                  {index < products.length - 1 && <Divider variant="middle" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

      </Box>
    </div>
  );
}
