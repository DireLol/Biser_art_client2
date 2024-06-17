import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../index';

const OrderFormSection = styled.section`
font-family: 'Alegreya Sans', sans-serif;
margin-top:15%;
  padding: 50px 20px;
  background-color: #f9f9f9;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 600px;
  height: 150px;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const Select = styled.select`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
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
  margin-top: 20px;

  &:hover {
    background-color: #d81b60;
  }
`;
const FooterSection = styled.section`
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  
`;

const FooterText = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: underline;

  &:hover {
    color: #ccc;
  }
`;

const ConfirmationMessage = styled.p`
  color: green;
  font-size: 1.2em;
  margin-top: 20px;
`;
const IndividualOrder: FC  = () => {
    const { adminStore } = useContext(Context);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    materials: '',
  });

  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Отправка данных в AdminStore
    adminStore.addOrder(formData);
    setConfirmation('Заявка отправлена');
  };

  return (
    <>
    <OrderFormSection>
      <Title>Оформление индивидуального заказа</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Ваш email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Ваш телефон"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Описание желаемого изделия"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Select name="materials" value={formData.materials} onChange={handleChange} required>
          <option value="">Выберите материалы</option>
          <option value="бисер">Бисер</option>
          <option value="камни">Камни</option>
          <option value="металл">Металл</option>
        </Select>
        <OrderButton type="submit">Отправить заявку</OrderButton>
      </Form>
      {confirmation && <ConfirmationMessage>{confirmation}</ConfirmationMessage>}
      
    </OrderFormSection>
    <FooterSection>
        <h4>© BiserArt 2024</h4>
        <FooterText>
          Права на все материалы, опубликованные на сайте, принадлежат их автору. Использование материалов возможно при наличии активной ссылки на источник.
        </FooterText>
        <FooterText>
          <FooterLink to="/privacy-policy">Политика конфиденциальности</FooterLink>
        </FooterText>
      </FooterSection>
    </>
  );
    
    
};
export default IndividualOrder;