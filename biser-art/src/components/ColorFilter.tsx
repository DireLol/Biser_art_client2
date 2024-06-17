import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import styled from 'styled-components';
//----------------------------------- Massive ---------------------------------------------
const ColorContainer = styled.div`
  margin-bottom: 10px;
`;

const ColorFilter: React.FC = observer(() => {
    const { productStore } = useContext(Context);

    const handleColorChange = (value: number) => {
        productStore.setFilterOptions({ ...productStore.filterOptions, jewelryColorId: value });
    };

    return (
        <ColorContainer>
            <label>Цвет:</label>
            <select onChange={(e) => handleColorChange(Number(e.target.value))}>
                <option value={0}>Все</option>
                <option value={1}>Желтый</option>
                <option value={2}>Голубой</option>
                <option value={3}>Синий</option>
                <option value={4}>Зеленый</option>
                <option value={5}>Коричневый</option>
                <option value={6}>Серый</option>
                <option value={7}>Черный</option>
                <option value={8}>Оранжевый</option>
                <option value={9}>Бежевый</option>
                <option value={10}>Красный</option>
                <option value={11}>Фиолетовый</option>
                <option value={12}>Бирюзовый</option>
                <option value={13}>Белый</option>
            </select>
        </ColorContainer>
    );
});

export default ColorFilter;