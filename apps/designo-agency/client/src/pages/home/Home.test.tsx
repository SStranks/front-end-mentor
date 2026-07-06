import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<Home />, { wrapper: BrowserRouter });

    const nav = screen.getByRole('navigation');
    const footer = screen.getByRole('contentinfo');
    const bgTopImg = screen.getByTestId('bgImgTop');
    const bgBottomImg = screen.getByTestId('bgImgBottom');
    const imgs = screen.getAllByRole('img');

    const heroSection = screen.getByRole('region', { name: 'hero section' });
    const h1Text = screen.getByRole('heading', { level: 1 });
    const heroBtn = screen.getByRole('button', { name: /^learn more$/i });

    const viewGrid = screen.getByTestId('viewgrid');
    const qualitiesGrid = screen.getByTestId('qualities');

    expect(nav).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(bgTopImg).toBeInTheDocument();
    expect(bgTopImg).toBeVisible();
    expect(bgBottomImg).toBeInTheDocument();
    expect(bgBottomImg).toBeVisible();
    imgs.forEach((img) => expect(img).toBeVisible());

    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toContainElement(h1Text);
    expect(heroSection).toContainElement(heroBtn);

    expect(viewGrid).toBeInTheDocument();
    expect(screen.getAllByTestId('Card1')).toHaveLength(3);
    expect(within(viewGrid).getAllByRole('img')).toHaveLength(3);

    expect(qualitiesGrid).toBeInTheDocument();
    expect(within(qualitiesGrid).getAllByRole('img')).toHaveLength(3);
    expect(within(qualitiesGrid).getByText(/^passionate$/)).toBeInTheDocument();
    expect(within(qualitiesGrid).getByText(/^resourceful$/)).toBeInTheDocument();
    expect(within(qualitiesGrid).getByText(/^friendly$/)).toBeInTheDocument();
  });
});
