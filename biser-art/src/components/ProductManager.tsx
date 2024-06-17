import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Context } from '../index';

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

const Container = styled.div`
  margin: 20px;
`;

const Header = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductDetails = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const ProductName = styled.span`
  font-weight: bold;
`;

const ProductPrice = styled.span`
  color: #666;
  margin-left: 10px;
`;

const ProductForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  resize: vertical;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1em;
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
  z-index: 400;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

const ProductManager: React.FC = observer(() => {
  const { adminStore } = useContext(Context);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [category, setCategory] = useState('');
  const [recommended, setRecommended] = useState(false);
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = () => {
    if (name && price && image && color && style && category && description && sizes) {
      if (editingProduct) {
        adminStore.updateProduct({
          ...editingProduct,
          name,
          price: Number(price),
          image,
          color,
          style,
          category,
          recommended,
          description,
          sizes,
        });
      } else {
        adminStore.addProduct({
          name,
          price: Number(price),
          image,
          color,
          style,
          category,
          recommended,
          description,
          sizes,
        });
      }
      resetForm();
      setIsModalOpen(false);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setImage('');
    setColor('');
    setStyle('');
    setCategory('');
    setRecommended(false);
    setDescription('');
    setSizes('');
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setColor(product.color);
    setStyle(product.style);
    setCategory(product.category);
    setRecommended(product.recommended);
    setDescription(product.description);
    setSizes(product.sizes);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    adminStore.deleteProduct(id);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Container>
      <Header>Управление продуктами</Header>
      <Button onClick={() => setIsModalOpen(true)}>Добавить продукт</Button>
      <ProductList>
        {adminStore.products.map((product: Product) => (
          <ProductItem key={product.id}>
            <ProductDetails>
              <ProductName>{product.name}</ProductName> - <ProductPrice>{product.price} ₽</ProductPrice>
            </ProductDetails>
            {product.image && <ProductImage src={product.image} alt={product.name} />}
            <Button onClick={() => handleEditProduct(product)}>Редактировать</Button>
            <Button onClick={() => handleDeleteProduct(product.id)}>Удалить</Button>
          </ProductItem>
        ))}
      </ProductList>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm>
          <Input
            type="text"
            placeholder="Название продукта"
            value={name}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Цена продукта"
            value={price}
            onChange={(e: { target: { value: string; }; }) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
          />
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          <Select value={color} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setColor(e.target.value)}>
            <option value="">Выберите цвет</option>
            {adminStore.colors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </Select>
          <Select value={style} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setStyle(e.target.value)}>
            <option value="">Выберите стиль</option>
            <option value="Классический">Классический</option>
            <option value="Этнический">Этнический</option>
            <option value="Современный">Современный</option>
          </Select>
          <Select value={category} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCategory(e.target.value)}>
            <option value="">Выберите категорию</option>
            {adminStore.categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          <TextArea
            placeholder="Описание продукта"
            value={description}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Размеры продукта"
            value={sizes}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSizes(e.target.value)}
          />
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={recommended}
              onChange={(e) => setRecommended(e.target.checked)}
            />
            Рекомендованный продукт
          </CheckboxLabel>
          <Button onClick={handleAddProduct}>{editingProduct ? 'Сохранить изменения' : 'Добавить продукт'}</Button>
        </ProductForm>
      </Modal>
    </Container>
  );
});

export default ProductManager;