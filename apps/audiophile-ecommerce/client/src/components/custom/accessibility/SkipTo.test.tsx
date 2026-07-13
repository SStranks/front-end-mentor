import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from '@Components/App';

import SkipTo from './SkipTo';

const ROUTES = {
  checkout: '/checkout',
  earphones: '/earphones',
  headphones: '/headphones',
  home: '/',
  productDetail: '/speakers/1',
  speakers: '/speakers',
};

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(<SkipTo contentName="Dummy name" contentId="Dummy id" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<SkipTo contentName="Dummy name" contentId="Dummy id" />);

    const component = screen.getByRole('link');

    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent(/skip to dummy name/i);
    expect(component).toHaveAttribute('href', 'Dummy id');
  });
});

describe('Functionality', () => {
  // NOTE:  Test ID manually added to components on lazy loaded pages; require 'await' to ensure page is loaded.
  // NOTE:  State passed to route on ProductDetail page; using category 'speakers' and productId '1'.
  describe('Clicking component should focus on `main content` on all route pages', () => {
    test('Home Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.home}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Main Content/,
      });

      const mainContent = await screen.findByTestId('skipto-main');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Speakers Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.speakers}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Main Content/,
      });

      const mainContent = await screen.findByTestId('skipto-main');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Headphones Page', async () => {
      vi.useFakeTimers();

      render(
        <MemoryRouter initialEntries={[`${ROUTES.headphones}`]}>
          <App />
        </MemoryRouter>
      );

      await vi.advanceTimersByTimeAsync(3005);
      vi.useRealTimers();

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Main Content/,
      });

      const mainContent = await screen.findByTestId('skipto-main');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Earphones Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.earphones}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Main Content/,
      });

      const mainContent = await screen.findByTestId('skipto-main');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Product Details Page', async () => {
      render(
        <MemoryRouter
          initialEntries={[
            {
              pathname: `${ROUTES.productDetail}`,
              state: { productCategory: 'speakers', productId: '1' },
            },
          ]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Main Content/,
      });

      const mainContent = await screen.findByTestId('skipto-main');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Checkout Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.checkout}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Main Content/,
      });

      const mainContent = await screen.findByTestId('skipto-main');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });
  });

  describe('Clicking component should focus on `footer content` on all route pages', () => {
    test('Home Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.home}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Footer Content/,
      });

      const mainContent = await screen.findByTestId('skipto-footer');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Speakers Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.speakers}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Footer Content/,
      });

      const mainContent = await screen.findByTestId('skipto-footer');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Headphones Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.headphones}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Footer Content/,
      });

      const mainContent = await screen.findByTestId('skipto-footer');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Earphones Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.earphones}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Footer Content/,
      });

      const mainContent = await screen.findByTestId('skipto-footer');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Product Details Page', async () => {
      render(
        <MemoryRouter
          initialEntries={[
            {
              pathname: `${ROUTES.productDetail}`,
              state: { productCategory: 'speakers', productId: '1' },
            },
          ]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Footer Content/,
      });

      const mainContent = await screen.findByTestId('skipto-footer');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });

    test('Checkout Page', async () => {
      render(
        <MemoryRouter initialEntries={[`${ROUTES.checkout}`]}>
          <App />
        </MemoryRouter>
      );

      const skipToMainContentLink = screen.getByRole('link', {
        name: /Skip to Footer Content/,
      });

      const mainContent = await screen.findByTestId('skipto-footer');

      expect(skipToMainContentLink).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      await userEvent.click(skipToMainContentLink);
      expect(mainContent).toHaveFocus();
    });
  });
});
