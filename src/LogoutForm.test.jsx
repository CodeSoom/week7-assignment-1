import { fireEvent, render } from '@testing-library/react';

import LogoutForm from './LogoutForm';

describe('LogoutForm', () => {
  const handleClick = jest.fn();

  // 질문: 이 테스트 케이스에서는 onClick props가 필요없는 상황인데 굳이 넘겨줄 필요가 없어보입니다.
  // 테스트에 필요한 props만 넘기는 것에 어떻게 생각하시나요?
  it('renders "Log out" button', () => {
    const { getByRole } = render(<LogoutForm onClick={handleClick} />);

    expect(getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('listens click event', () => {
    const { getByRole } = render(<LogoutForm onClick={handleClick} />);

    fireEvent.click(getByRole('button', { name: 'Log out' }));

    expect(handleClick).toBeCalled();
  });
});
