import { fireEvent, render } from '@testing-library/react';

import ReviewForm from './ReviewForm';

describe('ReviewForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  function renderReviewForm({ score, description } = {}) {
    return render(
      <ReviewForm
        fields={{ score, description }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />,
    );
  }

  it('renders review write fields ', () => {
    const { queryByLabelText } = renderReviewForm();

    expect(queryByLabelText('평점')).not.toBeNull();
    expect(queryByLabelText('리뷰내용')).not.toBeNull();
  });

  it('renders value of fields ', () => {
    const { queryByLabelText } = renderReviewForm({
      score: '5',
      description: '정말 최고',
    });

    expect(queryByLabelText('평점').value).toBe('5');
    expect(queryByLabelText('리뷰내용').value).toBe('정말 최고');
  });

  it('listens description change events', () => {
    const { getByLabelText } = renderReviewForm();

    const controls = [
      { label: '평점', name: 'score', value: '5' },
      { label: '리뷰내용', name: 'description', value: '정말 최고' },
    ];

    controls.forEach(({ label, name, value }) => {
      fireEvent.change(getByLabelText(label), { target: { value } });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('renders "Send" button', () => {
    const { getByText } = renderReviewForm({
      score: '5',
      description: '정말 최고',
    });

    fireEvent.click(getByText('리뷰 남기기'));
    expect(handleSubmit).toBeCalled();
  });
});
