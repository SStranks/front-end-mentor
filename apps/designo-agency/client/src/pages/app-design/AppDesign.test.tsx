import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AppDesign from './AppDesign';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <AppDesign />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<AppDesign />, { wrapper: BrowserRouter });

    const nav = screen.getByRole('navigation');
    const header = screen.getByRole('banner');
    const footer = screen.getByRole('contentinfo');
    const h1Text = screen.getByRole('heading', {
      level: 1,
      name: /app design/i,
    });
    const headerText = screen.getByText(/our mobile designs/i);
    const exampleGrid = screen.getByTestId('examplegrid');
    const viewGrid = screen.getByTestId('viewgrid');

    expect(nav).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).toContainElement(h1Text);
    expect(header).toContainElement(headerText);
    expect(footer).toBeInTheDocument();
    expect(exampleGrid).toBeInTheDocument();
    expect(screen.getAllByTestId('Card2')).toHaveLength(5);
    expect(viewGrid).toBeInTheDocument();
    expect(screen.getAllByTestId('Card1')).toHaveLength(2);
  });
});
