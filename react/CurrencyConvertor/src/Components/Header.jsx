import React from 'react'
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { HiCurrencyRupee } from "react-icons/hi2";
import { HiMiniCurrencyEuro } from "react-icons/hi2";
import { HiMiniCurrencyPound } from "react-icons/hi2";



const Header = () => {
  return (
    <>
    <div className="bg-blue-500 px-6 py-4 text-white text-center text-3xl flex justify-center">
        <HiCurrencyRupee className="animate-bounce" />
        <HiMiniCurrencyDollar className='animate-spin'/>
        <span className=''>Currency Convertor</span>
         <HiMiniCurrencyEuro className='animate-bounce'/>
         <HiMiniCurrencyPound className='animate-ping'/>
    </div>
    </>
  )
}

export default Header