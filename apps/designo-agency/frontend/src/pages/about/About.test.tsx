import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import About from './About';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<About />, { wrapper: BrowserRouter });

    const nav = screen.getByRole('navigation');
    const header = screen.getByRole('banner');
    const section1 = screen.getByRole('region', {
      name: /world-class talent/i,
    });
    const section2 = screen.getByRole('region', { name: /the real deal/i });

    const footer = screen.getByRole('contentinfo');
    const h1Text = screen.getByRole('heading', {
      level: 1,
      name: /about us/i,
    });
    const headerText = screen.getByText(/founded in 2010/i);

    const locations = screen.getByTestId('locations');

    expect(nav).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).toContainElement(h1Text);
    expect(header).toContainElement(headerText);
    expect(within(header).getByRole('img')).toBeInTheDocument();

    expect(section1).toBeInTheDocument();
    expect(
      within(section1).getByRole('heading', {
        level: 2,
        name: /world-class talent/i,
      })
    ).toBeInTheDocument();
    expect(within(section1).getByRole('img')).toBeInTheDocument();
    expect(section2).toBeInTheDocument();
    expect(
      within(section2).getByRole('heading', {
        level: 2,
        name: /the real deal/i,
      })
    ).toBeInTheDocument();
    expect(within(section2).getByRole('img')).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(locations).toBeInTheDocument();
    expect(screen.getAllByTestId('location')).toHaveLength(3);
  });
});
