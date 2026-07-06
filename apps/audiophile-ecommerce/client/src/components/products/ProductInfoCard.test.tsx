import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';

import ProductInfoCard from './ProductInfoCard';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <ProductInfoCard
          productImgs={{
            desktop: 'desktopImgURL',
            mobile: 'mobileImgURL',
            tablet: 'tabletImgURL',
          }}
          productTitle="dummyProductTitle"
          productDetails="dummyProductDetails"
          newProduct
          productCategory="dummyProductCategory"
          productId={1}
        />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(
      <ProductInfoCard
        productImgs={{
          desktop: 'desktopImgURL',
          mobile: 'mobileImgURL',
          tablet: 'tabletImgURL',
        }}
        productTitle="dummyProductTitle"
        productDetails="dummyProductDetails"
        newProduct
        productCategory="dummyProductCategory"
        productId={1}
      />,
      { wrapper: BrowserRouter }
    );

    const component = screen.getByRole('article');
    const productImg = screen.getByRole('img');
    const newProduct = screen.getByText(/^new product$/);
    const productTitle = screen.getByRole('heading', {
      level: 2,
      name: 'dummyProductTitle',
    });
    const productDetails = screen.getByText('dummyProductDetails');
    const productLink = screen.getByRole('link', {
      name: 'See product dummyProductTitle',
    });

    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('aria-labelledby', 'dummyProductTitle');
    expect(productImg).toBeInTheDocument();
    expect(productImg).toHaveAttribute('alt', 'dummyProductTitle');
    expect(newProduct).toBeInTheDocument();
    expect(productTitle).toBeInTheDocument();
    expect(productDetails).toBeInTheDocument();
    expect(productLink).toBeInTheDocument();
  });

  test('If product is not new, do not render `new product` text', () => {
    render(
      <ProductInfoCard
        productImgs={{
          desktop: 'desktopImgURL',
          mobile: 'mobileImgURL',
          tablet: 'tabletImgURL',
        }}
        productTitle="dummyProductTitle"
        productDetails="dummyProductDetails"
        newProduct={false}
        productCategory="dummyProductCategory"
        productId={1}
      />,
      { wrapper: BrowserRouter }
    );

    const newProduct = screen.queryByText(/^new product$/);

    expect(newProduct).not.toBeInTheDocument();
  });
});

describe('Functionality', () => {
  test('Link navigates to `productCategory/productId`', async () => {
    const history = createMemoryHistory({ initialEntries: ['/dummyRoute'] });
    const spyPush = vi.spyOn(history, 'push');
    render(
      <Router location={history.location} navigator={history}>
        <ProductInfoCard
          productImgs={{
            desktop: 'desktopImgURL',
            mobile: 'mobileImgURL',
            tablet: 'tabletImgURL',
          }}
          productTitle="dummyProductTitle"
          productDetails="dummyProductDetails"
          newProduct={false}
          productCategory="dummyProductCategory"
          productId={1}
        />
      </Router>
    );

    const productLink = screen.getByRole('link', {
      name: 'See product dummyProductTitle',
    });

    await userEvent.click(productLink);
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/dummyProductCategory/1',
        search: '',
      },
      { productCategory: 'dummyProductCategory', productId: 1 },
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: { productCategory: 'dummyProductCategory', productId: 1 },
      }
    );
  });
});
