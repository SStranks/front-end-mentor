import type { Mock } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ShoppingCartProvider } from '#Context/ShoppingCartContext';

import OrderCompleteModal from './OrderCompleteModal';

let $root: HTMLDivElement;

beforeEach(() => {
  $root = document.createElement('div');
  $root.id = 'modal';
  document.body.append($root);
});

afterEach(() => {
  $root.remove();
});

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    ReactDOM.createPortal = vi.fn((element) => {
      return element as React.ReactPortal;
    });

    const mockSetModalFn = vi.fn();
    const { asFragment } = render(
      <BrowserRouter>
        <ShoppingCartProvider>
          <OrderCompleteModal modalOpen modalClose={mockSetModalFn} />
        </ShoppingCartProvider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();

    (ReactDOM.createPortal as Mock).mockClear();
  });

  test('Component base should be fully rendered', () => {
    const mockSetModalFn = vi.fn();
    const { container } = render(
      <ShoppingCartProvider>
        <OrderCompleteModal modalOpen modalClose={mockSetModalFn} />
      </ShoppingCartProvider>,
      { container: $root, wrapper: BrowserRouter }
    );

    const componentPortal = container;
    const modalText = screen.getByText('thank you for your order');

    expect(componentPortal).toBeInTheDocument();
    expect(modalText).toBeInTheDocument();
  });
});

describe('Functionality', () => {
  test('Clicking `back to home` button fires close modal call', async () => {
    const mockSetModalFn = vi.fn();
    render(
      <ShoppingCartProvider>
        <OrderCompleteModal modalOpen modalClose={mockSetModalFn} />
      </ShoppingCartProvider>,
      { container: $root, wrapper: BrowserRouter }
    );

    const backBtn = screen.getByRole('button', { name: 'back to home' });

    await userEvent.click(backBtn);
    expect(mockSetModalFn).toHaveBeenCalledTimes(1);
    expect(mockSetModalFn).toHaveBeenCalledWith(true);
  });
});
