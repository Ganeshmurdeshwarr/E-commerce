import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CartComponents from '../Cart/CartComponents';

const CartDrawer = ({ cartOpen, toggleCartDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm-w-1/2 md:w-120 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose />
        </button>
      </div>


      {/* cart content  */}
      <div className='grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart </h2>
        {/* Component for Cart Content  */}
        <CartComponents/>
      </div>
      {/* Checkout button fixed at bottom */}
      <div className='p-4 bg-white sticky bottom-0 '>
        <button className='w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition'>Checkout</button>
        <p className='text-sm tracking-tight text-gray-500 text-center mt-2 '>
          Shipping taxes  and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer