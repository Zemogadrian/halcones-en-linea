type Locales = 'es-ES' | 'en-US' | 'pt-BR' | 'fr-FR' | 'es-MX'

export const priceFormatter = (price: number, currency: Intl.NumberFormatOptions['currency'], locale: Locales) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(price)
}

export const dateFormatter = (date: Date, locale: Locales) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}
