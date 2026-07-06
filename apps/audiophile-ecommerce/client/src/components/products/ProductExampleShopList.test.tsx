import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProductExampleShopList from './ProductExampleShopList';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <ProductExampleShopList />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<ProductExampleShopList />, {
      wrapper: BrowserRouter,
    });

    const component = screen.getByTestId('product_example_shop_list');
    const productLinks = screen.getAllByRole('link');

    expect(component).toBeInTheDocument();
    expect(productLinks).toHaveLength(3);
  });

  test('Appended classes should be added to component', () => {
    render(<ProductExampleShopList appendClass="additionalStyles" />, { wrapper: BrowserRouter });

    const component = screen.getByTestId('product_example_shop_list');

    expect(component).toHaveClass('additionalStyles');
  });
});
