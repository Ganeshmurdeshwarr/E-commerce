import React from 'react'
import { IoMdClose } from 'react-icons/io'
import CartComponents from '../Cart/CartComponents';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({ cartOpen, toggleCartDrawer }) => {

  
  const navigate = useNavigate()
  const { user , guestId} = useSelector((state)=> state.auth);
  const {cart } = useSelector((state)=>state.cart)
  const userId = user ? user._id : null;

  
  const handleCheckOut =()=>{
    toggleCartDrawer()
    if(!user){
      navigate("/login?redirect=checkout")
    }else{
      navigate("/checkout")
    }
    navigate('/checkout')
  }

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-md h-full
  bg-linear-to-b from-white to-gray-700
  shadow-2xl  border-l border-gray-200
  transform transition-transform duration-300 flex flex-col z-50
  ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose />
        </button>
      </div>

      {/* cart content  */}
      <div className="grow p-4 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 ">Your Cart </h2>
        {/* Component for Cart Content  */}
        {cart && cart?.products?.length > 0 ? (
          <CartComponents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className='text-center text-red-400 text-xl'>Your cart is empty. Please add some items..!</p>
        )}
      </div>

      {/* Checkout button fixed at bottom */}
      <div className="p-4 bg-white sticky bottom-0 ">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckOut}
              className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tight text-gray-500 text-center mt-2 ">
              Shipping ,taxes ,and discount codes calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer