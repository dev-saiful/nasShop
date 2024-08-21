import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Carts from "./pages/Carts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Shipping from "./pages/Shipping";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Payment from "./pages/Payment";
import Placeorder from "./pages/Placeorder";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import AdminRoute from "./components/AdminRoute";
import AdminOrderList from "./pages/admin/AdminOrderList";
import ProductsList from "./pages/admin/ProductsList";
import ProductEditList from "./pages/admin/ProductEditList";
import UserList from "./pages/admin/UserList";

function App() {
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/search/:keyword" element={<Home></Home>}></Route>
        <Route path="/page/:pageNumber" element={<Home></Home>}></Route>
        <Route path="/search/:keyword/page/:pageNumber" element={<Home></Home>}></Route>
        <Route path="/product/:productId" element={<Product></Product>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/cart" element={<Carts></Carts>}></Route>

        <Route path="" element={<PrivateRoute></PrivateRoute>}>
          <Route path="/shipping" element={<Shipping></Shipping>}></Route>
          <Route path="/payment" element={<Payment></Payment>}></Route>
          <Route path="/placeorder" element={<Placeorder></Placeorder>}></Route>
          <Route path="/order/:id" element={<Order></Order>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Route>

        <Route path="" element={<AdminRoute></AdminRoute>}>
          <Route
            path="/admin/products"
            element={<ProductsList></ProductsList>}
          ></Route>
          <Route
            path="/admin/products/:pageNumber"
            element={<ProductsList></ProductsList>}
          ></Route>

          <Route path="/admin/users" element={<UserList></UserList>}></Route>
          
          <Route
            path="/admin/orderlist"
            element={<AdminOrderList></AdminOrderList>}
          ></Route>

          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditList></ProductEditList>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
