import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckoutSummaryProductCard from '#Components/checkout/CheckoutSummaryProductCard';

import CheckoutForm from './CheckoutForm';

const DummyProductSummaryCard = (): JSX.Element => {
  return (
    <CheckoutSummaryProductCard
      key={1}
      productImg="dummyImgURL"
      productTitle="dummyProductTitle"
      productPrice={123.45}
      productQuantity={3}
    />
  );
};

describe('Appearance', () => {
  test('Component render matches snapshot', () => {
    const mockFn = vi.fn();
    const { asFragment } = render(
      <CheckoutForm totalAmount={99.01} openOrderCompleteModal={mockFn} productsList={[DummyProductSummaryCard()]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Component base should be fully rendered', () => {
    const mockFn = vi.fn();
    render(
      <CheckoutForm totalAmount={99.01} openOrderCompleteModal={mockFn} productsList={[DummyProductSummaryCard()]} />
    );

    // Checkout Container
    const checkoutContainer = screen.getByTestId('checkout container');
    const checkoutTitle = within(checkoutContainer).getByText(/^checkout$/);
    const billingDetailsText = within(checkoutContainer).getByText(/^billing details$/);
    const shippingInfoText = within(checkoutContainer).getByText(/^shipping info$/);
    const paymentDetailsText = within(checkoutContainer).getByText(/^payment details$/);
    const paymentMethodText = within(checkoutContainer).getByText(/^payment method$/);
    const nameInput = within(checkoutContainer).getByPlaceholderText('Insert full name');
    const emailInput = within(checkoutContainer).getByPlaceholderText('Insert email address');
    const phoneInput = within(checkoutContainer).getByPlaceholderText('Insert phone number');
    const addressInput = within(checkoutContainer).getByPlaceholderText('Insert address');
    const zipInput = within(checkoutContainer).getByPlaceholderText('Insert ZIP code');
    const cityInput = within(checkoutContainer).getByPlaceholderText('Insert city');
    const countryInput = within(checkoutContainer).getByPlaceholderText('Insert country');
    const eMoneyRadioInput = within(checkoutContainer).getByRole('radio', { name: 'e-Money' });
    const cashRadioInput = within(checkoutContainer).getByRole('radio', { name: 'cash' });

    // Summary Container
    const summaryContainer = screen.getByTestId('checkout summary');
    const summaryTitle = within(summaryContainer).getByText(/^summary$/);
    const totalText = within(summaryContainer).getByText(/^total$/);
    const shippingText = within(summaryContainer).getByText(/^shipping$/);
    const vatText = within(summaryContainer).getByText(/^vat \(included\)$/);
    const grandTotalText = within(summaryContainer).getByText(/^grand total$/);
    const continueAndPayBtn = within(summaryContainer).getByRole('button', { name: 'continue & pay' });
    const totalAmountsContainer = screen.getByTestId('summary financial');
    const totalAmountsTexts = within(totalAmountsContainer).getAllByText(/^\$ (0|[1-9]\d{0,2})(,\d{3})*(\.\d{1,2})?$/);

    // Checkout Container
    expect(checkoutContainer).toBeInTheDocument();
    expect(checkoutTitle).toBeInTheDocument();
    expect(billingDetailsText).toBeInTheDocument();
    expect(shippingInfoText).toBeInTheDocument();
    expect(paymentDetailsText).toBeInTheDocument();
    expect(paymentMethodText).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(zipInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(eMoneyRadioInput).toBeInTheDocument();
    expect(cashRadioInput).toBeInTheDocument();

    // Summary Container
    expect(summaryContainer).toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(totalText).toBeInTheDocument();
    expect(shippingText).toBeInTheDocument();
    expect(vatText).toBeInTheDocument();
    expect(grandTotalText).toBeInTheDocument();
    expect(totalAmountsTexts.length).toEqual(4);
    expect(continueAndPayBtn).toBeInTheDocument();
  });
});

describe('Functionality', () => {
  test('Clicking `e-Money` radio reveals two inputs: e-money number, e-money pin', async () => {
    const mockFn = vi.fn();
    render(
      <CheckoutForm totalAmount={99.01} openOrderCompleteModal={mockFn} productsList={[DummyProductSummaryCard()]} />
    );

    const eMoneyRadioInput = screen.getByRole('radio', { name: 'e-Money' });

    expect(screen.queryByPlaceholderText('Insert e-Money number')).not.toBeInTheDocument();
    await userEvent.click(eMoneyRadioInput);
    expect(screen.getByPlaceholderText('Insert e-Money number')).toBeInTheDocument();
  });

  test('Clicking `cash` radio reveals img and text content', async () => {
    const mockFn = vi.fn();
    render(
      <CheckoutForm totalAmount={99.01} openOrderCompleteModal={mockFn} productsList={[DummyProductSummaryCard()]} />
    );

    const cashRadioInput = screen.getByRole('radio', { name: 'cash' });

    expect(screen.queryByText(/The ‘Cash on Delivery’ option enables/)).not.toBeInTheDocument();
    await userEvent.click(cashRadioInput);
    expect(screen.getByText(/The ‘Cash on Delivery’ option enables/)).toBeInTheDocument();
  });

  test('Clicking form submit button when all inputs are invalid should add focus to first invalid input', async () => {
    const mockFn = vi.fn();
    render(
      <CheckoutForm totalAmount={99.01} openOrderCompleteModal={mockFn} productsList={[DummyProductSummaryCard()]} />
    );

    const nameInput = screen.getByPlaceholderText('Insert full name');
    const continueAndPayBtn = screen.getByRole('button', {
      name: 'continue & pay',
    });

    expect(nameInput).not.toHaveFocus();
    await userEvent.click(continueAndPayBtn);
    expect(nameInput).toHaveFocus();
    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  test('Clicking form submit button when all inputs are valid should fire order complete modal', async () => {
    const mockFn = vi.fn();
    render(
      <CheckoutForm totalAmount={99.01} openOrderCompleteModal={mockFn} productsList={[DummyProductSummaryCard()]} />
    );

    const nameInput = screen.getByPlaceholderText('Insert full name');
    const emailInput = screen.getByPlaceholderText('Insert email address');
    const phoneInput = screen.getByPlaceholderText('Insert phone number');
    const addressInput = screen.getByPlaceholderText('Insert address');
    const zipInput = screen.getByPlaceholderText('Insert ZIP code');
    const cityInput = screen.getByPlaceholderText('Insert city');
    const countryInput = screen.getByPlaceholderText('Insert country');
    const cashRadioInput = screen.getByRole('radio', { name: 'cash' });
    const continueAndPayBtn = screen.getByRole('button', {
      name: 'continue & pay',
    });

    await userEvent.click(nameInput);
    await userEvent.keyboard('John Doe');
    await userEvent.click(emailInput);
    await userEvent.keyboard('test@domain.com');
    await userEvent.click(phoneInput);
    await userEvent.keyboard('02081117777');
    await userEvent.click(addressInput);
    await userEvent.keyboard('1428 Elm Street');
    await userEvent.click(zipInput);
    await userEvent.keyboard('TW12ZXY');
    await userEvent.click(cityInput);
    await userEvent.keyboard('London');
    await userEvent.click(countryInput);
    await userEvent.keyboard('United Kingdom');
    await userEvent.click(cashRadioInput);

    expect(mockFn).toHaveBeenCalledTimes(0);
    await userEvent.click(continueAndPayBtn);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
