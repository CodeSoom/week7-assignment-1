import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import LoginPage from './LoginPage';

jest.mock('react-redux');
describe('LoginPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: '',
        password: '',
      },
    }));
  });

  it('renders title', () => {
    const { getByRole } = render((<LoginPage />));

    expect(getByRole('heading', { name: 'Log In' })).toBeInTheDocument();
  });
});
