import currency from 'currency.js';

export const PEN = (value, withSymbol = true) =>
  currency(value, { symbol: 'S/.' }).format(withSymbol);
export const KG = value =>
  currency(value, { pattern: `#!`, symbol: 'Kg', precision: 0 }).format(true);
