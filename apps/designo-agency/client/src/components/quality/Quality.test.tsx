import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Quality from './Quality';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Quality title="dummyTitle" caption="dummyCaption" illustration="imgURL" bgRotation="0deg" />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<Quality title="dummyTitle" caption="dummyCaption" illustration="imgURL" bgRotation="90deg" />, {
      wrapper: BrowserRouter,
    });

    const img = screen.getByRole('img');
    const bgCircle = screen.getByTestId('background circle');
    const titleText = screen.getByText('dummyTitle');
    const captionText = screen.getByTestId('caption');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'imgURL');
    expect(bgCircle).toBeInTheDocument();
    expect(bgCircle).toHaveStyle('transform: rotate(90deg)');
    expect(titleText).toBeInTheDocument();
    expect(captionText).toBeInTheDocument();
  });

  test('If caption prop is empty, <p> should not render', () => {
    render(<Quality title="dummyTitle" caption="" illustration="imgURL" bgRotation="90deg" />, {
      wrapper: BrowserRouter,
    });

    const captionText = screen.queryByTestId('caption');

    expect(captionText).not.toBeInTheDocument();
  });
});
