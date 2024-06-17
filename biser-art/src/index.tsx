import React, { createContext, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProductStore from './store/ProductStore';
import AuthStore from './store/AuthStore';
import CartStore from './store/CartStore';
import AdminStore from './store/AdminStore'
import OrderStore from './store/OrderStore';
interface State { 
  authStore: AuthStore,
  productStore: ProductStore,
  cartStore: CartStore
  adminStore: AdminStore,
  orderStore: OrderStore
}

const orderStore = new OrderStore();
const adminStore = new AdminStore();
const authStore = new AuthStore();
const productStore = new ProductStore(adminStore);
const cartStore = new CartStore();

//Чтобы прокинуть состояние на все компоненты react необходим Context
export const Context = createContext<State>({
  authStore, productStore, cartStore, adminStore, orderStore
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
  <Context.Provider value={{authStore, productStore, cartStore, adminStore, orderStore}}>
    <App />
  </Context.Provider>
  </StrictMode>
  
);

