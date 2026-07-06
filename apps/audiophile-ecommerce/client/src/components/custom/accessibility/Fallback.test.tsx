import { render, screen } from '@testing-library/react';

import Fallback from './Fallback';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(<Fallback />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<Fallback />);

    const component = screen.getByTestId('fallback');

    expect(component).toHaveTextContent(/loading/i);
  });
});
