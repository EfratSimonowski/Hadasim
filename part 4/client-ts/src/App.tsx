import "./App.css";
import Login from "./components/login/login";
import Orders_admin from "./components/orders/orders_admin";
import Orders from "./components/orders/orders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign_up from "./components/sign_up/sign_up";
import History from "./components/orders/history";
import Add_order from "./components/orders/add_order";
import Navbar from "./components/navbar";



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add_order"
          element={
            <>
              <Navbar />
              <Add_order />
            </>
          }
        />
        <Route
          path="/orders_admin"
          element={
            <>
              <Navbar />
              <Orders_admin />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <Orders />
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <Navbar />
              <History />
            </>
          }
        />
        <Route
          path="/add_order"
          element={
            <>
              <Navbar />
              <Add_order />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
