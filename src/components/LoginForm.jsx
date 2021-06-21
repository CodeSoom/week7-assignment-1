import React from 'react';

export default function LoginForm({ fields: { email, password }, onChange, onSubmit }) {
  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }
  return (
    <div>
      <label htmlFor="login-email">E-mail</label>
      <input
        type="email"
        id="login-email"
        name="email"
        value={email}
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <label htmlFor="login-password">Password</label>
      <input
        type="password"
        id="login-password"
        name="password"
        value={password}
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <button type="button" onClick={onSubmit}>
        Log In
      </button>
    </div>
  );
}
