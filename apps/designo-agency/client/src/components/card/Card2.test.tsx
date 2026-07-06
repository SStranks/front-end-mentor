import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Card2 from './Card2';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Card2 title="dummyTitle" caption="dummyCaption" image="imgURL" />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<Card2 title="dummyTitle" caption="dummyCaption" image="imgURL" />, {
      wrapper: BrowserRouter,
    });

    const img = screen.getByRole('img');
    const headerText = screen.getByRole('heading', { level: 3 });
    const captionText = screen.getByText('dummyCaption');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'imgURL');
    expect(headerText).toHaveTextContent('dummyTitle');
    expect(captionText).toBeInTheDocument();
  });
});
