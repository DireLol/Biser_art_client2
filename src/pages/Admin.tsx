import React, { FC } from 'react';
import styled from 'styled-components';
import ProductManager from '../components/ProductManager';
import UserList from '../components/UserList';
import OrderList from '../components/OrderList';
import PaymentList from '../components/PaymentList';

const AdminContainer = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

const Section = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Admin: FC = () => {
  return (
    <AdminContainer>
      <Title>Панель управления</Title>
      <Section>
        <ProductManager />
      </Section>
      <Section>
        <UserList />
      </Section>
      <Section>
        <OrderList />
      </Section>
      <Section>
        <PaymentList />
      </Section>
    </AdminContainer>
  );
};

export default Admin;