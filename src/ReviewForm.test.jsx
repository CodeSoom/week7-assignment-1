import { fireEvent, render } from '@testing-library/react';

import ReviewForm from './ReviewForm';

describe('ReviewForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  function renderReviewForm({ score, description } = {}) {
    return render((
      <ReviewForm
        score={score}
        description={description}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    ));
  }

  it('renders input controllers and submit button', () => {
    const score = '5';
    const description = '음청 마싯써요 :D';

    const { getByLabelText, getByRole } = renderReviewForm({ score, description });

    const controls = [
      { label: '평점', value: score },
      { label: '리뷰 내용', value: description },
    ];

    controls.forEach(({ label, value }) => {
      expect(getByLabelText(label).value).toBe(value);
    });

    expect(getByRole('button', { name: '리뷰 남기기' })).toBeInTheDocument();
  });

  it('listens click event', () => {
    const { getByRole } = renderReviewForm();

    fireEvent.click(getByRole('button', { name: '리뷰 남기기' }));

    expect(handleSubmit).toBeCalled();
  });
});
