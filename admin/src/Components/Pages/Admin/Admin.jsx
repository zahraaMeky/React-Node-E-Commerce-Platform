import React from 'react'
import {Routes, Route } from 'react-router-dom';
import './admin.css'
import Sidebar from '../../Sidebar/Sidebar'
import AddProduct from '../../AddProduct/AddProduct';
import ListProducts from '../../ListProduct/ListProducts';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/allproducts" element={<ListProducts />} />
      </Routes>
    </div>
  )
}

export default Admin
