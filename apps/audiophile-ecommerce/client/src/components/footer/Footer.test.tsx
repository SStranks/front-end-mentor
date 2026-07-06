import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';

import Footer from './Footer';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<Footer />, { wrapper: BrowserRouter });

    const component = screen.getByRole('contentinfo');
    const nav = screen.getByRole('navigation');
    const navLinks = within(nav).getAllByRole('link');
    const navLogo = screen.getByAltText(/^audiophile logo$/i);
    const socialMediaLinks = screen.getAllByAltText(/media page$/i);
    const copyright = screen.getByText(/Copyright 2021. All Rights Reserved/, {
      exact: true,
    });

    expect(component).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(navLogo).toBeInTheDocument();
    expect(navLinks).toHaveLength(4);
    expect(navLogo).toBeInTheDocument();
    expect(socialMediaLinks).toHaveLength(3);
    expect(copyright).toBeInTheDocument();
  });
});

describe('Functionality', () => {
  test('Navigation links direct/render correct page', async () => {
    const history = createMemoryHistory({ initialEntries: ['/dummyRoute'] });
    const spyPush = vi.spyOn(history, 'push');
    render(
      <Router location={history.location} navigator={history}>
        <Footer />
      </Router>
    );

    const HomeLink = screen.getByRole('link', { name: /^home$/i });
    const HeadphoneLink = screen.getByRole('link', { name: /^headphones$/i });
    const SpeakersLink = screen.getByRole('link', { name: /^speakers$/i });
    const EarphonesLink = screen.getByRole('link', { name: /^earphones$/i });

    await userEvent.click(HomeLink);
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/',
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
    await userEvent.click(HeadphoneLink);
    expect(spyPush).toHaveBeenCalledTimes(2);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/headphones',
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
    await userEvent.click(SpeakersLink);
    expect(spyPush).toHaveBeenCalledTimes(3);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/speakers',
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
    await userEvent.click(EarphonesLink);
    expect(spyPush).toHaveBeenCalledTimes(4);
    expect(spyPush).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/earphones',
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

  test('Social media links hrefs are correctly defined', () => {
    render(<Footer />, { wrapper: BrowserRouter });

    const FacebookLink = screen.getByRole('link', {
      name: 'Facebook Media Page',
    });
    const TwitterLink = screen.getByRole('link', {
      name: 'Twitter Media Page',
    });
    const InstagramLink = screen.getByRole('link', {
      name: 'Instagram Media Page',
    });

    expect(FacebookLink).toHaveAttribute('href', 'http://www.facebook.com');
    expect(FacebookLink).toHaveAttribute('target', '_blank');
    expect(TwitterLink).toHaveAttribute('href', 'http://www.twitter.com');
    expect(TwitterLink).toHaveAttribute('target', '_blank');
    expect(InstagramLink).toHaveAttribute('href', 'http://www.instagram.com');
    expect(InstagramLink).toHaveAttribute('target', '_blank');
  });
});
