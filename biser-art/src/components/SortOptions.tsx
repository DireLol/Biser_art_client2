import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import styled from 'styled-components';
//----------------------------------- Massive ---------------------------------------------
const SortContainer = styled.div`
  margin-bottom: 10px;
`;

const SortFilter: React.FC = observer(() => {
    const { productStore } = useContext(Context);

    const handleSortChange = (value: number) => {
        productStore.setFilterOptions({ ...productStore.filterOptions, price: value });
    };

    return (
        <SortContainer>
            <label>Сортировка:</label>
            <select onChange={(e) => handleSortChange(Number(e.target.value))}>
                <option value={0}>Рекомендуемые</option>
                <option value={1}>По возрастанию цены</option>
                <option value={2}>По убыванию цены</option>
            </select>
        </SortContainer>
    );
});

export default SortFilter;