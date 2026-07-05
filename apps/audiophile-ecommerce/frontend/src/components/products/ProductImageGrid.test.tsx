import { render, screen } from '@testing-library/react';

import ProductImageGrid from './ProductImageGrid';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <ProductImageGrid
        productImagesGallery={{
          dummyProduct: {
            desktop: 'desktopImg',
            mobile: 'mobileImg',
            tablet: 'tabletImg',
          },
        }}
        productTitle="dummyProductTitle"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(
      <ProductImageGrid
        productImagesGallery={{
          dummyProduct: {
            desktop: 'desktopImg',
            mobile: 'mobileImg',
            tablet: 'tabletImg',
          },
        }}
        productTitle="dummyProductTitle"
      />
    );

    const component = screen.getByTestId('product_image_grid');
    const productImg = screen.getByRole('img', {
      name: 'dummyProductTitle being used',
    });

    expect(component).toBeInTheDocument();
    expect(productImg).toBeInTheDocument();
  });

  test('Appended classes should be added to component', () => {
    render(
      <ProductImageGrid
        appendClass="additionalStyles"
        productImagesGallery={{
          dummyProduct: {
            desktop: 'desktopImg',
            mobile: 'mobileImg',
            tablet: 'tabletImg',
          },
        }}
        productTitle="dummyProductTitle"
      />
    );

    const component = screen.getByTestId('product_image_grid');

    expect(component).toHaveClass('additionalStyles');
  });
});
