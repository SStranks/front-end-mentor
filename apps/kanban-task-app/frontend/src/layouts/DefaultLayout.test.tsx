import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { LoadingProvider } from '#Context/LoadingContext';

import DefaultLayout from './DefaultLayout';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const mockFn = vi.fn();
    const { asFragment } = render(
      <BrowserRouter>
        <LoadingProvider>
          <DefaultLayout
            boardData={{
              activeBoard: {
                _id: '',
                columns: [],
                name: '',
              },
              boardsList: [],
            }}
            activeBoardId=""
            setActiveBoardId={mockFn}
          />
        </LoadingProvider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    const mockFn = vi.fn();
    render(
      <LoadingProvider>
        <DefaultLayout
          boardData={{
            activeBoard: {
              _id: '',
              columns: [],
              name: '',
            },
            boardsList: [],
          }}
          activeBoardId=""
          setActiveBoardId={mockFn}
        />
      </LoadingProvider>,
      { wrapper: BrowserRouter }
    );

    const nav = screen.getByRole('navigation');
    const aside = screen.getByRole('complementary');
    const main = screen.getByRole('main');

    expect(nav).toBeInTheDocument();
    expect(aside).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
