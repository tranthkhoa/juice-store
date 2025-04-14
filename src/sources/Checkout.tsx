import React, { useState } from 'react';
import { CartItem } from './types';
import { useNavigate } from 'react-router-dom';

interface Props {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Checkout: React.FC<Props> = ({ cart, setCart }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    alert(`Cảm ơn bạn ${name}! Đơn hàng ${total}k sẽ được xử lý.`);
    setCart([]);
    navigate('/'); // 👉 chuyển về trang chủ
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Thanh toán</h2>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Quay lại trang chủ
        </button>
      </div>

      <ul className="mb-4">
        {cart.map(item => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>{item.quantity} x {item.price}k</span>
          </li>
        ))}
      </ul>

      <div className="font-bold mb-4">Tổng tiền: {total}k</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Họ tên người nhận"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="tel"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          placeholder="Địa chỉ giao hàng"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <div className="space-y-2">
          <label className="block font-medium">Hình thức thanh toán:</label>
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Tiền mặt khi nhận hàng</span>
          </label>
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Chuyển khoản ngân hàng</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Hoàn tất thanh toán
        </button>
      </form>
    </div>
  );
};

export default Checkout;