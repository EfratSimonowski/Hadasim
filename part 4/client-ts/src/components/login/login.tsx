import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSellerStateStore, useSupplyStateStore } from "../../store";
import { getSeller, getSupply } from "./query";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setSupply } = useSupplyStateStore();
  const { setSeller } = useSellerStateStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!username.trim()) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (!password.trim()) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleLogin = async () => {
    if (username && password) {
      debugger
      if (username === "admin" && password === "1234") {
        const sellerData = await getSeller(username, password);
        setSeller(sellerData);
        navigate("/Orders_admin");
      } else {
        const supplyData = await getSupply(username, password);
        setSupply(supplyData);
        navigate("/Orders");
      }
    }
  }

  return (
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
        <h1>Login</h1>
        <TextField
          label="User name"
          multiline
          required
          maxRows={4}
          sx={{ marginBottom: 2 }}
          onChange={(event) => setUsername(event.target.value)}
          error={usernameError}
          helperText={usernameError ? "required" : ""}
        />
        <TextField
          label="Password"
          multiline
          required
          maxRows={4}
          sx={{ marginBottom: 2 }}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordError}
          helperText={passwordError ? "required" : ""}
        />
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            sx={{ width: "200px", margin: 2, textTransform: "none" }}
            onClick={() => {
              handleLogin();
              handleSubmit();
            }}
          >
            Connect
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" />
        <Link href="/sign-up" sx={{ marginLeft: 2 }}>
          create your account
        </Link>
      </Box>
    </Box>
  );
}

