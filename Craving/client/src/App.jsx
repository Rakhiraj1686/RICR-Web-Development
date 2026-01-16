import React from "react";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/register";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./Pages/Dashboards/UserDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
