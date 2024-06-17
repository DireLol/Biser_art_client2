import { makeAutoObservable } from 'mobx';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  recommended: boolean;
  color: string;
  style: string;
  category: string;
  description: string;
  sizes: string;
}

export default class CartStore {
  cartItems: { product: Product; quantity: number }[] = [];
  discount = 0;
  promoCodes: Record<string, number> = {
      'DISCOUNT100': 100,
      'DISCOUNT200': 200,
  };

  constructor() {
      makeAutoObservable(this);
  }

  addToCart(product: Product, quantity: number) {
      const existingItem = this.cartItems.find(item => item.product.id === product.id);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          this.cartItems.push({ product, quantity });
      }
  }

  removeFromCart(productId: number) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
  }

  clearCart() {
      this.cartItems = [];
  }

  applyPromoCode(code: string) {
      if (code in this.promoCodes) {
          this.discount = (this.promoCodes[code] / 100) * this.totalAmount;
      } else {
          this.discount = 0;
      }
  }

  get totalAmount() {
      return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  get totalCount() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalAmountWithDiscount() {
      return this.totalAmount - this.discount;
  }
}