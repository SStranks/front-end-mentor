import type { Mock } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ShoppingCartProvider } from '@Context/ShoppingCartContext';

import MenuCategoryModal from './MenuCategoryModal';

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
          <MenuCategoryModal modalOpen setModal={mockSetModalFn} modalButtonRef={null} />
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
        <MenuCategoryModal modalOpen setModal={mockSetModalFn} modalButtonRef={null} />
      </ShoppingCartProvider>,
      { container: $root, wrapper: BrowserRouter }
    );

    const componentPortal = container;
    const modalContainer = screen.getByTestId('container');
    const modalText = screen.getAllByLabelText(/^see all \w+ shop$/i);

    expect(componentPortal).toBeInTheDocument();
    expect(modalContainer).toBeInTheDocument();
    expect(modalText).toHaveLength(3);
  });
});

describe('Functionality', () => {
  test('Clicking outside modal contents/Pressing `Esc`, fires close modal call', async () => {
    const mockSetModalFn = vi.fn();
    render(
      <ShoppingCartProvider>
        <MenuCategoryModal modalOpen setModal={mockSetModalFn} modalButtonRef={null} />
      </ShoppingCartProvider>,
      { container: $root, wrapper: BrowserRouter }
    );

    const modalContainer = screen.getByTestId('container');

    await userEvent.click(modalContainer);
    await userEvent.keyboard('{Escape}');
    expect(mockSetModalFn).toHaveBeenCalledTimes(2);
    expect(mockSetModalFn).toHaveBeenCalledWith(false);
  });
});
