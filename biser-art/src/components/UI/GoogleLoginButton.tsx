import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4285F4;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }
`;

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/user/auth/google';
  };

  return <Button onClick={handleLogin}>Login with Google</Button>;
};

export default GoogleLoginButton;