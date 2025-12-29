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
    </Routes>
  );
}

export default App