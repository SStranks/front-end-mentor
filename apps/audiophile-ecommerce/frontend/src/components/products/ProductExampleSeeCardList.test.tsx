import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProductExampleSeeCardList from './ProductExampleSeeCardList';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <ProductExampleSeeCardList currentProductId={1} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<ProductExampleSeeCardList currentProductId={1} />, { wrapper: BrowserRouter });

    const component = screen.getByTestId('product_example_see_card_list');
    const productExampleCard = screen.getAllByLabelText(/^see product/);

    expect(component).toBeInTheDocument();
    expect(productExampleCard.length).toBeGreaterThanOrEqual(1);
  });

  test('If productId is invalid render no product example cards', () => {
    render(<ProductExampleSeeCardList currentProductId={-1} />, { wrapper: BrowserRouter });

    const component = screen.getByTestId('product_example_see_card_list');
    const productExampleCard = screen.queryAllByLabelText(/^see product/);

    expect(component).toBeInTheDocument();
    expect(productExampleCard.length).toEqual(0);
  });

  test('Appended classes should be added to component', () => {
    render(<ProductExampleSeeCardList appendClass="additionalStyles" currentProductId={0} />);

    const component = screen.getByTestId('product_example_see_card_list');

    expect(component).toHaveClass('additionalStyles');
  });
});
