import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import DefaultLayout from './DefaultLayout';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <DefaultLayout />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<DefaultLayout />, { wrapper: BrowserRouter });

    const primaryNav = screen.getByLabelText('primary');
    const footer = screen.getByTestId('skipto-footer');

    expect(primaryNav).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
