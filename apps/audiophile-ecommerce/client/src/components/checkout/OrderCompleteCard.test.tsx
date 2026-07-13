import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ShoppingCartProvider } from '@Context/ShoppingCartContext';

import OrderCompleteCard from './OrderCompleteCard';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const mockFn = vi.fn();
    const { asFragment } = render(
      <ShoppingCartProvider>
        <OrderCompleteCard modalClose={mockFn} />
      </ShoppingCartProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    const mockFn = vi.fn();
    localStorage.setItem('shopping-cart', JSON.stringify([{ id: 1, quantity: 1 }]));

    render(
      <ShoppingCartProvider>
        <OrderCompleteCard modalClose={mockFn} />
      </ShoppingCartProvider>
    );

    const component = screen.getByLabelText('thank you for your order');
    const iconCheck = screen.getByRole('img', { name: /checked/i });
    const textH3 = screen.getByRole('heading', {
      level: 3,
      name: 'thank you for your order',
    });
    const textInfo = screen.getByText('You will receive an email conformation shortly');
    const textGrandTotal = screen.getByText('grand total');
    const textTotalAmount = screen.getByText(/^\$(0|[1-9]\d{0,2})(,\d{3})*(\.\d{1,2})?$/);
    const backToHomeBtn = screen.getByRole('button', { name: 'back to home' });
    const hrSeparator = screen.queryByRole('separator');
    const btns = screen.queryAllByRole('button');

    expect(component).toBeInTheDocument();
    expect(iconCheck).toBeInTheDocument();
    expect(textH3).toBeInTheDocument();
    expect(textInfo).toBeInTheDocument();
    expect(textGrandTotal).toBeInTheDocument();
    expect(textTotalAmount).toBeInTheDocument();
    expect(backToHomeBtn).toBeInTheDocument();
    expect(hrSeparator).not.toBeInTheDocument();
    expect(btns).toHaveLength(1);
  });

  test('When cart has more than one type of item, hr and `view more` button should be visible', () => {
    const mockFn = vi.fn();
    localStorage.setItem(
      'shopping-cart',
      JSON.stringify([
        { id: 1, quantity: 3 },
        { id: 2, quantity: 3 },
      ])
    );

    render(
      <ShoppingCartProvider>
        <OrderCompleteCard modalClose={mockFn} />
      </ShoppingCartProvider>
    );

    const hrSeparator = screen.getByRole('separator');
    const btns = screen.getAllByRole('button');

    expect(hrSeparator).toBeInTheDocument();
    expect(btns).toHaveLength(2);
  });
});

describe('Functionality', () => {
  test('Clicking `back to home` button fires closes modal', async () => {
    const mockFn = vi.fn();

    render(
      <ShoppingCartProvider>
        <OrderCompleteCard modalClose={mockFn} />
      </ShoppingCartProvider>
    );

    const backBtn = screen.getByRole('button', { name: 'back to home' });

    await userEvent.click(backBtn);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
