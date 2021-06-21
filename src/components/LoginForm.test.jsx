import { fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  function renderLoginForm({ email, password }) {
    return render(
      <LoginForm
        fields={{ email, password }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />,
    );
  }

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  it('renders input controls and listens change events', () => {
    const email = 'tester';
    const password = '1234';
    useSelector.mockImplementation((selector) => selector({
      regions: [],
      categories: [],
      restaurants: [],
    }));

    const { getByLabelText } = renderLoginForm({ email, password });
    const controls = [
      {
        label: 'E-mail',
        name: 'email',
        origin: email,
        value: 'tester@example.com',
      },
      {
        label: 'Password',
        name: 'password',
        origin: password,
        value: 'test',
      },
    ];

    controls.forEach(({
      label, name, origin, value,
    }) => {
      const input = getByLabelText(label);

      expect(input.value).toBe(origin);

      fireEvent.change(
        input, { target: { value } },
      );

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('renders Log In Button', () => {
    // 이 테스트에서는 이메일과 비밀번호 값 여부가 중요하지 않아 빈 객체를 넣어줌.
    // const email = 'tester';
    // const password = '1234';
    const { getByText } = renderLoginForm({
      /* email, password */
    });

    fireEvent.click(getByText('Log In'));

    expect(handleSubmit).toBeCalled();
  });
});
