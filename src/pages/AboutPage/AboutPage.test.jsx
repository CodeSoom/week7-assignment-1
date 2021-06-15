import { render } from '@testing-library/react';

import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders title', () => {
    const { container } = render(<AboutPage />);

    expect(container).toHaveTextContent('About 페이지');
  });
});
