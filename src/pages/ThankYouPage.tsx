import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { MAINPAGE_ROUTE } from '../utils/consts';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-bottom: 40px;
`;

const Button = styled(NavLink)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const FooterSection = styled.section`
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: 10%;
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

const ThankYouPage: React.FC = () => {
  return (
    <>
    <Container>
      <Title>Спасибо за ваш заказ!</Title>
      <Message>Ваш заказ был успешно оформлен. Мы свяжемся с вами в ближайшее время.</Message>
      <Button to={MAINPAGE_ROUTE}>Вернуться на главную страницу</Button>
    </Container>
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

export default ThankYouPage;