import React, { useState } from 'react';
import styled from 'styled-components';
import bananaCat from '../images/bananaCat.jpg'
import bee from '../images/bee.jpg'
import ringOrange from '../images/ringOrange.jpg'
import spider from '../images/spider.jpg'
import duck from '../images/duck.jpg'
import ringBlackAndWhite from '../images/ringBlackAndWhite.jpg'

const GalleryImages = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  column-gap: 46px;
  row-gap:92px;
  margin-bottom:10%;
`;

const GaleryImageElem = styled.img`
    width: 175px;
    height: 252px;
  
    
    cursor: pointer;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:51;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  z-index:51;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 40px;
  background-color: transparent;
  border: none;
  font-size: 120px;
  cursor: pointer;
  z-index:51;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  z-index:51;
`;

const Gallery = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageSrc: React.SetStateAction<string>) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      <GalleryImages>
        <GaleryImageElem src={bananaCat} alt='' onClick={() => handleImageClick(bananaCat)} />
        <GaleryImageElem src={bee} alt='' onClick={() => handleImageClick(bee)} />
        <GaleryImageElem src={ringOrange} alt='' onClick={() => handleImageClick(ringOrange)} />
        <GaleryImageElem src={spider} alt='' onClick={() => handleImageClick(spider)} />
        <GaleryImageElem src={duck} alt='' onClick={() => handleImageClick(duck)} />
        <GaleryImageElem src={ringBlackAndWhite} alt='' onClick={() => handleImageClick(ringBlackAndWhite)} />

        {/* Добавьте обработчики событий для других изображений */}
      </GalleryImages>
      
      {modalOpen && (
        <ModalBackground>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <ModalImage src={selectedImage} alt='' />
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};

export default Gallery;