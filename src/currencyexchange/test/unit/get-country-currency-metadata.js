import {
  getCurrencyNameAndCode,
  getCountryAndCurrencyCode,
} from '../../src/services/countryCurrencyCodeHandler';

import { describe, it } from 'mocha';
import { assert, expect } from 'chai';

describe('Get Currency Name and Code without country parameter', () => {
  it('should return a error country is required', done => {
    var currencyNameAndCode = getCurrencyNameAndCode();
    currencyNameAndCode
      .then(data => {
        done();
      })
      .catch(err => {
        assert(err.message, 'please pass in a country name', 'country name required');
        done();
      });
  });
});

describe('Get Currency Name and Code given a well known country that does not exist, i.e. Westeros', () => {
  it('should return a error for a non-existent country Westeros', done => {
    var currencyNameAndCode = getCurrencyNameAndCode('Westeros');
    currencyNameAndCode
      .then(data => {
        done();
      })
      .catch(err => {
        assert(
          err.message,
          'no country found for country name Westeros',
          'no country found for GOT'
        );
        done();
      });
  });
});

describe('Get Currency Name and Code given a well known country that does exist, i.e. South Africa', () => {
  it('should return metadata for a specific country, i.e.South Africa', done => {
    var currencyNameAndCode = getCurrencyNameAndCode('South Africa');
    currencyNameAndCode
      .then(data => {
        assert.exists(data, 'data is neither null nor undefined');
        assert.deepEqual(
          data,
          { CurrencyName: 'South African rand', CurrencyCode: 'ZAR' },
          'should return correct JSON Object'
        );
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe('Get Currency Name and Country nane given a well known country code that does exist, i.e. ZAR', () => {
  it('should return metadata for a specific country code, i.e. ZAR', done => {
    var countryNameAndCurrencyCode = getCountryAndCurrencyCode('ZAR');
    countryNameAndCurrencyCode
      .then(data => {
        assert.exists(data, 'data is neither null nor undefined');
        assert.deepEqual(
          data,
          { CurrencyName: 'South African rand', Country: 'South Africa' },
          'should return correct JSON Object'
        );
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
