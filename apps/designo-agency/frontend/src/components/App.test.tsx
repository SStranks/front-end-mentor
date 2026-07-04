import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import App from './App';

const ROUTES = {
  about: '/about',
  appdesign: '/appdesign',
  contact: '/contact',
  erroneous: '/erroneous',
  graphicdesign: '/graphicdesign',
  home: '/',
  locations: '/locations',
  webdesign: '/webdesign',
};

vi.mock('#Pages/home/Homen', () => ({
  default: () => <div data-testid="page-home" />,
}));

vi.mock('#Pages/web-design/WebDesign', () => ({
  default: () => <div data-testid="page-webdesign" />,
}));

vi.mock('#Pages/app-design/AppDesign', () => ({
  default: () => {
    return <div data-testid="page-appdesign" />;
  },
}));

vi.mock('#Pages/graphic-design/GraphicDesign', () => ({
  default: () => {
    return <div data-testid="page-graphicdesign" />;
  },
}));

vi.mock('#Pages/locations/Locations', () => ({
  default: () => {
    return <div data-testid="page-locations" />;
  },
}));

vi.mock('#Pages/about/About', () => ({
  default: () => {
    return <div data-testid="page-about" />;
  },
}));

vi.mock('#Pages/contact/Contact', () => ({
  default: () => {
    return <div data-testid="page-contact" />;
  },
}));

describe('Static Routes', () => {
  test('non-designated routes should redirect and render home page', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    // NOTE:  Push after render to ensure redirect is enacted
    history.push(ROUTES.erroneous);

    const HomePage = await screen.findByTestId('page-home');

    expect(HomePage).toBeInTheDocument();
  });

  test('`/` should render home page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.home);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const HomePage = await screen.findByTestId('page-home');

    expect(HomePage).toBeInTheDocument();
  });

  test('`/webdesign` should render webdesign page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.webdesign);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const WebDesignPage = await screen.findByTestId('page-webdesign');

    expect(WebDesignPage).toBeInTheDocument();
  });

  test('`/appdesign` should render appdesign page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.appdesign);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const AppDesignPage = await screen.findByTestId('page-appdesign');

    expect(AppDesignPage).toBeInTheDocument();
  });

  test('`/graphicdesign` should render graphicdesign page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.graphicdesign);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const GraphicDesignPage = await screen.findByTestId('page-graphicdesign');

    expect(GraphicDesignPage).toBeInTheDocument();
  });

  test('`/locations` should render locations page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.locations);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const LocationsPage = await screen.findByTestId('page-locations');

    expect(LocationsPage).toBeInTheDocument();
  });
  test('`/about` should render about page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.about);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const AboutPage = await screen.findByTestId('page-about');

    expect(AboutPage).toBeInTheDocument();
  });

  test('`/contact` should render contact page', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.contact);
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const ContactPage = await screen.findByTestId('page-contact');

    expect(ContactPage).toBeInTheDocument();
  });
});
