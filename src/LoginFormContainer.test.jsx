import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import given from 'given2';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: '',
        password: '',
      },
      accessToken: given.accessToken,
    }));
  });

  context('when logged in', () => {
    beforeEach(() => {
      given('accessToken', () => 'ACCESS_TOKEN');
    });

    // 질문: 'it calls dispatch with "logout" action'가 test case에 더 적합한지 궁금합니다.
    it('listens "Log out" click event', () => {
      const { getByRole } = render((<LoginFormContainer />));

      fireEvent.click(getByRole('button', { name: 'Log out' }));

      expect(dispatch).toBeCalledWith({
        type: 'logout',
      });
    });
  });

  context('when logged out', () => {
    beforeEach(() => {
      given('accessToken', () => '');
    });

    it('listens change event', () => {
      const { getByLabelText } = render((<LoginFormContainer />));

      const controls = [
        { label: 'E-mail', name: 'email', value: 'test@test.com' },
        { label: 'Password', name: 'password', value: 'test' },
      ];

      controls.forEach(({ label, name, value }) => {
        fireEvent.change(getByLabelText(label), {
          target: { value },
        });

        expect(dispatch).toBeCalledWith({
          type: 'changeLoginField',
          payload: { name, value },
        });
      });
    });

    it('listens "Log In" click event', () => {
      const { getByRole } = render((<LoginFormContainer />));

      fireEvent.click(getByRole('button', { name: 'Log In' }));

      expect(dispatch).toBeCalled();
    });
  });
});
