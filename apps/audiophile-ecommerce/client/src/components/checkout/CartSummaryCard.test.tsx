import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import { vi } from 'vitest';

import { ShoppingCartProvider } from '@Context/ShoppingCartContext';

import CartSummaryCard from './CartSummaryCard';

type CartItem = {
  id: number;
  quantity: number;
};

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

beforeEach(() => {
  mockedUsedNavigate.mockReset();
});

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const mockFn = vi.fn();
    const { asFragment } = render(
      <BrowserRouter>
        <ShoppingCartProvider>
          <CartSummaryCard closeCartModal={mockFn} />
        </ShoppingCartProvider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    const mockFn = vi.fn();
    render(
      <ShoppingCartProvider>
        <CartSummaryCard closeCartModal={mockFn} />
      </ShoppingCartProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const cartItemsQuantity = screen.getByText(/^cart \(\d\)$/);
    const removeAllBtn = screen.getByRole('button', {
      name: 'remove all products from cart',
    });
    const cartItemsTotal = screen.getByText(/^\$ \d+\.\d{2}$/);
    const checkoutBtn = screen.getByRole('button', { name: 'checkout' });

    expect(cartItemsQuantity).toBeInTheDocument();
    expect(removeAllBtn).toBeInTheDocument();
    expect(cartItemsTotal).toBeInTheDocument();
    expect(checkoutBtn).toBeInTheDocument();
  });

  test('If already on checkout route do not render goto checkout button', () => {
    const mockFn = vi.fn();
    const history = createMemoryHistory({ initialEntries: ['/checkout'] });
    history.push = vi.fn();

    render(
      <Router location={history.location} navigator={history}>
        <ShoppingCartProvider>
          <CartSummaryCard closeCartModal={mockFn} />
        </ShoppingCartProvider>
      </Router>
    );

    expect(screen.queryByRole('button', { name: 'checkout' })).not.toBeInTheDocument();
  });
});

describe('Functionality', () => {
  test('If cart is empty checkout button should be disabled', () => {
    // NOTE:  By default cart is empty as test is not accessing local storage in cart context.
    const mockFn = vi.fn();
    render(
      <ShoppingCartProvider>
        <CartSummaryCard closeCartModal={mockFn} />
      </ShoppingCartProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const checkoutBtn = screen.getByRole('button', { name: 'checkout' });

    expect(checkoutBtn).toBeDisabled();
  });

  test('Clicking checkout button navigates to checkout route and closes modal', async () => {
    const mockFn = vi.fn();
    localStorage.setItem('shopping-cart', JSON.stringify([{ id: 1, quantity: 1 }]));

    render(
      <ShoppingCartProvider>
        <CartSummaryCard closeCartModal={mockFn} />
      </ShoppingCartProvider>,
      { wrapper: BrowserRouter }
    );

    const checkoutBtn = screen.getByRole('button', { name: 'checkout' });

    await userEvent.click(checkoutBtn);
    expect(mockFn).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/checkout');
  });

  test('Remove all button empties the context cart - should be empty array', async () => {
    const mockFn = vi.fn();
    localStorage.setItem('shopping-cart', JSON.stringify([{ id: 1, quantity: 3 }]));
    render(
      <ShoppingCartProvider>
        <CartSummaryCard closeCartModal={mockFn} />
      </ShoppingCartProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const removeAllBtn = screen.getByRole('button', {
      name: 'remove all products from cart',
    });
    const getCartItems = () => JSON.parse(localStorage.getItem('shopping-cart') ?? '[]') as CartItem[];

    expect(getCartItems()).toEqual([{ id: 1, quantity: 3 }]);

    await userEvent.click(removeAllBtn);

    expect(getCartItems()).toEqual([]);
  });
});
