import { useDispatch, useSelector } from 'react-redux';

import {
  changeLoginField,
  requestLogin,
  logout,
} from './actions';
import { get } from './utils';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const accessToken = useSelector(get('accessToken'));
  const { email, password } = useSelector(get('loginFields'));

  function handleChange({ name, value }) {
    dispatch(changeLoginField({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestLogin());
  }

  function handleClick() {
    dispatch(logout());
  }

  return (
    <>
      {accessToken ? (
        <LogoutForm onClick={handleClick} />
      ) : (
        <LoginForm
          email={email}
          password={password}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}

    </>
  );
}
