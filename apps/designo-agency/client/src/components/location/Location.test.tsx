import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Location from './Location';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Location title="dummyTitle" illustration="imgURL" bgRotation="0deg" />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<Location title="dummyTitle" illustration="imgURL" bgRotation="90deg" />, {
      wrapper: BrowserRouter,
    });

    const img = screen.getByRole('img');
    const bgCircle = screen.getByTestId('background circle');
    const titleText = screen.getByText('dummyTitle');
    const btn = screen.getByRole('button', { name: 'see location' });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'imgURL');
    expect(bgCircle).toBeInTheDocument();
    expect(bgCircle).toHaveStyle('transform: rotate(90deg)');
    expect(titleText).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
});
