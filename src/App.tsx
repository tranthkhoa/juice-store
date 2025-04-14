import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import JuiceList from './sources/JuiceList';
import CartModal from './sources/CartModal';
import Checkout from './sources/Checkout';
import { Juice, CartItem } from './sources/types';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (juice: Juice) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === juice.id);
      if (existing) {
        return prev.map(item =>
          item.id === juice.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...juice, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <div className="App"> 
        <div className="min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold p-4">🍹 Juice Store</h1>

          <Link
            to="/cart"
            className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            🛒 Giỏ hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </Link>

          <Routes>
            <Route path="/" element={<JuiceList onAddToCart={handleAddToCart} />} />
            <Route
              path="/cart"
              element={
                <CartModal
                  cart={cart}
                  setCart={setCart}
                  onClose={() => setShowCart(false)}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout cart={cart} setCart={setCart} />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;