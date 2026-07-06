import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import Contact from './Contact';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <Contact />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation');
    const header = screen.getByRole('banner');
    const footer = screen.getByRole('contentinfo');
    const h1Text = screen.getByRole('heading', {
      level: 1,
      name: /contact us/i,
    });
    const headerText = screen.getByText(/ready to take it to/i);

    const form = screen.getByRole('form');
    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const phoneInput = screen.getByPlaceholderText(/phone/i);
    const msgTextArea = screen.getByPlaceholderText(/your message/i);
    const submitBtn = screen.getByRole('button', { name: 'submit' });

    const locations = screen.getByTestId('locations');

    expect(nav).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).toContainElement(h1Text);
    expect(header).toContainElement(headerText);
    expect(form).toBeInTheDocument();
    expect(form).toContainElement(nameInput);
    expect(form).toContainElement(emailInput);
    expect(form).toContainElement(phoneInput);
    expect(form).toContainElement(msgTextArea);
    expect(form).toContainElement(submitBtn);
    expect(footer).toBeInTheDocument();

    expect(locations).toBeInTheDocument();
    expect(screen.getAllByTestId('location')).toHaveLength(3);
  });
});
