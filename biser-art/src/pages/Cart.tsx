import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';

const CartContainer = styled.div`
    margin: 15% 5% 5% 5%;
    padding: 2%;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CartItemDetails = styled.div`
    flex: 1;
    margin-left: 20px;
`;

const CartSummary = styled.div`
    margin-top: 20px;
    font-size: 18px;
`;

const PromoCodeContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
`;

const Button = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #FF7A00;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    &:hover {
        background-color: #e66900;
    }
`;

const Input = styled.input`
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
`;

const RemoveCheckbox = styled.input`
    margin-right: 10px;
`;

const CartItemImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
`;

const Cart: React.FC = observer(() => {
    const { cartStore } = useContext(Context);
    const [promoCode, setPromoCode] = useState('');
    const [showPromoInput, setShowPromoInput] = useState(false);
    const navigate = useNavigate();

    const handleApplyPromo = () => {
        cartStore.applyPromoCode(promoCode);
        setPromoCode('');
        setShowPromoInput(false);
    };

    const totalItems = cartStore.totalCount || 0;
    const totalPrice = cartStore.totalAmount || 0;
    const totalDiscount = cartStore.discount || 0;
    const totalPriceWithDiscount = cartStore.totalAmountWithDiscount || 0;

    return (
        <CartContainer>
            <h2>Корзина</h2>
            {cartStore.cartItems.length > 0 ? (
                cartStore.cartItems.map((item) => (
                    <CartItem key={item.product.id}>
                        <RemoveCheckbox 
                            type="checkbox" 
                            onChange={() => cartStore.removeFromCart(item.product.id)} 
                        />
                        <CartItemImage src={item.product.image} alt={item.product.name} />
                        <CartItemDetails>
                            <p><strong>{item.product.name}</strong></p>
                            <p>Категория: {item.product.category}</p>
                            <p>Цвет: {item.product.color}</p>
                            <p>Размеры: {item.product.sizes}</p>
                            <p>Количество: {item.quantity}</p>
                            <p>Цена за единицу: {item.product.price} ₽</p>
                        </CartItemDetails>
                        <div>
                            <p><strong>Общая стоимость:</strong> {item.product.price * item.quantity} ₽</p>
                        </div>
                    </CartItem>
                ))
            ) : (
                <p>Ваша корзина пуста</p>
            )}
            <CartSummary>
                <p>Всего товаров: {totalItems}</p>
                <p>Общая стоимость: {totalPrice} ₽</p>
                <p>Скидка: {totalDiscount > 0 ? `-${totalDiscount}` : totalDiscount} ₽</p>
                <p><strong>К оплате: {totalPriceWithDiscount} ₽</strong></p>
            </CartSummary>
            <PromoCodeContainer>
                {showPromoInput ? (
                    <>
                        <Input
                            type="text"
                            placeholder="Введите промокод"
                            value={promoCode}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPromoCode(e.target.value)}
                        />
                        <Button onClick={handleApplyPromo}>Применить</Button>
                    </>
                ) : (
                    <Button onClick={() => setShowPromoInput(true)}>Добавить промокод</Button>
                )}
            </PromoCodeContainer>
            <Button onClick={() => navigate('/cart/checkout')}>Оформить заказ</Button>
        </CartContainer>
    );
});

export default Cart;