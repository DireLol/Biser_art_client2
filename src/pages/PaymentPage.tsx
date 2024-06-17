import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Context } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { THANKYOU_ROUTE, MAINPAGE_ROUTE } from '../utils/consts';

const Container = styled.div`
font-family: 'Alegreya Sans', sans-serif;
  margin: 15% 5% 5% 5%;
  padding: 2%;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

const FormSection = styled.div`
  flex: 1;
  margin-right: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CartSection = styled.div`
  flex: 1;
  margin-left: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  object-fit: cover;
  border-radius: 5px;
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
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
const PaymentPage: React.FC = observer(() => {
  const { cartStore, orderStore } = useContext(Context);
  const [deliveryMethod, setDeliveryMethod] = useState<'доставка' | 'самовывоз'>('самовывоз');
  const [paymentMethod, setPaymentMethod] = useState<'наличными' | 'картой' | 'сбп' | ''>('');
  const [address, setAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    const order = {
      items: cartStore.cartItems,
      deliveryMethod,
      paymentMethod,
      address,
      pickupDate,
      pickupTime,
      phoneNumber,
      totalAmount: cartStore.totalAmountWithDiscount,
    };

    orderStore.addOrder(order);

    alert('Заказ подтвержден!');
    navigate(THANKYOU_ROUTE);
  };

  const sevenDaysFromNow = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const timeSlots = [
    'С 15 до 16',
    'С 16 до 17',
    'С 17 до 18',
    'С 18 до 19',
    'С 19 до 20',
    'С 20 до 21',
  ];

  const isPaymentMethodDisabled = deliveryMethod === 'доставка' && !address;

  return (
    <>
    <Container>
      <FormSection>
        <SectionTitle>Выберите способ получения заказа</SectionTitle>
        <Select value={deliveryMethod} onChange={(e: { target: { value: string; }; }) => setDeliveryMethod(e.target.value as 'доставка' | 'самовывоз')}>
          <option value="доставка">Доставка</option>
          <option value="самовывоз">Пункт выдачи</option>
        </Select>
        {deliveryMethod === 'доставка' && (
          <>
            <Input
              type="text"
              placeholder="Адрес доставки"
              value={address}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setAddress(e.target.value)}
            />
            {!address && (
              <Message>Для того, чтобы выбрать способ оплаты и сделать заказ, укажите адрес доставки или выберите пункт выдачи.</Message>
            )}
          </>
        )}
        {deliveryMethod === 'самовывоз' && (
          <>
            <SectionTitle>Выберите удобное для вас время</SectionTitle>
            <Select value={pickupDate} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPickupDate(e.target.value)}>
              <option value="">Выберите дату</option>
              {sevenDaysFromNow().map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </Select>
            <Select value={pickupTime} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPickupTime(e.target.value)}>
              <option value="">Выберите время</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </Select>
          </>
        )}
        {(address || deliveryMethod === 'самовывоз') && (
          <>
            <SectionTitle>Выберите способ оплаты</SectionTitle>
            <Select value={paymentMethod} onChange={(e: { target: { value: string; }; }) => setPaymentMethod(e.target.value as 'наличными' | 'картой' | 'сбп')} disabled={isPaymentMethodDisabled}>
              <option value="">Выберите способ оплаты</option>
              <option value="наличными">При получении</option>
              <option value="картой">Банковская карта</option>
              <option value="сбп">Система Быстрых Платежей</option>
            </Select>
          </>
        )}
      </FormSection>

      <CartSection>
        <SectionTitle>Ваш заказ</SectionTitle>
        {cartStore.cartItems.map((item) => (
          <CartItem key={item.product.id}>
            <CartItemImage src={item.product.image} alt={item.product.name} />
            <div>
              <p><strong>{item.product.name}</strong> ({item.product.category}, {item.product.color}, {item.product.sizes})</p>
              <p>Количество: {item.quantity}</p>
              <p>Цена за единицу: {item.product.price} ₽</p>
            </div>
            <div>
              <p><strong>Общая стоимость:</strong> {item.product.price * item.quantity} ₽</p>
            </div>
          </CartItem>
        ))}
        <div>
          <p><strong>Итого:</strong> {cartStore.totalCount} товара</p>
          <p><strong>К оплате:</strong> {cartStore.totalAmountWithDiscount} ₽</p>
        </div>
        <Message>Для подтверждения заказа, пожалуйста, укажите номер телефона</Message>
        <Input
          type="text"
          placeholder="Номер телефона"
          value={phoneNumber}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhoneNumber(e.target.value)}
        />
        <Button onClick={handleConfirmOrder} disabled={!phoneNumber}>
          {paymentMethod === 'наличными' ? 'Подтвердить заказ' : paymentMethod === 'картой' ? 'Оплатить картой' : paymentMethod === 'сбп' ? 'Оплатить СПБ' : 'Оформить заказ'}
        </Button>
        <BackButton onClick={() => navigate(MAINPAGE_ROUTE)}>Вернуться на главную</BackButton>
      </CartSection>
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
});

export default PaymentPage;