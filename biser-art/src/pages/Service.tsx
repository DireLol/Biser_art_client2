import React, { FC, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { styled } from 'styled-components';
import { INDIVIDUAL_ORDER_ROUTE } from '../utils/consts';
const CustomOrderSection = styled.section`
font-family: 'Alegreya Sans', sans-serif;
margin-top:15%;
  padding: 50px 20px;
  background-color: #ffffff;
  text-align: center;
  border-top: 2px solid #e91e63;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  color: #666;
  margin-bottom: 40px;
`;

const OrderButton = styled.button`
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FFA048;
  }
  li {
        text-decoration: none;
        display: flex;
        flex-direction: row;
        color: white;
        list-style: none;
        
    }
`;


const Service: FC  = () => {

return (
    <CustomOrderSection>
      <Title>Изготовление индивидуального заказа</Title>
      <Description>
        Хотите уникальное изделие, созданное специально для вас? Саша Гусынина с радостью выполнит индивидуальный заказ, учитывая все ваши пожелания.<br></br> Мы создадим украшение, которое будет полностью соответствовать вашему вкусу и стилю.
      </Description>
      <OrderButton>
      <NavLink to={INDIVIDUAL_ORDER_ROUTE}><li>Оформить индивидуальный заказ</li></NavLink>
      </OrderButton>
    </CustomOrderSection>
    );
    
    
};
export default Service;