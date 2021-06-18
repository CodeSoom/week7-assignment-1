import { useDispatch, useSelector } from 'react-redux';

import {
  requestLogin,
  changeLoginFields,
} from './actions';

import LoginForm from './LoginForm';

import { get } from './utils';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { email, password } = useSelector(get('loginFields'));
  const accessToken = useSelector(get('accessToken'));

  function handleChange({ name, value }) {
    dispatch(changeLoginFields({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestLogin());
  }

  return (
    <>
      <LoginForm
        fields={{ email, password }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <p>{accessToken}</p>
    </>
  );
}
