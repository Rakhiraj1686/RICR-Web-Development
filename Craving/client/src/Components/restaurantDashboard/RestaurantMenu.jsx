import React from 'react'
import { useState } from 'react';
import { MdAddCircleOutline } from "react-icons/md";
import AdditemMenuModal from './modals/AddMenuItemModal';

const RestaurantMenu = () => {
  const[isAddItem,setIsAddItem] = useState(false)
  return (
    <>
      <div className='w-full p-6 '>
        <div className='flex justify-between items-center shadow-md border p-5 rounded-3xl border-gray-50'>
          <div className='text-2xl font-bold text-gray-800 mb-4'>
            <h1>Menu Management</h1>
          </div>
          <div>
            <button className=' border-2 border-red-500 p-3 rounded-3xl text-red-600 font-bold text-lg hover:text-white flex items-center gap-2 bg-(--color-secondary hover:bg-(--color-secondary) ' onClick={()=>setIsAddItem(true)} > <MdAddCircleOutline/><span> Add Items</span></button>
          </div>
        </div>
      </div>

      {isAddItem && (
        <AdditemMenuModal
          onClose={() => setIsAddItem(false)}
        />
      )}
    </>
  )
}

export default RestaurantMenu