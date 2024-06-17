import React, { FC } from 'react';
import styled from 'styled-components';
import duckDere from '../images/duckdere.png';
import { Link } from 'react-router-dom';

const AboutSection = styled.section`
  margin-top: 14%;
  padding: 50px 20px;
  background-color: #f9f9f9;
  text-align: center;
  font-family: 'Alegreya Sans', sans-serif;
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

const Highlight = styled.span`
  color: #e91e63;
  font-weight: bold;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
  border-radius: 15px;
  margin-top: 20px;
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

const AboutUs: FC = () => {
  return (
    <>
      <AboutSection>
        <Title>О нас</Title>
        <Description>
          <Highlight>Саша Гусынина</Highlight> — талантливая мастерица бисероплетения. Её увлечение превратилось в настоящее искусство, которое радует глаз и душу. Саша создает уникальные изделия из бисера, которые подчеркивают индивидуальность и стиль. 
          <br /><br />
          Теперь это хобби стало не просто увлечением, но и делом, приносящим радость людям и финансовую стабильность. Каждое изделие, сделанное Сашей, несет в себе частичку её души, тепла и мастерства. Мы рады представить вам её работы и надеемся, что они принесут вам столько же радости, сколько и нам.
        </Description>
        <Image src={duckDere} alt="Бисерные изделия Саши Гусыниной" />
      </AboutSection>
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

export default AboutUs;