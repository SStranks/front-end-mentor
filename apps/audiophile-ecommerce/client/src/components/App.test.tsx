import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import App from './App';

const ROUTES = {
  checkout: '/checkout',
  earphones: '/earphones',
  erroneous: '/erroneous',
  headphones: '/headphones',
  home: '/',
  productDetailEarphones: '/earphones/1',
  productDetailHeadphones: '/headphones/1',
  productDetailSpeakers: '/speakers/1',
  speakers: '/speakers',
};

vi.mock('#Pages/home/HomePage', () => ({
  default: () => <div data-testid="page-home" />,
}));

vi.mock('#Pages/headphones/HeadphonesPage', () => {
  return {
    default: () => {
      return <div data-testid="page-headphones" />;
    },
  };
});

vi.mock('#Pages/speakers/SpeakersPage', () => {
  return {
    default: () => {
      return <div data-testid="page-speakers" />;
    },
  };
});

vi.mock('#Pages/earphones/EarphonesPage', () => {
  return {
    default: () => {
      return <div data-testid="page-earphones" />;
    },
  };
});

vi.mock('#Pages/checkout/CheckoutPage', () => {
  return {
    default: () => {
      return <div data-testid="page-checkout" />;
    },
  };
});

vi.mock('#Pages/product-details/ProductDetailsPage', () => {
  return {
    default: () => {
      return <div data-testid="page-product-details" />;
    },
  };
});

describe('Static Routes', () => {
  test('non-designated routes should redirect and render home page', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    // NOTE:  Push after render to ensure redirect is enacted
    history.push(ROUTES.erroneous);

    const HomePage = await screen.findByTestId('page-home');

    expect(HomePage).toBeInTheDocument();
  });

  test('`/` should render home page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.home);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const HomePage = await screen.findByTestId('page-home');

    expect(HomePage).toBeInTheDocument();
  });

  test('`/headphones` should render headphones page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.headphones);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    // NOTE:  Timeout 4000ms: To account for dummy delay established in <App>
    // eslint-disable-next-line testing-library/prefer-find-by
    const HeadphonesPage = await waitFor(() => screen.getByTestId('page-headphones'), { timeout: 4000 });

    expect(HeadphonesPage).toBeInTheDocument();
  });

  test('`/speakers` should render speakers page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.speakers);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const SpeakersPage = await screen.findByTestId('page-speakers');

    expect(SpeakersPage).toBeInTheDocument();
  });

  test('`/earphones` should render earphones page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.earphones);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const EarphonesPage = await screen.findByTestId('page-earphones');

    expect(EarphonesPage).toBeInTheDocument();
  });

  test('`/checkout` should render checkout page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.checkout);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const CheckoutPage = await screen.findByTestId('page-checkout');

    expect(CheckoutPage).toBeInTheDocument();
  });
});

describe('Dynamic Routes', () => {
  test('`/speakers/:productId` should render product-details page', async () => {
    const history = createMemoryHistory();
    const state = { productCategory: 'speakers', productId: 1 };
    history.push(ROUTES.productDetailSpeakers, state);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const ProductDetailsPage = await screen.findByTestId('page-product-details');

    expect(ProductDetailsPage).toBeInTheDocument();
  });

  test('`/headphones/:productId` should render product-details page', async () => {
    const history = createMemoryHistory();
    const state = { productCategory: 'headphones', productId: 1 };
    history.push(ROUTES.productDetailHeadphones, state);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const ProductDetailsPage = await screen.findByTestId('page-product-details');

    expect(ProductDetailsPage).toBeInTheDocument();
  });

  test('`/earphones/:productId` should render product-details page', async () => {
    const history = createMemoryHistory();
    const state = { productCategory: 'earphones', productId: 1 };
    history.push(ROUTES.productDetailEarphones, state);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const ProductDetailsPage = await screen.findByTestId('page-product-details');

    expect(ProductDetailsPage).toBeInTheDocument();
  });
});
