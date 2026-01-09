import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setFilters , fetchProductsByFilter } from "../../Redux/slices/productsSlice";

const Searchbar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  

  const handleSearchBtn = () => {
    setIsOpen(!isOpen);
  };



  const handleSearch =(e)=>{
    e.preventDefault()
    dispatch(setFilters({ search: searchItem }));
    dispatch(fetchProductsByFilter({ search: searchItem }));
    navigate(`collections/all?search=${searchItem}`)
    setIsOpen(false);
  }
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-gray-400 h-24 z-50 " : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full "
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="bg-gray-300 px-4 pl-2 pr-12 py-2 rounded-lg focus:outline-none w-full
           placeholder:text-black"
            />
            {/* Search icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="w-6 h-6 text-black" />
            </button>
          </div>
          {/* close button */}
          <button
            type="button"
            onClick={handleSearchBtn}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 "
          >
            <HiMiniXMark className="w-10 h-10" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchBtn}>
          <HiMagnifyingGlass className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
