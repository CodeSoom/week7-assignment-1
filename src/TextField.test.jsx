import { fireEvent, render } from '@testing-library/react';

import TextField from './TextField';

describe('TextField', () => {
  const EMAIL = 'test@naver.com';

  const handleChange = jest.fn();

  function renderTextField({ type, value } = {}) {
    return render((
      <TextField
        label="E-mail"
        type={type}
        name="email"
        value={value}
        onChange={handleChange}
      />
    ));
  }

  context('with type', () => {
    it('renders "number" type', () => {
      const { getByLabelText } = renderTextField({ type: 'number' });

      expect(getByLabelText('E-mail').type).toBe('number');
    });
  });

  context('without type', () => {
    it('renders "text" type', () => {
      const { getByLabelText } = renderTextField();

      expect(getByLabelText('E-mail').type).toBe('text');
    });
  });

  // type을 number로 했다가 30분 디버깅함. test코드에서 type이 number인 input에는 이메일형식은 못들어가서 에러출력
  it('renders input controller', () => {
    const { getByLabelText } = renderTextField({ type: 'email', value: EMAIL });

    expect(getByLabelText('E-mail').value).toBe(EMAIL);
  });

  it('listens change event', () => {
    const CHANGED_EMAIL = 'test@example.com';

    const { getByLabelText } = renderTextField({ type: 'email', value: EMAIL });

    fireEvent.change(getByLabelText('E-mail'), { target: { value: CHANGED_EMAIL } });

    expect(handleChange).toBeCalledWith({ name: 'email', value: CHANGED_EMAIL });
  });
});
