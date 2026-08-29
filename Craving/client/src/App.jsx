import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home"
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./Pages/Dashboards/UserDashboard";
import RiderDashboard from "./Pages/Dashboards/RiderDashboard";
import RestaurantDashboard from "./Pages/Dashboards/RestaurantDashboard";
import AdminDashboard from "./Pages/Dashboards/AdminDashboard";
import OrderNow from "./Pages/OrderNow";
import RestaurantDisplayMenu from "./Pages/RestaurantDisplayMenu";
import NotFound from "./Pages/NotFound";
import CheckoutPage from "./Pages/CheckoutPage";
import PaymentSuccessPage from "./Pages/PaymentSuccessPage"

/*
 * Applies the Home-page color theme (see .home-theme in index.css) only when
 * the current route is "/". Every other route renders with an empty class,
 * so Header/Footer/other pages keep their original appearance unchanged.
 */
const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? "home-theme" : undefined}>
      <Toaster />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/riderdashboard" element={<RiderDashboard />} />
        <Route
          path="/restaurantdashboard"
          element={<RestaurantDashboard />}
        />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/order-now" element={<OrderNow />} />
        <Route path="/restaurantMenu" element={<RestaurantDisplayMenu />} />
        <Route path="/checkout-page" element={<CheckoutPage />} />
        <Route path="/paymentSuccess" element={<PaymentSuccessPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;