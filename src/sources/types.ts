export interface Juice {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  
  export interface CartItem extends Juice {
    quantity: number;
  }