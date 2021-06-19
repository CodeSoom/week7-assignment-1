import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import TextField from './TextField';

describe('TextField', () => {
  context('without type', () => {
    const label = '리뷰 설명';

    function renderTextField() {
      const handleChange = jest.fn();

      return render((
        <TextField
          label={label}
          name="description"
          onChange={handleChange}
        />
      ));
    }

    it('renders label and input control', () => {
      const { queryByLabelText } = renderTextField();

      expect(queryByLabelText(label)).not.toBeNull();
    });

    it('renders "text" input control', () => {
      const { getByLabelText } = renderTextField();

      expect(getByLabelText(label)).toHaveAttribute('type', 'text');
    });
  });

  context('with type', () => {
    const label = '평점';

    function renderTextField() {
      const handleChange = jest.fn();

      return render((
        <TextField
          label={label}
          type="number"
          name="score"
          onChange={handleChange}
        />
      ));
    }

    it('renders label and input control', () => {
      const { queryByLabelText } = renderTextField();

      expect(queryByLabelText(label)).not.toBeNull();
    });

    it('renders "number" input control', () => {
      const { getByLabelText } = renderTextField();

      expect(getByLabelText(label)).toHaveAttribute('type', 'number');
    });
  });

  it('listens change events', () => {
    const name = 'score';
    const value = '5';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <TextField
        label="평점"
        name={name}
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByLabelText('평점'), { target: { value } });

    expect(handleChange).toBeCalledWith({ name, value });
  });
});
