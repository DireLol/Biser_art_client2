import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import styled from 'styled-components';
//----------------------------------- Massive ---------------------------------------------
const StyleContainer = styled.div`
  margin-bottom: 10px;
`;

const StyleFilter: React.FC = observer(() => {
    const { productStore } = useContext(Context);

    // const handleStyleChange = (value: number) => {
    //     productStore.setFilterOptions({ ...productStore.filterOptions, jewelryStyleId: value });
    // };

    return (
        <StyleContainer>
            {/* <label>Стиль:</label>
            <select onChange={(e) => handleStyleChange(Number(e.target.value))}>
                <option value={0}>Все</option>
                <option value={1}>Классический</option>
                <option value={2}>Этнический</option>
                <option value={3}>Готика</option>
                <option value={4}>Спортивный</option>
                <option value={5}>Фэнтези</option>
                <option value={6}>Бисероплетение</option>
                <option value={7}>Эклектика</option>
            </select> */}
        </StyleContainer>
    );
});

export default StyleFilter;