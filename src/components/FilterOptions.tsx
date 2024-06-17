import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import styled from 'styled-components';
import SortFilter from './SortOptions';
import ColorFilter from './ColorFilter';
import StyleFilter from './StyleFilter';
import ResetButton from './ResetButton';
//----------------------------------- Massive ---------------------------------------------
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const FilterOptions: React.FC = observer(() => {
    const { productStore } = useContext(Context);

    return (
        <FilterContainer>
            <SortFilter />
            <ColorFilter />
            <StyleFilter />
            <ResetButton onReset={() => productStore.resetFilterOptions()} />
        </FilterContainer>
    );
});

export default FilterOptions;