import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProductDetailCard from './ProductDetailCard';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <ProductDetailCard
          appendClass="additionalStyles"
          productId={0}
          newProduct
          productImages={{
            desktop: '',
            mobile: '',
            tablet: '',
          }}
          productTitle="dummyProductTitle"
          productDescription="dummyProductDescription"
          productPrice={99.01}
          productFeatures="dummyProductFeatures"
          productItems={[{ item: 'dummyItem', quantity: 1 }]}
        />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(
      <ProductDetailCard
        appendClass="additionalStyles"
        productId={0}
        newProduct
        productImages={{
          desktop: '',
          mobile: '',
          tablet: '',
        }}
        productTitle="dummyProductTitle"
        productDescription="dummyProductDescription"
        productPrice={99.01}
        productFeatures="dummyProductFeatures"
        productItems={[{ item: 'dummyItem', quantity: 1 }]}
      />,
      {
        wrapper: BrowserRouter,
      }
    );

    const productImg = screen.getByRole('img', { name: 'dummyProductTitle' });
    const newProductText = screen.getByText(/^new product$/);
    const productTitleH2 = screen.getByRole('heading', {
      level: 2,
      name: /^dummyProductTitle$/,
    });
    const productDescription = screen.getByText(/^dummyProductDescription$/);
    const productPrice = screen.getByText(/^\$ 99\.01$/);
    const addToCartBtn = screen.getByRole('button', { name: 'add to cart' });
    const productFeaturesH3 = screen.getByRole('heading', {
      level: 3,
      name: 'features',
    });
    const productFeatures = screen.getByText('dummyProductFeatures');
    const inTheBoxH3 = screen.getByRole('heading', {
      level: 3,
      name: 'in the box',
    });
    const productInTheBoxUL = screen.getByRole('list');
    // const { getAllByRole } = within(productInTheBoxUL);
    // const listItems = getAllByRole('listitem');
    const listItems = within(productInTheBoxUL).getAllByRole('listitem');

    expect(productImg).toBeInTheDocument();
    expect(newProductText).toBeInTheDocument();
    expect(productTitleH2).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(addToCartBtn).toBeInTheDocument();
    expect(productFeaturesH3).toBeInTheDocument();
    expect(productFeatures).toBeInTheDocument();
    expect(inTheBoxH3).toBeInTheDocument();
    expect(productInTheBoxUL).toBeInTheDocument();
    expect(listItems.length).toBe(1);
    expect(listItems[0]).toHaveTextContent(/^1x dummyItem$/);
  });

  test('If product is not new, do not render `new product` text', () => {
    render(
      <ProductDetailCard
        appendClass="additionalStyles"
        productId={0}
        newProduct={false}
        productImages={{
          desktop: '',
          mobile: '',
          tablet: '',
        }}
        productTitle="dummyProductTitle"
        productDescription=""
        productPrice={0}
        productFeatures=""
        productItems={[]}
      />,
      {
        wrapper: BrowserRouter,
      }
    );

    const newProductText = screen.queryByText(/^new product$/);

    expect(newProductText).not.toBeInTheDocument();
  });

  test('Appended classes should be added to component', () => {
    render(
      <ProductDetailCard
        appendClass="additionalStyles"
        productId={0}
        newProduct={false}
        productImages={{
          desktop: '',
          mobile: '',
          tablet: '',
        }}
        productTitle=""
        productDescription=""
        productPrice={0}
        productFeatures=""
        productItems={[]}
      />,
      {
        wrapper: BrowserRouter,
      }
    );

    const component = screen.getByTestId('container');

    expect(component).toHaveClass('additionalStyles');
  });
});
