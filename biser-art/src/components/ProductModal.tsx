import React, { useState } from 'react';
import styled from 'styled-components';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    recommended: boolean;
    color: string;
    style: string;
    category: string;
    description: string;
    sizes: string;
}
export interface ProductModalProps {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 700;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 25px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: #333;
  transition: color 0.2s;

  &:hover {
    color: #FF7A00;
  }
`;

const ProductDetails = styled.div`
  margin-bottom: 20px;
`;

const ProductName = styled.h2`
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductSizes = styled.p`
  margin-bottom: 20px;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  background-color: #FF7A00;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FF5700;
  }
`;

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ProductDetails>
          <ProductName>{product.name}</ProductName>
          <ProductImage src={product.image} alt={product.name} />
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>Цена: {product.price} ₽</ProductPrice>
          <ProductSizes>Размеры: {product.sizes}</ProductSizes>
        </ProductDetails>
        <div>
          <QuantityInput
            type="number"
            value={quantity}
            min="1"
            onChange={(e: { target: { value: any; }; }) => setQuantity(Number(e.target.value))}
          />
          <AddToCartButton onClick={handleAddToCart}>Добавить в корзину</AddToCartButton>
        </div>
      </ModalContent>
    </ModalBackground>
  );
};

export default ProductModal;