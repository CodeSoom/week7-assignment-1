import { fireEvent, render } from '@testing-library/react';

import TextField from './TextField';

describe('TextField', () => {
  const handleChange = jest.fn();

  it('renders label and input control ', () => {
    const { queryByLabelText } = render(
      <TextField
        label="평점"
        type="number"
        name="score"
        onChange={handleChange}
      />,
    );

    expect(queryByLabelText('평점')).not.toBeNull();
  });

  context('with type', () => {
    it('renders "Text" input control ', () => {
      const { container } = render(
        <TextField
          label="평점"
          type="number"
          name="score"
          onChange={handleChange}
        />,
      );
      expect(container).toContainHTML('type="number"');
    });
  });

  context('without type', () => {
    it('renders "Text" input control ', () => {
      const { container } = render(
        <TextField
          label="리뷰내용"
          name="discription"
          onChange={handleChange}
        />,
      );
      expect(container).toContainHTML('type="text"');
    });
  });

  it('listens description change events', () => {
    const name = 'score';
    const value = '5';
    const { getByLabelText } = render(
      <TextField
        label="평점"
        type="number"
        name="score"
        onChange={handleChange}
      />,
    );

    fireEvent.change(getByLabelText('평점'), { target: { value } });

    expect(handleChange).toBeCalledWith({ name, value });
  });

  it('renders value ', () => {
    const value = '5';
    const { queryByLabelText } = render(
      <TextField
        label="평점"
        type="number"
        name="score"
        value={value}
        onChange={handleChange}
      />,
    );

    expect(queryByLabelText('평점').value).toBe(value);
  });
});
