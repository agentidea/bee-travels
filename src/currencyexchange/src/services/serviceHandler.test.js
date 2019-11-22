import {
  getCurrencyExchangeRate,
  getCurrencyExchangeRates,
  convertAlgorithm,
} from './serviceHandler';

describe('Get all currency exchange rates', () => {
  it('should return all 3 letter country codes with currency for the day', async () => {
    const data = await getCurrencyExchangeRates();
    expect(data.rates).not.toBeNull()
    expect(data.base).toEqual('EUR')
  });
});

describe('Expect non empty list of 32 for all currency exchange rates', () => {
  it('should return all 3 letter country codes with currency for the day', async () => {
    const data = await getCurrencyExchangeRates();
    expect(Object.keys(data.rates)).toHaveLength(32)
  });
});

describe('Get a specific rate for a specific country code that does not exist, i.e. USA', () => {
  it('should throw an error', async () => {
    await expect(getCurrencyExchangeRate('XYZ')).rejects.toThrow('no country code XYZ');
  });
});

describe('Get a specific rate for a specific country code that does exist, i.e. USD', () => {
  it('should return a numeric rate for a specific country code', async() => {
    const data  = await getCurrencyExchangeRate('USD');
    expect(isNaN(data)).toEqual(false);
    expect(isNaN(parseFloat(data))).toEqual(false);
  });
});

describe('test conversion algorith', () => {
  it('should return a numeric rate', () => {
    var fromValue = 10; //YEN
    var fromEuros = 19; //YEN
    var toEuros = 21; //YEN
    var result = convertAlgorithm(
      fromValue,
      fromEuros,
      toEuros
    );
    
    expect(result).toEqual("11.05")
  });
});
