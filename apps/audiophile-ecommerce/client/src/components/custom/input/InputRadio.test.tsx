import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputRadio from './InputRadio';

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const { asFragment } = render(<InputRadio id="label text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    render(<InputRadio id="label text" />);

    const component = screen.getByTestId('input_radio');
    const inputTypeRadio = screen.getByRole('radio');
    const paragraphText = screen.getByText('label text');

    expect(component).toBeInTheDocument();
    expect(component).toContainElement(inputTypeRadio);
    expect(paragraphText).toBeInTheDocument();
  });

  test('Appended classes should be added to component', () => {
    render(<InputRadio appendclass="additionalStyles" id="label text" />);

    const component = screen.getByTestId('input_radio');

    expect(component).toHaveClass('additionalStyles');
  });
});

describe('Functionality', () => {
  test('Radio accepts click and becomes checked', async () => {
    render(<InputRadio id="label text" />);

    const inputTypeRadio = screen.getByLabelText<HTMLInputElement>('label text');

    expect(inputTypeRadio).not.toBeChecked();
    await userEvent.click(inputTypeRadio);
    expect(inputTypeRadio).toBeChecked();
  });

  test('Label accepts click and radio becomes checked', async () => {
    render(<InputRadio id="label text" />);

    // const label = container.querySelector<HTMLLabelElement>('label');
    const inputTypeRadio = screen.getByRole('radio');

    expect(inputTypeRadio).not.toBeChecked();
    await userEvent.click(inputTypeRadio);
    expect(inputTypeRadio).toBeChecked();
  });
});
