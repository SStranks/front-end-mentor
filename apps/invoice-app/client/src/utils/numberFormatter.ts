const NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  useGrouping: false,
});

export default function numberFormatter(input: number) {
  return NUMBER_FORMATTER.format(input);
}
