const currencyFormat = (balance: number, locale: string, currency: string) => {
  const result = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(balance);

  return result;
};

export default currencyFormat;
