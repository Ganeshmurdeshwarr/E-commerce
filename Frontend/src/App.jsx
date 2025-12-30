import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/Product/ProductDetails';
import CheckOut from './components/Cart/CheckOut';
import OrderConfirm from './pages/OrderConfirm';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagement from './components/Admin/orderManagement';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path="profile" element={<Profile/>}></Route>
        <Route path="collections/:collection" element={<CollectionPage/>}></Route>
        <Route path="product/:id" element={<ProductDetails/>}></Route>
        <Route path="checkout" element={<CheckOut/>}></Route>
        <Route path="order-confirmation" element={<OrderConfirm/>}></Route>
        <Route path="order/:id" element={<OrderDetailsPage/>}></Route>
        <Route path="/my-orders" element={<MyOrdersPage/>}></Route>
      </Route>
      <Route path='/admin' element={<AdminLayout/>}>
        <Route index element={<AdminHomePage/>} />
        <Route path='users' element={<UserManagement/>} />
        <Route path='products' element={<ProductManagement/>} />
        <Route path='products/:id/edit' element={<EditProductPage/>} />
        <Route path='orders' element={<OrderManagement/>} />
      </Route>
    </Routes>
  );
}

export default App