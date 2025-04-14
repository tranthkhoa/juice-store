import React from 'react';
import { CartItem } from './types';
import { Link } from 'react-router-dom';

interface Props {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onClose: () => void;
}

const CartModal: React.FC<Props> = ({ cart, setCart, onClose }) => {
  const updateQuantity = (id: number, amount: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">🛒 Giỏ hàng</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Không có sản phẩm nào.</p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-auto pr-2">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />

                <div className="flex-1 ml-2">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price}k x {item.quantity}</p>
                </div>

                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 bg-red-400 text-white rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-600 ml-1"
                  >
                    ✖
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 font-bold">
          Tổng tiền: <span className="text-green-600">{total}k</span>
        </div>

        <Link
            to="/"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ✖
        </Link>

        {cart.length > 0 ? (
            <Link
                to="/checkout"
                className="block w-full bg-blue-600 text-white p-2 rounded-md mt-4 text-center hover:bg-blue-700"
                onClick={onClose}
            >
                Thanh toán
            </Link>
            ) : (
            <Link
                to="/"
                className="block w-full bg-gray-400 text-white p-2 rounded-md mt-4 text-center hover:bg-gray-500"
                onClick={onClose}
            >
                🏠 Quay lại trang chủ
            </Link>
            )}
      </div>
    </div>
  );
};

export default CartModal;