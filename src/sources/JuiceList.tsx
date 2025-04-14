import React from 'react';
import { Juice } from './types';

interface Props {
  onAddToCart: (juice: Juice) => void;
}

const juices: Juice[] = [
    { id: 1, name: "Cam Ép", price: 25000, image: "/cam.png" },
    { id: 2, name: "Dưa Hấu", price: 20000, image: "/hau.png" },
    { id: 3, name: "Chanh", price: 22000, image: "/chanh.png" },
    { id: 4, name: "Chanh Dây", price: 25000, image: "/chanhday.png" },
    { id: 5, name: "Cherry", price: 20000, image: "/cherry.png" },
    { id: 6, name: "Việt Quất", price: 22000, image: "/berry.png" },
    { id: 7, name: "Đào", price: 25000, image: "/dao.png" },
    { id: 8, name: "Chuối", price: 20000, image: "/chuoi.png" },
    { id: 9, name: "Dâu", price: 24000, image: "/dau.png" },
    { id: 10, name: "Kiwi", price: 26000, image: "/kiwi.png" },
    { id: 11, name: "Nho", price: 27000, image: "/nho.png" },
    { id: 12, name: "Thơm", price: 25000, image: "/thom.png" },
    { id: 13, name: "Táo", price: 23000, image: "/tao.png" },
    { id: 14, name: "Lựu", price: 24000, image: "/luu.png" }
];
  
  const JuiceList: React.FC<Props> = ({ onAddToCart }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {juices.map((juice) => (
          <div key={juice.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-center items-center  w-full rounded">
                <img src={juice.image} alt={juice.name}  className="object-cover  h-32 w-32  rounded center" />
            </div>
            <h3 className="font-bold mt-2">{juice.name}</h3>
            <p>{juice.price.toLocaleString()}đ</p>
            <button
              onClick={() => onAddToCart(juice)}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default JuiceList;