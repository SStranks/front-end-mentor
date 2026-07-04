import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Locations from './Locations';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Locations />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<Locations />, { wrapper: BrowserRouter });

    const nav = screen.getByRole('navigation');
    const footer = screen.getByRole('contentinfo');
    const grid = screen.getByTestId('grid');

    expect(nav).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(grid).toBeInTheDocument();
    expect(within(grid).getAllByRole('img')).toHaveLength(3);
  });
});
