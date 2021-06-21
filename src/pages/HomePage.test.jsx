import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders categories', () => {
    useSelector.mockImplementation((selector) => selector({
      regions: [],
      categories: [],
      restaurants: [],
    }));
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  });
});

/** test 에서는 browerRouter대신 MemoryRouter를 사용한다.
*   <BrowserRouter>
        <HomePage />
    </BrowserRouter>,
*/
