import { getCurrencyNameAndCode, getCountryAndCurrencyCode } from './countryCurrencyCodeHandler';

describe('Get Currency Name and Code without country parameter', () => {
  it('should return a error country is required', async () => {
    await expect(getCurrencyNameAndCode()).rejects.toThrowError('please pass in a country name');
  });
});

describe('Get Currency Name and Code given a well known country that does not exist, i.e. Westeros', () => {
  it('should return a error for a non-existent country Westeros', async () => {
    await expect(getCurrencyNameAndCode('Westeros')).rejects.toThrow(
      'no country found for country name Westeros'
    );
  });
});

describe('Get Currency Name and Code given a well known country that does exist, i.e. South Africa', () => {
  it('should return metadata for a specific country, i.e.South Africa', async () => {
    const data = await getCurrencyNameAndCode('South Africa');
    expect(data).toEqual({
      country: 'South Africa',
      currencyName: 'South African rand',
      currencyCode: 'ZAR',
    });
  });
});

describe('Get Currency Name and Country nane given a well known country code that does exist, i.e. ZAR', () => {
  it('should return metadata for a specific country code, i.e. ZAR', async () => {
    const data = await getCountryAndCurrencyCode('ZAR');
    expect(data).toEqual({
      currencyCode: 'ZAR',
      currencyName: 'South African rand',
      country: 'South Africa',
    });
  });
});
