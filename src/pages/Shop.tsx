import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Context } from '../index';
import ProductModal from '../components/ProductModal';
import { Link } from 'react-router-dom';

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

const PageContainer = styled.div`
font-family: 'Alegreya Sans', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15% auto 0 auto;
  width: 100%;
  max-width: 1200px; /* Ограничьте максимальную ширину контейнера */
  padding: 0 20px; /* Добавьте внутренние отступы для предотвращения переполнения */
  gap: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
  box-sizing: border-box; /* Гарантируйте, что padding и border включены в общую ширину */
`;

const FilterContainer = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-sizing: border-box;
`;

const ProductListContainer = styled.div`
  flex: 3;
  box-sizing: border-box;
`;

const FilterOption = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  display: block;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #FF7A00;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
  transition: background-color 0.3s;
  box-sizing: border-box;

  &:hover {
    background-color: #e06b00;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
  text-align: center;
  background-color: white;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  box-sizing: border-box;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
`;

const ProductDetails = styled.div`
  text-align: left;
  box-sizing: border-box;
`;

const ProductName = styled.h4`
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  color: #666;
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
const Shop: React.FC = observer(() => {
  const { adminStore, cartStore } = useContext(Context);
  const [sortOption, setSortOption] = useState('none');
  const [filterColor, setFilterColor] = useState('');
  const [filterStyle, setFilterStyle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [visibleProductsCount, setVisibleProductsCount] = useState(9);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleColorFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterColor(e.target.value);
  };

  const handleStyleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStyle(e.target.value);
  };

  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  const handleResetFilters = () => {
    setSortOption('none');
    setFilterColor('');
    setFilterStyle('');
    setFilterCategory('');
  };

  const handleShowMore = () => {
    setVisibleProductsCount(visibleProductsCount + 9);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    cartStore.addToCart(product, quantity);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const getSortedProducts = (products: Product[]) => {
    switch (sortOption) {
      case 'priceAsc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'recommended':
        return products.filter(product => product.recommended);
      default:
        return products;
    }
  };

  const getFilteredProducts = (products: Product[]) => {
    return products.filter(
      (product) =>
        (filterColor === '' || product.color === filterColor) &&
        (filterStyle === '' || product.style === filterStyle) &&
        (filterCategory === '' || product.category === filterCategory)
    );
  };

  const filteredAndSortedProducts = getSortedProducts(getFilteredProducts(adminStore.products));
  const visibleProducts = filteredAndSortedProducts.slice(0, visibleProductsCount);

  return (
    <PageContainer>
      <Container>
        <Content>
          <FilterContainer>
            <h3>Фильтры</h3>
            <FilterOption value={filterCategory} onChange={handleCategoryFilterChange}>
              <option value="">Все категории</option>
              {adminStore.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterOption>
            <FilterOption value={filterColor} onChange={handleColorFilterChange}>
              <option value="">Все цвета</option>
              {adminStore.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </FilterOption>
            <FilterOption value={filterStyle} onChange={handleStyleFilterChange}>
              <option value="">Все стили</option>
              <option value="Классический">Классический</option>
              <option value="Современный">Современный</option>
              <option value="Этнический">Этнический</option>
            </FilterOption>
            <Button onClick={handleResetFilters}>Сбросить фильтры</Button>
          </FilterContainer>
          <ProductListContainer>
            <h3>Сортировка</h3>
            <FilterOption value={sortOption} onChange={handleSortChange}>
              <option value="none">Без сортировки</option>
              <option value="priceAsc">По возрастанию цены</option>
              <option value="priceDesc">По убыванию цены</option>
              <option value="recommended">Рекомендованные</option>
            </FilterOption>
            <ProductList>
              {visibleProducts.map(product => (
                <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
                  <ProductImageContainer>
                    <ProductImage src={product.image} alt={product.name} />
                  </ProductImageContainer>
                  <ProductDetails>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>Цена: {product.price} ₽</ProductPrice>
                    <p>Цвет: {product.color}</p>
                    <p>Стиль: {product.style}</p>
                    <p>Категория: {product.category}</p>
                  </ProductDetails>
                </ProductCard>
              ))}
            </ProductList>
            {visibleProductsCount < filteredAndSortedProducts.length && (
              <Button onClick={handleShowMore}>Показать больше товаров</Button>
            )}
          </ProductListContainer>
        </Content>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        )}
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
    </PageContainer>
  );
});

export default Shop;









