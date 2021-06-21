import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestLogin, changeLoginField, logout } from '../redux/actions';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import { get } from '../utils';

export default function LoginFormContainer() {
  const dispatch = useDispatch();
  const { email, password } = useSelector(get('loginFields'));
  const accessToken = useSelector(get('accessToken'));

  function handleSubmit() {
    dispatch(requestLogin());

    // todo : 로그인 성공하면 -> 로컬 스토리지에 저장
  }
  function handleChange({ name, value }) {
    dispatch(changeLoginField({ name, value }));
  }

  function handleClickLogout() {
    dispatch(logout());
  }
  return (
    <>
      {accessToken ? (
        <LogoutForm onClick={handleClickLogout} />
      ) : (
        <LoginForm
          fields={{ email, password }}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
