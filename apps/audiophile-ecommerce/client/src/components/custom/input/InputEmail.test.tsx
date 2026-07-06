import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputEmail from './InputEmail';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(<InputEmail id="label text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<InputEmail id="label text" />);

    const component = screen.getByTestId('input_email');
    const inputTypeText = screen.getByRole('textbox');
    const paragraphText = screen.getByText('label text');

    expect(component).toBeInTheDocument();
    expect(component).toContainElement(inputTypeText);
    expect(paragraphText).toBeInTheDocument();
  });

  test('Appended classes should be added to component', () => {
    render(<InputEmail appendclass="additionalStyles" id="label text" />);

    const component = screen.getByTestId('input_email');

    expect(component).toHaveClass('additionalStyles');
  });
});

describe('Functionality', () => {
  test('Input accepts and renders text', async () => {
    render(<InputEmail id="label text" />);

    const inputTypeText = screen.getByLabelText<HTMLInputElement>('label text');

    expect(inputTypeText.value).toBe('');
    await userEvent.type(inputTypeText, 'abc ABC 123!');
    expect(inputTypeText).toHaveValue('abc ABC 123!');
  });

  test('Clicking label focuses on input', async () => {
    render(<InputEmail id="label text" />);

    const component = screen.getByTestId('input_email');
    const inputTypeText = screen.getByRole('textbox');

    expect(inputTypeText).not.toHaveFocus();
    await userEvent.click(component);
    expect(inputTypeText).toHaveFocus();
  });
});
