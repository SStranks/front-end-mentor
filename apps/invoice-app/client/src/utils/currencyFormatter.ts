const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  useGrouping: true,
});

export default function currencyFormatter(input: number) {
  return CURRENCY_FORMATTER.format(input);
}
