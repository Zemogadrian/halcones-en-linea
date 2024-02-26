export const priceFormatter = (price, currency, locale) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(price)
}

export const dateFormatter = (date, locale) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}
