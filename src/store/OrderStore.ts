import { makeAutoObservable } from 'mobx';

interface Order {
    items: {
      product: {
        id: number;
        name: string;
        category: string;
        color: string;
        sizes: string;
        image: string;
        price: number;
      };
      quantity: number;
    }[];
    deliveryMethod: 'доставка' | 'самовывоз';
    paymentMethod: 'наличными' | 'картой' | 'сбп' | '';
    address?: string;
    pickupDate?: string;
    pickupTime?: string;
    phoneNumber: string;
    totalAmount: number;
  }

export default class OrderStore {
    orders: Order[] = [];

    constructor() {
      makeAutoObservable(this);
    }
  
    addOrder(order: Order) {
      this.orders.push(order);
    }
  
    get allOrders() {
      return this.orders;
    }
}
