import React from 'react';
import { CartItem } from './types';

interface Props {
  cart: CartItem[];
}

const Cart: React.FC<Props> = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">🛒 Giỏ Hàng</h2>
      {cart.length === 0 ? (
        <p>Chưa có sản phẩm nào</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{(item.price * item.quantity).toLocaleString()}đ</span>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-2" />
      <p className="font-semibold">Tổng cộng: {total.toLocaleString()}đ</p>
    </div>
  );
};

export default Cart;