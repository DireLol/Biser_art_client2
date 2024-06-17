import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import styled from 'styled-components';

const OrderListContainer = styled.div`
  width: 100%;
`;

const OrderItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const OrderDetail = styled.p`
  margin: 5px 0;
`;

const OrderList = observer(() => {
  const { adminStore } = useContext(Context);

  return (
    <OrderListContainer>
      <OrderTitle>Заявки</OrderTitle>
      {adminStore.orders.map(order => (
        <OrderItem key={order.id}>
          <OrderDetail><strong>Имя:</strong> {order.name}</OrderDetail>
          <OrderDetail><strong>Email:</strong> {order.email}</OrderDetail>
          <OrderDetail><strong>Телефон:</strong> {order.phone}</OrderDetail>
          <OrderDetail><strong>Описание:</strong> {order.description}</OrderDetail>
          <OrderDetail><strong>Материалы:</strong> {order.materials}</OrderDetail>
        </OrderItem>
      ))}
    </OrderListContainer>
  );
});

export default OrderList;