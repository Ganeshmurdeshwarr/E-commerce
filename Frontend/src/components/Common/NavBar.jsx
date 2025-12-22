import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser ,HiBars3BottomRight  } from 'react-icons/hi2'
import { FaBagShopping } from "react-icons/fa6"
import Searchbar from './Searchbar';

const NavBar = () => {
  return (
    <>
      <nav className="container mx-auto  flex items-center justify-between py-4 px-6">
        {/* Left - Logo */}
        <div className="">
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        {/* center -Navigation Links */}
        <div className="hidden  md:flex gap-x-6  ">
          <Link
            to="#"
            className="text-gray-700 hover-text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover-text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover-text-black text-sm font-medium uppercase"
          >
            top wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover-text-black text-sm font-medium uppercase"
          >
            bottom wear
          </Link>
        </div>

        {/* Right icons */}

        <div className="flex items-center gap-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button className="relative  hover:text-black">
            <FaBagShopping className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-3  bg-red-600 text-white text-sm rounded-full px-2 py-0.5">
              4
            </span>
          </button>

          {/* Search  */}
          <div className='overflow-hidden'>
            <Searchbar />
          </div>

          <button className="md:hidden">
            <HiBars3BottomRight className=" h-6 w-6  text-gray-700" />
          </button>
        </div>
      </nav>
    </>
  );
  
};

export default NavBar