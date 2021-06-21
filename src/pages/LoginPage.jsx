import React from 'react';

import { Link } from 'react-router-dom';
import LoginFormContainer from '../components/LoginFormContainer';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginFormContainer />
    </div>
  );
}
