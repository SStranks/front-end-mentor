// const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
//   currency: 'USD',
//   style: 'currency',
// });

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  style: 'decimal',
});

export default function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
