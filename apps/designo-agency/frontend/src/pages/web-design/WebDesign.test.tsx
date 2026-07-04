import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import WebDesign from './WebDesign';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <WebDesign />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<WebDesign />, { wrapper: BrowserRouter });

    const nav = screen.getByRole('navigation');
    const header = screen.getByRole('banner');
    const footer = screen.getByRole('contentinfo');
    const h1Text = screen.getByRole('heading', {
      level: 1,
      name: /web design/i,
    });
    const headerText = screen.getByText(/we build websites that/i);
    const exampleGrid = screen.getByTestId('examplegrid');
    const viewGrid = screen.getByTestId('viewgrid');

    expect(nav).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).toContainElement(h1Text);
    expect(header).toContainElement(headerText);
    expect(footer).toBeInTheDocument();
    expect(exampleGrid).toBeInTheDocument();
    expect(screen.getAllByTestId('Card2')).toHaveLength(6);
    expect(viewGrid).toBeInTheDocument();
    expect(screen.getAllByTestId('Card1')).toHaveLength(2);
  });
});
