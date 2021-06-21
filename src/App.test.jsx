import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { loadItem } from './services/storage';
import App from './App';

jest.mock('react-redux');
jest.mock('./services/storage.js');

describe('App', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      regions: [{ id: 1, name: '서울' }],
      categories: [],
      restaurants: [],
    }));
  });

  function renderApp({ path }) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
  }
  context('with path /', () => {
    it('renders the home Page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('Home');
    });
  });

  context('with path /about', () => {
    it('renders the About Page', () => {
      const { container } = renderApp({ path: '/about' });

      expect(container).toHaveTextContent('About');
    });
  });

  context('with path /restaurants', () => {
    it('renders the Restaurants Page', () => {
      const { container } = renderApp({ path: '/restaurants' });

      expect(container).toHaveTextContent('서울');
    });
  });

  context('with invalid path', () => {
    it('renders the NotFound Page', () => {
      const { container } = renderApp({ path: '/notfound' });

      expect(container).toHaveTextContent('404');
    });
  });

  context('when logged in', () => {
    const accessToken = 'ACCESS_TOKEN';
    beforeEach(() => {
      loadItem.mockImplementation(() => accessToken);
    });

    it('call dispatch with "setAccessToken" action', () => {
      renderApp({ path: '/' });

      expect(dispatch).toBeCalled();
    });
  });
  context('when logged out', () => {
    beforeEach(() => {
      loadItem.mockImplementation(() => null);
    });

    it('dose not call dispatch with "setAccessToken" action', () => {
      renderApp({ path: '/' });

      expect(dispatch).not.toBeCalled();
    });
  });
});
