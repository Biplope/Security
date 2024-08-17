// All routings are done here

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import Register from "./pages/Register";

//router bhitra multiple routes huncha
//routes bhitra single single routes create garne
//element ko lagi diff file garauna parcha ani yeta ayera connect garne

import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEditProduct from "./pages/AdminEditProduct";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import ChangePassword from "./pages/UpdatePassword";
import UserDashboard from "./pages/UserDashboard";
import EditProfile from "./pages/protected_routes/EditProfile";
import Profile from "./pages/protected_routes/profile";
import AddToCart from "./pages/AddToCart";
import HomePage from "./pages/homepage/HomePage";
import ForgotPasswordCode from "./pages/resetpassword/ForgetPasswordCode";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import SendEmail from "./pages/resetpassword/SendEmail";
// import Product from "./pages/Users/Products";
import OrdersPage from "./pages/Orders";
import FavoritesAndCart from "./pages/FavoritesAndCart";
// import AdminAuditLogs from "../src/pages/Admin/Audit";
function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Admin routes */}
        {/* <Route element={<AdminRoutes />}> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/updatepassword" element={<ChangePassword />} />{" "}
        <Route path="/user/productDetails/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit/:id" element={<EditProfile />} />
        <Route path="/sendemail" element={<SendEmail />} />
        <Route path="/resetcode" element={<ForgotPasswordCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* <Route path="/user/products" element={<Product />} /> */}
        <Route path="/user/cart" element={<AddToCart />} />
        <Route path="/user/orders" element={<OrdersPage />} /> {/* </Route> */}
        <Route path="/user/favorite" element={<FavoritesAndCart />} />
        {/* <Route path="/admin/audit_logs" element={<AdminAuditLogs />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
