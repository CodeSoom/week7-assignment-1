import React from 'react';

export default function LogoutForm({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      Logout
    </button>
  );
}
