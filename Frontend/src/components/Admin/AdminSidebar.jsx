import React from 'react'
import { FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { FaBoxOpen, FaStore, FaUser } from 'react-icons/fa6';
import { Link, NavLink, useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
  const navigate = useNavigate()

  const handleLogout =()=>{
     navigate("/")
  }




  return (
    <div className="p-6 ">
      <div className="mb-6 flex flex-col ">
        

        <Link
          to="/admin"
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
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink to='/admin/users' className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2":"text-gray-300 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "} >
        <FaUser/>
        <span className=''>User</span>
        </NavLink>

        <NavLink to='/admin/Products' className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2":"text-gray-300 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "} >
        <FaBoxOpen/>
        <span className=''>Product</span>
        </NavLink>

        <NavLink to='/admin/order' className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2":"text-gray-300 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "} >
        <FaClipboardList/>
        <span className=''>Orders</span>
        </NavLink>

        <NavLink to='/' className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded items-center space-x-2":"text-gray-300 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "} >
        <FaStore/>
        <span className=''>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button onClick={handleLogout}
        className='w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 flex items-center justify-center space-x-2'>
          <FaSignOutAlt/>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar