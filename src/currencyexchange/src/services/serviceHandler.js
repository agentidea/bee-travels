/**
 * Service for getting exchange data
 * from an external API
 */
import axios from 'axios';
import { rejects } from 'assert';

export const BASE_URL_ENDPOINT = 'https://api.exchangeratesapi.io/';

function getCurrencyExchangeRate(countryCurrencyCode, timeIndicator = 'latest') {
  return new Promise(function(resolve, reject) {
    if (countryCurrencyCode) {
      var currencyUrl = `${BASE_URL_ENDPOINT}${timeIndicator}`;
      console.log(currencyUrl);
      axios
        .get(currencyUrl)
        .then(function(response) {
          if (response.data.rates.hasOwnProperty(countryCurrencyCode) === true) {
            resolve(response.data.rates[countryCurrencyCode]);
          } else {
            reject(new Error(`no country code ${countryCurrencyCode}`));
          }
        })
        .catch(function(error) {
          console.log(error);
          resolve(error);
        });
    }
  });
}

function getCurrencyExchangeRates(timeIndicator = 'latest') {
  return new Promise(function(resolve) {
    var currencyUrl = `${BASE_URL_ENDPOINT}${timeIndicator}`;
    console.log(currencyUrl);
    axios
      .get(currencyUrl)
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        //Yan suggests maybe return dummy data ...

        //tdd - mocks share learnings thoughts ...
        console.log(error);
      });
  });
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
