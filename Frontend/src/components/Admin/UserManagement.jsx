import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import {
  addUser,
  fetchUsers,
  updateUser,
  deleteUser,
} from "../../Redux/slices/adminSlice";

const UserManagement = () => {
const navigate = useNavigate()
const dispatch = useDispatch()

const {user } = useSelector((state)=>state.auth)
const {users , loading, error } = useSelector((state)=>state.admin)

useEffect(()=>{
 if (!loading && (!user || user.role !== "admin")) {
   navigate("/");
 }
},[user , navigate,loading ])

useEffect(()=>{
  if(user ){
    dispatch(fetchUsers());
  }
},[dispatch ,user])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", //Default Role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(addUser(formData));


    // Reset the form after Submit
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };


const handleRoleChange =(userId , newRole)=>{
 dispatch(updateUser({id:userId, role:newRole}));  
}

const handleDeleteUser=(userId)=>{
if(window.confirm("Are you sure you want this User?")){
  dispatch(deleteUser(userId));
  
}
}

  return (
    <div className="max-w-7xl mx-auto p-6 bg-linear-to-b from-gray-300 to-gray-400 h-full">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error:{error}</p>}
      {/* Add New User Form */}
      <div className="p-6 rounded-lg">
        <h3 className="text-lg font-bold  mb-4">Add New User</h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="min-w-full text-left text-gray-900">
          <thead className="bg-gray-400 text-xs uppercase text-gray-900">
            <tr>
              <th className="py-3 px-4 ">Name</th>
              <th className="py-3 px-4 ">Email</th>
              <th className="py-3 px-4 ">Role</th>
              <th className="py-3 px-4 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4 ">{user.email}</td>
                <td className="p-4 ">
                  <select
                    value={user.role}
                    name=""
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
