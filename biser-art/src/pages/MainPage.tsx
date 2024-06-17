import React, { useEffect, useMemo, useState, FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { observer } from 'mobx-react-lite';
import backgroundFull from '../images/Section.png';
import FoxImg from '../images/decoration-img.png';
import bracelet from '../images/bracelet.png';
import leftButton from '../images/left.svg';
import rightButton from '../images/right.svg';
import Spline from '@splinetool/react-spline';
import Gallery from '../components/GallleryImagesIntaractive';
import ProductService from '../services/ProductService';
import duckDere from '../images/duckdere.png';

import Pint from '../images/sotialNetworks/Pint.svg';
import TG from '../images/sotialNetworks/TG.svg';
import VK from '../images/sotialNetworks/VK.svg';
import Whatsapp from '../images/sotialNetworks/Whatsapp.svg';
import Youtube from '../images/sotialNetworks/Youtube.svg';

import { useInView } from 'react-intersection-observer';
import {
  LOGIN_ROUTE, REGISTRATION_ROUTE, MAINPAGE_ROUTE, SHOP_ROUTE, 
  ABOUTUS_ROUTE, SERVICE_ROUTE, GALLERY_ROUTE, CART_ROUTE, INDIVIDUAL_ORDER_ROUTE
} from '../utils/consts';

// Styles
const defaultFontFamily = 'Alegreya Sans';

const SansSerifFont = styled.h1`
  font-family: ${defaultFontFamily};
  font-size: 28px; /* Увеличено с 24px */
  font-weight: 400;
  line-height: 35px;
  letter-spacing: 8%;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContent = styled.div`
  max-width: 700px;
  & > h1 {
    font-size: 43px; /* Увеличено с 36px */
    font-family: ${defaultFontFamily};
    font-weight: 400;
    line-height: 52px;
    letter-spacing: 8%;
    text-align: center;
  }
`;

const slidein = keyframes`
  from {
    margin-left: 100%;
    width: 300%;
  }
  to {
    margin-left: 0%;
    width: 100%;
  }
`;

const AnimatedParagraph = styled.p`
  font-size: 21px; /* Увеличено с 18px */
  font-family: ${defaultFontFamily};
  font-weight: 400;
  line-height: 30px;
  text-align: justify;
  margin-bottom: 45px;
  opacity: ${props => (props ? 1 : 0)};
  animation: ${props => (props ? slidein : 'none')} 3s forwards; /* Запуск анимации только при видимости */
`;

const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: 'Alegreya Sans', sans-serif;
`;

const ArrowLeftBtn = styled.button`
  cursor: pointer;
  z-index: 3;
  border: none;
  background-color: rgba(28,28,28,0);
  border-radius: 12px;
  width: 27px;
  height: 33px;
`;

const ArrowRightBtn = styled.button`
  cursor: pointer;
  z-index: 3;
  background-color: rgba(28,28,28,0);
  border: none;
  border-radius: 12px;
  width: 27px;
  height: 33px;
`;

const ButtonNavCatalog = styled.button`
  cursor: pointer;
  width: 388px;
  height: 41px;
  border: none; 
  outline: none;
  border-radius: 16px;
  color: white;
  background: rgb(84, 58, 28);
  box-shadow: 5px 5px rgb(72, 50, 24);
  z-index: 3;
`;

const BgFull = styled.img`
  margin-top: 20em;
  width: 814px;
  height: 913px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BrownGradientBG = styled.div`
  height: 568px;
  color: white;
  padding-top: 100px;
  background: linear-gradient(180deg, rgb(115, 83, 45), rgb(217, 156, 85)) no-repeat;
  min-width: 100vw;
  z-index: 3;
`;

const WhyChoseUs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 25%;
  & > h2 {
    color: rgb(255, 255, 255);
    font-family: ${defaultFontFamily};
    font-size: 43px; /* Увеличено с 36px */
    font-weight: 400;
    line-height: 52px;
    letter-spacing: 8%;
  }
  & > ol > li {
    font-size: 21px; /* Увеличено с 18px */
  }
  & > ol {
    padding: 0;
  }
  z-index: 3;
`;

const FoxImg1 = styled.img`
  position: absolute;
  width: 638px;
  height: 460px;
  left: 55%;
  top: 2520px;
  z-index: 3;
`;

const Model1scene = styled.div`
  width: 100%;
  height: 100%;
  max-height: 59.0625rem;
`;

const ContainerModel = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 59.0625rem;
  margin: 0 auto;
  overflow: hidden;
`;

const Container3DContent = styled.div`
  position: absolute;
  min-height: 170vh;
`;

const BackgroundSpline = styled(Spline)`
  display: block;
  width: 100%;
  height: 100%;
`;

const Model1scene2 = styled.div`
  width: 100%;
  height: 100%;
  max-height: 59.0625rem;
`;

const ContainerModel2 = styled.div`
  width: 100vw;
  height: 150vh;
  max-height: 59.0625rem;
  margin: 0 auto;
  overflow: hidden;
`;

const Container3DContent2 = styled.div`
  position: absolute;
  margin-top: 620vh;
  
`;

const BiserModel = styled(Spline)`
  display: block;
  width: 100%;
  height: 100%;
`;

const NewAndSpeacials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 10%;
  & .HP {
    margin-right: 24%;
  }
  z-index: 3;
`;

const ContentSpecials = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 30px;
  transition: 0.6s ease;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  margin-bottom: 60px;
  margin-top: 30px;
  & > :hover {
    opacity: 1;
    transition: 0.3s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const CatalogElem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 172px;
  height: 254px;
  padding: 20px;
  box-shadow: 5px 6px 6px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  & > img {
    width: 133px;
    height: 94px;
    background: rgb(201, 201, 201);
    background-position: center;
    background-size: cover;
  }
  z-index: 3;
`;
const ContainerButtonNavCatalog = styled.div`
  & > div{
    position: absolute;
    
    margin-bottom:4px;
    margin-right:4px;
    
    width: 392px;
    height: 41px;
    border-radius: 16px;
    box-shadow: 4px 10px 6px 0px rgba(0, 0, 0, 0.25);
    background: rgb(72, 50, 24);
    z-index:1;
  }
`
const IndividualOrder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  z-index:3;
`
const IndividualOrderContent = styled.div`
  display:flex;
  justify-content: center;
  flex-direction:row;
  overflow: hidden;
  & >div {
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    border-radius: 80px;
    box-shadow: 3px 10px 4px 0px rgba(0, 0, 0, 0.25);
  }
  & > img{
    transition: 1s;
    width: 400px;
    height: 462px;
    border-radius: 80px;
    background: url(${bracelet}) no-repeat left center;
    background-size:100% 100%;
    box-shadow: 3px 10px 4px 0px rgba(0, 0, 0, 0.25);
    :hover{
      transform: scale(1.2);
    }
  } 
  
  
  
`
const IndividualOrderElem = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    width: 40%;
    height: 100%;
    font-size:16px;
   
    &>div{
    width: 340px;
    padding: 0 40px 0 40px;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    background-color:white;
    
    
    &> h1{
      font-family: Alegreya Sans;
      font-size: 36px;
      font-weight: 400;
      line-height: 43px;
      letter-spacing: 0%;
      text-align: center;
    }
    &> p{
      font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0%;
      text-align: center;
      font-size:18px;
      
    }
    
    
  }
  
`
const Contacts = styled.div`

  margin-top:10em;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;
  height: 407px;
  width: 727px;
  border-radius: 30px;
  box-shadow: 0px 10px 6px 0px rgba(0, 0, 0, 0.25);
  background: rgb(255, 242, 224);
  column-gap: 90px;
  & > div{
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    &>h2{
      user-select: none;
      -webkit-user-select: none;
      font-family: Alegreya Sans;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0%;
      text-align: center;
      font-size:24px;
    }
    &>p{
      user-select: none;
      -webkit-user-select: none;
      font-family: Source Serif 4;
      font-size: 18px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0%;
      text-align: center;
      margin-bottom:18%;
    }
    
  }
  &> img{
    
    width: 194px;
    height: 194px;
    border-radius: 100%;
    background-image: url(${duckDere});
    background-size:cover;
    
  }
  
`
const ButtonNavAboutUs = styled.button`

    border-radius: 10px;
    background: rgb(230, 200, 156);
    color: white;
    border:0;
    width: 264px;
    height: 38px;
    cursor: pointer;
`
const ButtonNavIndivOrder = styled.button`
    width: 420px;
    height: 45px;
    background: rgb(0, 0, 0);
    border: 0;
    cursor: pointer;
    color: white;
    font-family: Alegreya Sans;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0%;
`
const Footer = styled.div`
  margin-top:20em;
  display: flex;
  flex-direction: column;
  align-items:center;
  z-index:3;
  
`
const JoinCommunity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
  font-size: 18px; /* Увеличено с 16px */
`;

const SocialLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const SocialLinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const SocialLink = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  margin-bottom: 10px;

  &:hover {
    color: #ccc;
  }
`;

const SocialIcon = styled.img`
  width: 35px; /* Увеличено с 30px */
  height: 35px; /* Увеличено с 30px */
  margin-right: 10px;
`;
const FooterSection = styled.section`
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: 45vh;
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

const socialNetworks = [
  { name: 'YouTube', icon: `${Youtube}`, link: 'https://www.youtube.com/' },
  { name: 'Pinterest', icon: `${Pint}`, link: 'https://www.pinterest.com/' },
  { name: 'VK', icon: `${VK}`, link: 'https://vk.com/' },
  { name: 'Telegram', icon: `${TG}`, link: 'https://telegram.org/' },
  { name: 'WhatsApp', icon: `${Whatsapp}`, link: 'https://web.whatsapp.com/' },
];
const handleSocialLinkClick = (link: string | URL | undefined) => {
  window.open(link, '_blank');
};
//TSX
const MainPage: FC  = observer((link) => { 

    const [products, setProducts] = useState<any[]>([]);
    
    useEffect(() => {
      // Выполняем запрос на сервер при загрузке компонента
      async function fetchData() {
          const data = await ProductService.fetchNewAndSpecialProducts();
          setProducts(data);
      }
      fetchData();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    };

    const currentCarouselProducts = useMemo(() =>  {
      const result = products.concat(products.slice(0, 2));
        return result.slice(currentIndex, currentIndex + 3)
    }, [currentIndex, products]);

    
    
    return(
      <Body >       
        <Header> 
          <BgFull src={backgroundFull} alt=''/>
            <HeaderContent>
              <h1>Уникальные изделия, созданные с любовью и вниманием к деталям</h1>
              <AnimatedParagraph>
              <p>Приветствуем вас в мире великолепных украшений, где каждое изделие - произведение искусства. Гусынина Александра Валерьевна воплощает свою страсть к бисеру в уникальные украшения, которые станут неповторимым акцентом в вашем образе.</p>
              </AnimatedParagraph>
              <Gallery/>
            </HeaderContent>
        </Header>

        <MainContent>
          
          <BrownGradientBG>
          <WhyChoseUs>
            <h2>Почему выбирают нас?</h2>
            <ol>
              <li>Индивидуальный подход: Мы создаем не только готовые изделия, но и<br></br> работаем по индивидуальным заказам. Воплотите свои идеи в жизнь вместе<br></br> с нами!</li>
              <li>Качество на первом месте: Мы используем только лучшие материалы, чтобы <br></br> каждое украшение было долговечным и оставалось красивым со временем.</li>
              <li>Широкий выбор: Наш каталог включает в себя браслеты, серьги, колье, и<br></br> многое другое. Найдите идеальное украшение для любого случая.</li>
            </ol>
          </WhyChoseUs>
          </BrownGradientBG>
          
              <FoxImg1 src={FoxImg}></FoxImg1>

          <Container3DContent>
            <ContainerModel><Model1scene><BackgroundSpline scene="https://draft.spline.design/Aj4Pp9tQtst7sXSM/scene.splinecode"></BackgroundSpline></Model1scene></ContainerModel>
          </Container3DContent>
          
          <NewAndSpeacials> 
            <div className='HP'>
              <SansSerifFont>Новинки и Акции</SansSerifFont>
              <p>Посмотрите наши последние творения и участвуйте в акциях! Наши<br></br> украшения - прекрасный подарок себе или вашим близким.</p>
            </div>
            <ContentSpecials>
                <ArrowLeftBtn onClick={handlePrevClick}><img src={leftButton} alt=''></img></ArrowLeftBtn>
                {currentCarouselProducts.map((product, index) => (
                    <CatalogElem key={index}>
                        <img src={`http://localhost:5000/${product.product.img}`} alt={product.name} />
                        <p>{product.description}</p>
                    </CatalogElem>
                ))}
                <ArrowRightBtn onClick={handleNextClick}><img src={rightButton} alt=''></img></ArrowRightBtn>
              </ContentSpecials>
              <NavLink to={SHOP_ROUTE}><ButtonNavCatalog>Перейти к каталогу</ButtonNavCatalog></NavLink>
          </NewAndSpeacials>
         
          <IndividualOrder> 
            <IndividualOrderContent>
            <img alt=''></img>
            <div>
              <IndividualOrderElem>
                   <div>
                      <h1>Закажите украшение, специально созданное для вас!</h1>
                      <p>Интересует индивидуальный заказ? Свяжитесь с Гусыниной Александрой прямо сейчас, чтобы начать процесс воплощения ваших идей в жизнь.</p>
                  </div>
                  <NavLink to={INDIVIDUAL_ORDER_ROUTE}><ButtonNavIndivOrder>Перейти к оформлению</ButtonNavIndivOrder> </NavLink>
                </IndividualOrderElem>
            </div>    
            </IndividualOrderContent>
          </IndividualOrder>

          <Contacts>
            <div>
              <h2>Контакты Гусыниной<br></br> Александры Валерьевны:</h2>
              <p>Не стесняйтесь связаться напрямую с Гусыниной Александрой для обсуждения заказа или получения дополнительной информации.</p>
              <NavLink to={ABOUTUS_ROUTE}><ButtonNavAboutUs>Перейти в раздел о нас</ButtonNavAboutUs></NavLink>
            </div>
            <img></img>
          </Contacts>
        </MainContent>

        <Container3DContent2>
            <ContainerModel2><Model1scene2><BiserModel scene="https://prod.spline.design/4roE1qjiojbMS-yw/scene.splinecode" /></Model1scene2></ContainerModel2>
        </Container3DContent2>
    
          <Footer>
          <JoinCommunity>
  <ContentWrapper>
    <h1>Присоединяйтесь к сообществу "BiserArt"</h1>
    <p>Следите за нашими новостями, участвуйте в обсуждениях и делитесь своими впечатлениями в социальных сетях.</p>
    <SocialLinksContainer>
      <SocialLinkColumn>
        {socialNetworks.slice(0, 3).map((network, index) => (
          <SocialLink key={index} onClick={() => handleSocialLinkClick(network.link)}>
            <SocialIcon src={network.icon} alt={network.name} />
            {network.name}
          </SocialLink>
        ))}
      </SocialLinkColumn>
      <SocialLinkColumn>
        {socialNetworks.slice(3).map((network, index) => (
          <SocialLink key={index} onClick={() => handleSocialLinkClick(network.link)}>
            <SocialIcon src={network.icon} alt={network.name} />
            {network.name}
          </SocialLink>
        ))}
      </SocialLinkColumn>
    </SocialLinksContainer>
  </ContentWrapper>
</JoinCommunity>
<FooterSection>
        <h4>© BiserArt 2024</h4>
        <FooterText>
          Права на все материалы, опубликованные на сайте, принадлежат их автору. Использование материалов возможно при наличии активной ссылки на источник.
        </FooterText>
        <FooterText>
          <FooterLink to="/privacy-policy">Политика конфиденциальности</FooterLink>
        </FooterText>
      </FooterSection>
          </Footer>
      </Body>
    )
}
)
export default MainPage