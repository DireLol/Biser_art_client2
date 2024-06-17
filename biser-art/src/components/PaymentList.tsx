import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import styled from 'styled-components';

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
`;

const OrderTableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 12px;
`;

const OrderTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const OrderTableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const SectionTitle = styled.h2`
  margin: 20px 0;
  text-align: left;
  color: #333;
`;

const PaymentList = observer(() => {
  const { orderStore } = useContext(Context);

  return (
    <>
      <SectionTitle>Заказы</SectionTitle>
      <OrderTable>
        <thead>
          <tr>
            <OrderTableHeader>Дата</OrderTableHeader>
            <OrderTableHeader>Товары</OrderTableHeader>
            <OrderTableHeader>Метод доставки</OrderTableHeader>
            <OrderTableHeader>Метод оплаты</OrderTableHeader>
            <OrderTableHeader>Адрес</OrderTableHeader>
            <OrderTableHeader>Время получения</OrderTableHeader>
            <OrderTableHeader>Телефон</OrderTableHeader>
            <OrderTableHeader>Сумма</OrderTableHeader>
          </tr>
        </thead>
        <tbody>
          {orderStore.allOrders.map((order, index) => (
            <OrderTableRow key={index}>
              <OrderTableData>{new Date().toLocaleDateString()}</OrderTableData>
              <OrderTableData>
                {order.items.map((item) => (
                  <div key={item.product.id}>
                    {item.product.name} x {item.quantity}
                  </div>
                ))}
              </OrderTableData>
              <OrderTableData>{order.deliveryMethod === 'доставка' ? 'Доставка' : 'Самовывоз'}</OrderTableData>
              <OrderTableData>
                {order.paymentMethod === 'наличными' ? 'Наличными' : order.paymentMethod === 'картой' ? 'Картой' : 'СБП'}
              </OrderTableData>
              <OrderTableData>{order.address || '-'}</OrderTableData>
              <OrderTableData>{order.pickupDate} {order.pickupTime}</OrderTableData>
              <OrderTableData>{order.phoneNumber}</OrderTableData>
              <OrderTableData>{order.totalAmount} ₽</OrderTableData>
            </OrderTableRow>
          ))}
        </tbody>
      </OrderTable>
    </>
  );
});

export default PaymentList;