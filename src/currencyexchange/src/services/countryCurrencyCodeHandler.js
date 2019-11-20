/**
 * Service for getting metadata for
 * currency name and short
 * 3 char code by country/territory name
 * from CSV file in data dir
 * Country,CurrencyName,CurrencyCode
 *
 */
import { parse } from 'fast-csv';
import { createReadStream } from 'fs';
import { rejects, doesNotReject } from 'assert';

function getCurrencyNameAndCode(country) {
  const fileStream = createReadStream(process.env.INIT_CWD + '/data/countryCurrencyMetadata.csv');
  const parser = parse({ headers: true });

  return new Promise(function(resolve, reject) {
    if (country !== null && typeof country != 'undefined') {
      var currencyMeta;
      fileStream
        .pipe(parser)
        .on('error', error => console.error(error))
        .on('readable', () => {
          for (let row = parser.read(); row; row = parser.read()) {
            var tempCountry = JSON.parse(JSON.stringify(row)).country;
            if (country.trim().toUpperCase() == tempCountry.trim().toUpperCase()) {
              currencyMeta = {
                CurrencyName: JSON.parse(JSON.stringify(row)).currencyName,
                CurrencyCode: JSON.parse(JSON.stringify(row)).currencyCode,
              };
              break;
            }
          }

          if (currencyMeta === null) {
            reject(`no country found for country name ${country}`);
          }
        })
        .on('end', () => {
          resolve(currencyMeta);
        });
    } else {
      resolve(new Error('please pass in a country name'));
    }
  });
}

//CurrencyCode, return Country name and CurrencyName
function getCountryAndCurrencyCode(currencyCode) {
  const fileStream = createReadStream(process.env.INIT_CWD + '/data/countryCurrencyMetadata.csv');
  const parser = parse({ headers: true });

  return new Promise(function(resolve, reject) {
    if (
      currencyCode !== null &&
      typeof currencyCode != 'undefined' &&
      currencyCode.trim().length == 3
    ) {
      var currencyMeta;
      fileStream
        .pipe(parser)
        .on('error', error => console.error(error))
        .on('readable', () => {
          for (let row = parser.read(); row; row = parser.read()) {
            var tempCurrencyCode = JSON.parse(JSON.stringify(row)).currencyCode;
            if (currencyCode.trim().toUpperCase() == tempCurrencyCode.trim().toUpperCase()) {
              currencyMeta = {
                CurrencyName: JSON.parse(JSON.stringify(row)).currencyName,
                Country: JSON.parse(JSON.stringify(row)).country,
              };
              break;
            }
          }

          if (currencyMeta === null) {
            reject(`currency code ${currencyCode} not found`);
          }
        })
        .on('end', () => {
          resolve(currencyMeta);
        });
    } else {
      resolve(new Error('please pass in a 3 character currency code'));
    }
  });
}
export { getCurrencyNameAndCode, getCountryAndCurrencyCode };
