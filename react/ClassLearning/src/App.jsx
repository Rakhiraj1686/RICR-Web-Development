import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Register1 from "./Pages/Register1";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register1" element={<Register1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
