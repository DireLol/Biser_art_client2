import React, { useState } from 'react';
import styled from 'styled-components';
import BlueBraslet from '../images/internetImg/BlueBraslet.jpg';
import BlueBrosh from '../images/internetImg/BlueBrosh.jpg';
import EtnicCulon from '../images/internetImg/EtnicCulon.jpg';
import GreenBlacelet from '../images/internetImg/GreenBlacelet.jpg';
import GreenForestBracelet from '../images/internetImg/GreenForestBracelet.jpg';
import RedBracelet from '../images/internetImg/RedBracelet.jpg';
import RedBracenet from '../images/internetImg/RedBracenet.jpg';
import BlackExpress from '../images/internetImg/BlackExpress.jpg';
import podsolnychiRing from '../images/internetImg/podsolnychiRing.png';
import snake from '../images/snake.jpg'
import { Link } from 'react-router-dom';

const GalleryContainer = styled.div`
font-family: 'Alegreya Sans', sans-serif;
  margin-top: 15%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:hover div {
    opacity: 1;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  color: white;
  cursor: pointer;
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

interface GalleryItemProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const Gallery: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItemProps | null>(null);

  const images: GalleryItemProps[] = [
    { src: `${BlueBraslet}`, alt: 'Синий браслет', title: 'Синий браслет', description: 'Красивый синий браслет.' },
    { src: `${BlueBrosh}`, alt: 'Голубая брошь', title: 'Голубая брошь', description: 'Элегантная голубая брошь.' },
    { src: `${EtnicCulon}`, alt: 'Этнический Кулон', title: 'Этнический Кулон', description: 'Подвеска в этническом стиле.' },
    { src: `${GreenBlacelet}`, alt: 'Зеленый жакет', title: 'Зеленый жакет', description: 'Стильный зеленый браслет.' },
    { src: `${GreenForestBracelet}`, alt: 'Браслет из зеленого леса', title: 'Браслет из зеленого леса', description: 'Браслет, вдохновленный лесом.' },
    { src: `${RedBracelet}`, alt: 'Красный браслет', title: 'Красный браслет', description: 'Браслет ярко-красного цвета.' },
    { src: `${RedBracenet}`, alt: 'Красный браслет', title: 'Красный браслет', description: 'Яркий красный браслет.' },
    { src: `${BlackExpress}`, alt: 'Черный экспресс', title: 'Черный экспресс', description: 'Изысканный черный аксессуар.' },
    { src: `${podsolnychiRing}`, alt: 'Кольцо с подсолнухами', title: 'Кольцо с подсолнухами', description: 'Кольцо с рисунком подсолнуха.' },
    { src: `${snake}`, alt: 'Змейка', title: 'Змейка', description: 'Фигурка фдохновленная игрой "змейкой"' }
  ];

  const handleImageClick = (image: GalleryItemProps) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (<>
  
    <GalleryContainer>
      <h2>Галерея</h2>
      <GalleryGrid>
        {images.map((image, index) => (
          <GalleryItem key={index} onClick={() => handleImageClick(image)}>
            <GalleryImage src={image.src} alt={image.alt} />
            <ImageOverlay>
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </ImageOverlay>
          </GalleryItem>
        ))}
      </GalleryGrid>

      {isModalOpen && selectedImage && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <ModalImage src={selectedImage.src} alt={selectedImage.alt} />
          </ModalContent>
        </ModalOverlay>
      )}
    </GalleryContainer>
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

export default Gallery;