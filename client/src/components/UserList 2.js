import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../queries';

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data.users.map(({ id, username, email }) => (
          <li key={id}>{username} - {email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;