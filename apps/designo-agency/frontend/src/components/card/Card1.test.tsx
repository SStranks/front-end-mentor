import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';

import Card1 from './Card1';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Card1 title="dummyTitle" image="imgURL" url="dummyURL" />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<Card1 title="dummyTitle" image="imgURL" url="dummyURL" />, {
      wrapper: BrowserRouter,
    });

    const component = screen.getByRole('link');
    const bgImg = screen.getByTestId('Card1');
    const headerText = screen.getByRole('heading', { level: 2 });
    const iconImg = screen.getByRole('img');
    const bodyText = screen.getByText(/view projects/i);

    expect(component).toBeInTheDocument();
    expect(bgImg).toBeInTheDocument();
    expect(bgImg).toHaveStyle('backgroundImage: url(imgURL)');
    expect(headerText).toHaveTextContent('dummyTitle');
    expect(iconImg).toBeInTheDocument();
    expect(bodyText).toBeInTheDocument();
  });
});

describe('Functionality', () => {
  test('Navigation Links direct to the correct page', async () => {
    const history = createMemoryHistory({ initialEntries: ['/dummyRoute'] });
    const pushSpy = vi.spyOn(history, 'push');
    render(
      <Router location={history.location} navigator={history}>
        <Card1 title="dummyTitle" image="imgURL" url="dummyURL" />
      </Router>
    );

    const link = screen.getByRole('link');

    await userEvent.click(link);
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(pushSpy).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/dummyURL',
        search: '',
      },
      undefined,
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined,
      }
    );
  });
});
