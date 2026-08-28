// checkout/currency.ts
// Currency conversion for LATAM checkout — enables local billing
// instead of USD-only charges.

const SUPPORTED_CURRENCIES = ["BRL", "MXN", "USD"] as const;
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

// Static rates for demo purposes — production would pull from a
// live FX rate provider instead.
const USD_EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  USD: 1,
  BRL: 5.4,
  MXN: 18.2,
};

export function convertFromUSD(
  amountUSD: number,
  targetCurrency: SupportedCurrency
): number {
  const rate = USD_EXCHANGE_RATES[targetCurrency];
  return Math.round(amountUSD * rate * 100) / 100;
}

export function isSupportedCurrency(
  currency: string
): currency is SupportedCurrency {
  return SUPPORTED_CURRENCIES.includes(currency as SupportedCurrency);
}
