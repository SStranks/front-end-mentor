import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputTel from './InputTel';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(<InputTel id="label text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<InputTel id="label text" />);

    const component = screen.getByTestId('input_tel');
    const inputTypeText = screen.getByRole('textbox');
    const paragraphText = screen.getByText('label text');

    expect(component).toBeInTheDocument();
    expect(component).toContainElement(inputTypeText);
    expect(paragraphText).toBeInTheDocument();
  });

  test('Appended classes should be added to component', () => {
    render(<InputTel appendclass="additionalStyles" id="label text" />);

    const component = screen.getByTestId('input_tel');

    expect(component).toHaveClass('additionalStyles');
  });
});

describe('Functionality', () => {
  test('Input accepts and renders text', async () => {
    render(<InputTel id="label text" />);

    const inputTypeText = screen.getByLabelText<HTMLInputElement>('label text');

    expect(inputTypeText.value).toBe('');
    await userEvent.type(inputTypeText, 'abc ABC 123!');
    expect(inputTypeText).toHaveValue('abc ABC 123!');
  });

  test('Clicking label focuses on input', async () => {
    render(<InputTel id="label text" />);

    const inputTypeText = screen.getByRole('textbox');

    expect(inputTypeText).not.toHaveFocus();
    await userEvent.click(inputTypeText);
    expect(inputTypeText).toHaveFocus();
  });
});
