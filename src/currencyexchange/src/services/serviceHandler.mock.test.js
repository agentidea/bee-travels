import axios from 'axios';
import {
  getCurrencyExchangeRate,
  getCurrencyExchangeRates,
  convertAlgorithm,
} from './serviceHandler';
import ratesMock from './mocks/rates.json';

describe('Get all currency exchange rates', () => {
  it('should return all 3 letter country codes with currency for the day', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        rates: {
          CAD: 1.4679,
        },
        base: 'EUR',
        date: '2019-11-22',
      },
    });
    const data = await getCurrencyExchangeRates();
    expect(data.rates).toEqual({ CAD: 1.4679 });
    expect(data.base).toEqual('EUR');
  });
});

describe('Expect non empty list of 32 for all currency exchange rates', () => {
  it('should return all 3 letter country codes with currency for the day', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(ratesMock);
    const data = await getCurrencyExchangeRates();
    expect(Object.keys(data.rates)).toHaveLength(32);
  });
});

describe('Get a specific rate for a specific country code that does not exist, i.e. USA', () => {
  it('should throw an error', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(ratesMock);
    await expect(getCurrencyExchangeRate('XYZ')).rejects.toThrow('no country code XYZ');
  });
});

describe('Get a specific rate for a specific country code that does exist, i.e. USD', () => {
  it('should return a numeric rate for a specific country code', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(ratesMock);
    const value = await getCurrencyExchangeRate('USD');
    expect(value).toEqual(1.1058);
  });
});

describe('test conversion algorith', () => {
  it('should return a numeric rate', () => {
    var fromValue = 10; //YEN
    var fromEuros = 19; //YEN
    var toEuros = 21; //YEN
    var result = convertAlgorithm(fromValue, fromEuros, toEuros);

    expect(result).toEqual('11.05');
  });
});
