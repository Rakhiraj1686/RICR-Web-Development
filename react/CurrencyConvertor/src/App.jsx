import React from "react";
import Header from "./Components/Header";
import Currency from "./Components/Currency";
import { Toaster } from "react-hot-toast";

const App =()=>{
  return (
    <>
      <Toaster />
      <Header />
      <Currency />
    </>
  )
}

export default App;