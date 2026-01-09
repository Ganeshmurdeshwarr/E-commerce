import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiBars3BottomRight } from "react-icons/hi2";
import { FaBagShopping } from "react-icons/fa6";
import Searchbar from "./Searchbar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleCartDrawer = () => {
    setCartOpen(!cartOpen);
  };
  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto  flex items-center justify-between py-4 px-6  bg-zinc-950 text-white">
        {/* Left - Logo */}
        <div className="">
          <Link
            to="/"
            className="text-3xl font-bold tracking-wider
                       font-['Poppins',system-ui,sans-serif]
                       bg-linear-to-r from-purple-500 via-pink-500 to-cyan-400
                       bg-clip-text text-transparent
                       drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]
                       hover:drop-shadow-[0_0_22px_rgba(236,72,153,0.9)]
                       transition-all duration-300"
          >
            Devadiga’s
          </Link>
        </div>
        {/* center -Navigation Links */}
        <div className="hidden  md:flex gap-x-6  ">
          <Link
            to="/collections/all?gender=Men"
            className=" hover-text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className=" hover-text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className=" hover-text-black text-sm font-medium uppercase"
          >
            top wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className=" hover-text-black text-sm font-medium uppercase"
          >
            bottom wear
          </Link>
        </div>

        {/* Right icons */}

        <div className="flex items-center gap-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-gray-600">
            <HiOutlineUser className="h-6 w-6 " />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative  hover:text-gray-600"
          >
            <FaBagShopping className="h-6 w-6 " />
            {cartItemCount > 0 && (
              <span className="absolute -top-3  bg-red-600 text-white text-sm rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Search  */}
          <div className="overflow-hidden  text-white hover:text-gray-600">
            <Searchbar />
          </div>

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className=" h-6 w-6  text-white hover:text-gray-600" />
          </button>
        </div>
      </nav>
      <CartDrawer cartOpen={cartOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-linear-to-b from-gray-300 via-gray-700 to-black shadow-lg transform transition-transform duration-400 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 " />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-4xl font-bold mb-4 ">Menu</h2>
          <nav className="flex flex-col gap-y-4 ">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-100 hover:text-black "
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-100 hover:text-black "
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-100 hover:text-black "
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-100 hover:text-black "
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
