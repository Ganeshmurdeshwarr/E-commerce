import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Home from '../../pages/Home'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className="bg-linear-to-b from-black to-gray-700">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserLayout