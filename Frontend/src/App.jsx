import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home/>}></Route>
      </Route>
    </Routes>
  );
}

export default App