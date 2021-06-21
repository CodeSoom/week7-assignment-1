import { fireEvent, render } from '@testing-library/react';
import LogoutForm from './LogoutForm';

describe('LogoutForm', () => {
  const handleClickLogout = jest.fn();

  beforeEach(() => {
    handleClickLogout.mockClear();
  });

  it('renders Logout Button and listens click event', () => {
    const { container, getByText } = render(<LogoutForm onClick={handleClickLogout} />);

    fireEvent.click(getByText('Logout'));

    expect(container).toHaveTextContent('Logout');
    expect(handleClickLogout).toBeCalled();
  });
});
