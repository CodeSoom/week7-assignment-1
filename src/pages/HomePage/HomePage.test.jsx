import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import HomePage from './HomePage';

describe('HomePage', () => {
  const links = ['About', 'Restaurants'];

  const renderHomePage = () => render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  it('renders title', () => {
    const { container } = renderHomePage();

    expect(container).toHaveTextContent('Home');
  });

  it('renders links', () => {
    const { container } = renderHomePage();

    links.forEach((link) => {
      expect(container).toHaveTextContent(link);
    });
  });
});
