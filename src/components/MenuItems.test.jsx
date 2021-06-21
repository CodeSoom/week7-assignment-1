import { render } from '@testing-library/react';

import MenuItems from './MenuItems';

describe('MenuItems', () => {
  context('with menu items', () => {
    it('renders menu names ', () => {
      const menuItems = [
        { id: 1, name: '떡볶이' },
        { id: 2, name: '김밥' },
      ];
      const { container } = render(<MenuItems menuItems={menuItems} />);

      expect(container).toHaveTextContent('떡볶이');
      expect(container).toHaveTextContent('김밥');
    });
  });

  context('with 0 menu items', () => {
    it('renders no item message ', () => {
      const menuItems = [];
      const { container } = render(<MenuItems menuItems={menuItems} />);

      expect(container).toHaveTextContent('메뉴가 없어요');
    });
  });

  context('with undefined menu items', () => {
    it('renders no item message ', () => {
      const { container } = render(<MenuItems />);

      expect(container).toHaveTextContent('메뉴가 없어요');
    });
  });

  context('with undefined OR null OR 0 menu items', () => {
    // 값이 없을때 api에서 어떻게 처리하느냐에 따라 테스트해야 할 빈 값의 영역도 달라짐.
    it('renders no item message ', () => {
      [[], null, undefined].forEach((menuItems) => {
        const { container } = render(<MenuItems menuItems={menuItems} />);

        expect(container).toHaveTextContent('메뉴가 없어요');
      });
    });
  });
});
