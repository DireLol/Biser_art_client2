import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

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
const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ItemName = styled.p`
  margin: 0;
`;

const ItemCategory = styled.p`
  margin: 0;
  font-size: 12px;
  color: gray;
`;

const ItemQuantity = styled.p`
  margin: 0;
  font-size: 12px;
  color: gray;
`;

const ItemPrice = styled.p`
  margin: 0;
  font-size: 12px;
  color: gray;
`;

const CartItem = observer(({ item }: { item: { product: Product; quantity: number } }) => {
  return (
    <ItemContainer>
      <div style={{ display: 'flex' }}>
        <ItemImage src={item.product.image} alt={item.product.name} />
        <ItemDetails>
          <ItemName>{item.product.name}</ItemName>
          <ItemCategory>{item.product.category}</ItemCategory>
          <ItemQuantity>Размер: {item.product.sizes} Количество: {item.quantity}</ItemQuantity>
        </ItemDetails>
      </div>
      <ItemPrice>{item.product.price * item.quantity} ₽</ItemPrice>
    </ItemContainer>
  );
});

export default CartItem;