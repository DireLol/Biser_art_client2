import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../index';

const Container = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const UserList: React.FC = observer(() => {
  const { adminStore } = useContext(Context);
  const [showUsers, setShowUsers] = useState(false);

  return (
    <Container>
      <h2>Список пользователей</h2>
      <Button onClick={() => setShowUsers(!showUsers)}>
        {showUsers ? 'Скрыть пользователей' : 'Показать пользователей'}
      </Button>
      {showUsers && (
        <ul>
          {adminStore.users.map((user: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
});

export default UserList;