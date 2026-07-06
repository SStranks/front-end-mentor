import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';

import ProductExampleSeeCard from './ProductExampleSeeCard';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <ProductExampleSeeCard
          productImages={{
            desktop: '',
            mobile: '',
            tablet: '',
          }}
          productTitle="dummyProductTitle"
          productCategory=""
          productId={0}
        />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(
      <ProductExampleSeeCard
        productImages={{
          desktop: '',
          mobile: '',
          tablet: '',
        }}
        productTitle="dummyProductTitle"
        productCategory=""
        productId={0}
      />,
      { wrapper: BrowserRouter }
    );

    const component = screen.getByLabelText(/^see product dummyProductTitle$/);
    const productImg = screen.getByRole('img', {
      name: /^dummyProductTitle$/,
    });
    const h5Text = screen.getByRole('heading', {
      level: 5,
      name: /^dummyProductTitle$/,
    });
    const link = screen.getByRole('link', { name: /^see product$/ });

    expect(component).toBeInTheDocument();
    expect(productImg).toBeInTheDocument();
    expect(h5Text).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});

describe('Functionality', () => {
  test('Link should navigate to `/productCategory/productId` page', async () => {
    const history = createMemoryHistory({ initialEntries: ['/dummyRoute'] });
    const spyPush = vi.spyOn(history, 'push');
    render(
      <Router location={history.location} navigator={history}>
        <ProductExampleSeeCard
          productImages={{
            desktop: '',
            mobile: '',
            tablet: '',
          }}
          productTitle="dummyProductTitle"
          productCategory="dummyCategory"
          productId={1}
        />
      </Router>
    );

    const link = screen.getByRole('link', { name: /^see product$/ });
    await userEvent.click(link);

    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/dummyCategory/1',
        search: '',
      },
      { productCategory: 'dummyCategory', productId: 1 },
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: { productCategory: 'dummyCategory', productId: 1 },
      }
    );
  });
});
