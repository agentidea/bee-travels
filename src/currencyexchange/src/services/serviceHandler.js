/**
 * Service for getting exchange data
 * from an external API
 */
import axios from 'axios';

export const BASE_URL_ENDPOINT = 'https://api.exchangeratesapi.io/';

async function getCurrencyExchangeRate(countryCurrencyCode, timeIndicator = 'latest') {
  if (countryCurrencyCode) {
    var currencyUrl = `${BASE_URL_ENDPOINT}${timeIndicator}`;

    const { data } = await axios.get(currencyUrl);
    if (data.rates[countryCurrencyCode]) {
      return data.rates[countryCurrencyCode];
    } else {
      throw new Error(`no country code ${countryCurrencyCode}`);
    }
  }
  throw new Error(`please provide a currency code`);
}

async function getCurrencyExchangeRates(timeIndicator = 'latest') {
  const currencyUrl = `${BASE_URL_ENDPOINT}${timeIndicator}`;
  const { data } = await axios.get(currencyUrl);
  return data;
}

function convertAlgorithm(fromValue, fromEuros, toEuros) {
  const fromTotal = fromValue / fromEuros;
  const roundedNum = (Math.round(fromTotal * toEuros * 100) / 100).toFixed(2);
  return roundedNum;
}

async function convertCurrency(fromValue, fromCurrencyCode, toCurrencyCode, historicalDate) {
  const [fromEuros, toEuros] = await Promise.all([
    getCurrencyExchangeRate(fromCurrencyCode, historicalDate),
    getCurrencyExchangeRate(toCurrencyCode, historicalDate),
  ]);

  return convertAlgorithm(fromValue, fromEuros, toEuros);
}

export { getCurrencyExchangeRate, getCurrencyExchangeRates, convertAlgorithm, convertCurrency };
