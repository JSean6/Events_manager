import React, { useState } from 'react';

function DeleteUserForm() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      setMessage('Please enter a user ID.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('User deleted successfully.');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      setMessage('An error occurred while deleting the user.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={handleChange} />
        </label>
        <button type="submit">Delete User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteUserForm;
