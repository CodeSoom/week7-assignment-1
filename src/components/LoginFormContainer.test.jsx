import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';
import { changeLoginField } from '../redux/actions';

jest.mock('react-redux');
describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      loginFields: { email: 'tester@example.com', password: 'test' },
      accessToken: given.accessToken,
    }));
  });

  context('when logged out', () => {
    given('accessToken', () => '');
    it('listen change events', () => {
      const { getByLabelText } = render(<LoginFormContainer />);

      expect(getByLabelText('E-mail').value).toBe('tester@example.com');

      fireEvent.change(getByLabelText('E-mail'), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalledWith(
        changeLoginField({
          name: 'email',
          value: 'new email',
        }),
      );

      expect(getByLabelText('Password').value).toBe('test');
    });

    it('renders Log In Button', () => {
      const { getByText } = render(<LoginFormContainer />);

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalled();
    });
  });

  context('when logged In', () => {
    given('accessToken', () => 'ACCESS_TOKEN');

    it('renders Logout Button and listens click event', () => {
      const { container, getByText } = render(<LoginFormContainer />);

      fireEvent.click(getByText('Logout'));

      expect(container).toHaveTextContent('Logout');
      expect(dispatch).toBeCalledWith({
        type: 'logout',
      });
    });
  });
});
