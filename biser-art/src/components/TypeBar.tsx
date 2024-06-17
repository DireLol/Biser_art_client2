import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { styled } from "styled-components";

import { Context } from '../index';

const TypeBarContainer = styled.div`
    margin-top:25%;
`
const TypeBar = observer(() => {
    const {productStore} = useContext(Context)
    return(
        <TypeBarContainer>
            {/* {productStore._beadType.map(type => 
            <div
                style={{cursor: 'pointer', fontWeight: type.beadTypeId === productStore.selectedType.id ? 'bold' : 'normal'}}
                onClick={() => productStore.setSelectedType(type)}
                key={type.beadTypeId}
            > 
                {type.name}
            </div>
            )} */}
        </TypeBarContainer>
    );
});

export default TypeBar;
