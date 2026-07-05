import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import CategoryLayout from './CategoryLayout';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <CategoryLayout
          productCategory="dummyProductCategory"
          productList={[
            {
              id: 1,
              categoryImage: {
                desktop: 'desktopImgURL',
                mobile: 'mobileImgURL',
                tablet: 'tabletImgURL',
              },
              description: 'dummyDescription',
              new: true,
              productName: 'dummyProductName',
            },
          ]}
        />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(
      <CategoryLayout
        productCategory="dummyProductCategory"
        productList={[
          {
            id: 1,
            categoryImage: {
              desktop: 'desktopImgURL',
              mobile: 'mobileImgURL',
              tablet: 'tabletImgURL',
            },
            description: 'dummyDescription',
            new: true,
            productName: 'dummyProductName',
          },
        ]}
      />,
      { wrapper: BrowserRouter }
    );

    const component = screen.getByRole('region');
    const headingH1 = screen.getByRole('heading', {
      level: 1,
      name: 'dummyProductCategory',
    });
    const productArticle = screen.getByLabelText('dummyProductName');

    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('aria-labelledby', 'dummyProductCategory');
    expect(headingH1).toBeInTheDocument();
    expect(productArticle).toBeInTheDocument();
  });
});
