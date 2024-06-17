import React, { FC } from 'react';
import styled from 'styled-components';

const PrivacySection = styled.section`
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

const Text = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  color: #666;
  margin-bottom: 40px;
  text-align: left;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
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

const PrivacyPolicy: FC = () => {
  return (
    <>
      <PrivacySection>
        <Title>Политика конфиденциальности</Title>
        <Text>
          Мы уважаем вашу конфиденциальность и стремимся защитить ваши личные данные. Эта политика конфиденциальности
          объясняет, как мы собираем, используем и защищаем вашу информацию, когда вы пользуетесь нашим сайтом и услугами.
        </Text>
        <Text>
          Мы используем такие технологии, как React, MobX, TypeScript и Node.js, чтобы предоставить вам лучший опыт
          использования нашего сайта. Мы собираем только те данные, которые необходимы для выполнения наших услуг и улучшения
          их качества. Вся информация хранится в безопасных базах данных и защищена с использованием современных методов
          шифрования и безопасности.
        </Text>
        <Text>
          Мы не передаем вашу личную информацию третьим лицам без вашего согласия, за исключением случаев, предусмотренных
          законом. Если у вас есть вопросы или опасения по поводу вашей конфиденциальности, пожалуйста, свяжитесь с нами.
        </Text>
      </PrivacySection>
      <FooterSection>
        <h4>© BiserArt 2024</h4>
        <FooterText>
          Права на все материалы, опубликованные на сайте, принадлежат их автору. Использование материалов возможно при
          наличии активной ссылки на источник.
        </FooterText>
      </FooterSection>
    </>
  );
};

export default PrivacyPolicy;