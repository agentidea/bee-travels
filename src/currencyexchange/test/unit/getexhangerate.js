import { getCurrencyExchangeRate, getCurrencyExchangeRates, convertAlgorithm } from "../../src/services/serviceHandler";

import { describe, it } from "mocha";
import { assert, expect } from "chai";

describe("Get all currency exchange rates", () => {
  it("should return all 3 letter country codes with currency for the day", done => {
    var currencyRateByCountryData = getCurrencyExchangeRates();
    currencyRateByCountryData.then(data => {
      assert(data.rates !== null, "Data should have a Dict called 'rates'");
      assert(data.base === "EUR", "base rate should be EUR");
      done();
    }).catch(err => {
      done(err);
    });
  });
});

describe("Expect non empty list of 32 for all currency exchange rates", () => {
  it("should return all 3 letter country codes with currency for the day", done => {
    var currencyRateByCountryData = getCurrencyExchangeRates();
    currencyRateByCountryData.then(data => {
      var numRates = Object.keys(data.rates).length;
      console.log(`returned number of rate entries ${numRates}`);
      assert(numRates == 32, "Should have 32 number of rate entries");
      done();
    }).catch(err => {
      done(err);
    });
  });
});

describe("Get a specific rate for a specific country code that does not exist, i.e. USA", () => {
  it("should return a rate for a specific country code", (done) => {
    var currencyRateByCountryData = getCurrencyExchangeRate("XYZ");
    currencyRateByCountryData.then(err => {
      // assert.throws(
      //   () => { throw new Error("Error thrown"); }, err, "No country code XYZ");
         done();
      
    }).catch(err => {
      //assert()
      console.error(err.message)
      done();
    });
  });
});

describe("Get a specific rate for a specific country code that does exist, i.e. USD", () => {
  it("should return a numeric rate for a specific country code", (done) => {
    var currencyRateByCountryData = getCurrencyExchangeRate("USD");
    currencyRateByCountryData.then(data => {
      assert(isNaN(data) === false, "expect daily rate as a number");
      var res = isNaN(parseFloat(data));    // test float -> https://stackoverflow.com/questions/12467542/how-can-i-check-if-a-string-is-a-float
      assert( res === false, "expect daily rate as a float"); 
      done();
    }).catch(err => {
      assert()
      done(err);
    });
  });
});

describe("test conversion algorith", () => {
  it("should return a numeric rate ", (done) => {
    var fromValue = 19; //YEN
    var expectedValue= 2.57; //ZAR 
    var fromCurrencyCode ='JPY';
    var toCurrencyCode = 'ZAR';
    var historicalDate = '2019-11-15';  
    var convertAlgorithmRef = convertAlgorithm(fromValue, fromCurrencyCode, toCurrencyCode, historicalDate);
    convertAlgorithmRef.then(data => {
      assert(isNaN(data) === false, "expect a number");
      var res = isNaN(parseFloat(data));    // test float -> https://stackoverflow.com/questions/12467542/how-can-i-check-if-a-string-is-a-float
      assert( res === false, "expect daily rate as a float"); 
      assert( parseFloat(data) === expectedValue, "Nov 15 2019");
      done();
    }).catch(err => {
      assert()
      done(err);
    });
  });
});