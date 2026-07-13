import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';

import HomePage from '@Pages/home/HomePage';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<HomePage />, { wrapper: BrowserRouter });

    // HERO SECTION
    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const heroImg = within(header).getByRole('img', {
      name: /^XX99 mark 2 headphones$/,
    });
    const H1Text = within(header).getByRole('heading', {
      level: 1,
      name: /^xx99 mark ii headphones$/i,
    });
    const heroLink = within(header).getByRole('link', {
      name: /^See product XX99 mark 2 headphones\.$/,
    });

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(heroImg).toBeInTheDocument();
    expect(H1Text).toBeInTheDocument();
    expect(heroLink).toBeInTheDocument();

    const grid = screen.getByTestId('grid');
    expect(grid).toBeInTheDocument();

    // --- ZX9 Grid Content ---
    const zx9Img = screen.getByRole('img', { name: /product zx9 speaker/i });
    const zx9Text = screen.getByText(/^zx9 speaker$/i);
    const zx9Link = screen.getByRole('link', { name: /^see product zx9 speaker$/i });
    expect(zx9Img).toBeInTheDocument();
    expect(zx9Text).toBeInTheDocument();
    expect(zx9Link).toBeInTheDocument();

    // --- ZX7 Grid Content ---
    const zx7Img = screen.getByRole('img', { name: /product zx7 speaker/i });
    const zx7Text = screen.getByText(/^zx7 speaker$/i);
    const zx7Link = screen.getByRole('link', { name: /^see product zx7 speaker$/i });
    expect(zx7Img).toBeInTheDocument();
    expect(zx7Text).toBeInTheDocument();
    expect(zx7Link).toBeInTheDocument();

    // --- YX1 Grid Content ---
    const yx1Img = screen.getByRole('img', { name: /product yx1 earphones/i });
    const yx1Text = screen.getByText(/^yx1 earphones$/i);
    const yx1Link = screen.getByRole('link', { name: /^see product yx1 earphones$/i });
    expect(yx1Img).toBeInTheDocument();
    expect(yx1Text).toBeInTheDocument();
    expect(yx1Link).toBeInTheDocument();
  });
});

describe('Functionality', () => {
  test('Navigation links direct/render correct page', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const spyPush = vi.spyOn(history, 'push');
    render(
      <Router location={history.location} navigator={history}>
        <HomePage />
      </Router>
    );

    const xx99ProductDetailLink = screen.getByRole('link', {
      name: /^See product XX99 mark 2 headphones\.$/,
    });
    const zx9ProductDetailLink = screen.getByRole('link', {
      name: /^See product ZX9 speaker$/,
    });
    const zx7ProductDetailLink = screen.getByRole('link', {
      name: /^See product ZX7 speaker$/,
    });
    const yx1ProductDetailLink = screen.getByRole('link', {
      name: /^See product YX1 earphones$/,
    });

    await userEvent.click(xx99ProductDetailLink);
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/headphones/4',
        search: '',
      },
      { productCategory: 'headphones', productId: 4 },
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: { productCategory: 'headphones', productId: 4 },
      }
    );
    await userEvent.click(zx9ProductDetailLink);
    expect(spyPush).toHaveBeenCalledTimes(2);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/speakers/6',
        search: '',
      },
      { productCategory: 'speakers', productId: 6 },
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: { productCategory: 'speakers', productId: 6 },
      }
    );
    await userEvent.click(zx7ProductDetailLink);
    expect(spyPush).toHaveBeenCalledTimes(3);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/speakers/5',
        search: '',
      },
      { productCategory: 'speakers', productId: 5 },
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: { productCategory: 'speakers', productId: 5 },
      }
    );
    await userEvent.click(yx1ProductDetailLink);
    expect(spyPush).toHaveBeenCalledTimes(4);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/earphones/1',
        search: '',
      },
      { productCategory: 'earphones', productId: 1 },
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: { productCategory: 'earphones', productId: 1 },
      }
    );
  });
});
