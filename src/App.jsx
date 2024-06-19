
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AddProduct from './Pages/AddProduct';
import Cart from './Pages/Cart';
import Product from './Pages/Product';

function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
