import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  margin-top: 20px;
  background-color: orange;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;

interface ResetButtonProps {
    onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
    return <Button onClick={onReset}>Сбросить</Button>;
};

export default ResetButton;