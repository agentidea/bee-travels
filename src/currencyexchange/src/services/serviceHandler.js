/**
 * Service for getting exchange data 
 * from an external API
 */
import axios from "axios";
import { rejects } from "assert";

export const URL_ENDPOINT = 'https://api.exchangeratesapi.io/latest';

function getCurrencyExchangeRate(countryCurrencyCode) {
  return new Promise(
    function (resolve, reject) {
        if(countryCurrencyCode) {
        axios.get(URL_ENDPOINT)
            .then(function (response){
                if(response.data.rates.hasOwnProperty(countryCurrencyCode) === true){
                    resolve(response.data.rates[countryCurrencyCode]);
                } else {
                    
                    reject(`no country code ${countryCurrencyCode}`)
                }
            })
            .catch(function (error){
                console.log(error);
                resolve(error);
            }); 
        }
    });
}

function getCurrencyExchangeRates() {
    return new Promise(
      function (resolve) {
          axios.get(URL_ENDPOINT)
            .then(function (response){
                resolve(response.data);
            })
            .catch(function (error){
                console.log(error);
            });
      });
  }

function convertAlgorithm(fromValue, fromCurrencyCode, toCurrencyCode) {
    return new Promise(
        function (resolve, reject) {
            var fromCurrencyInEurosData = getCurrencyExchangeRate(fromCurrencyCode);
            

            fromCurrencyInEurosData.then(function (fromEuros) {
                // console.log(`  1 jpy in euros is ${fromCurrencyCode}`);
                // console.log(fromEuros);
                //resolve(fromEuros);
                var fromTotal = fromValue / fromEuros;
               

                var toCurrencyInEurosData = getCurrencyExchangeRate(toCurrencyCode);
                toCurrencyInEurosData.then(function (toEuros){

                    console.log(`  ${fromValue} jpy in euros is ${fromTotal}`);
                console.log(fromTotal);

                    console.log(`to ${toCurrencyCode}`);
                    console.log(toEuros);

                    var conv = fromTotal*toEuros;
                    
                    console.log(`unrounded it converts to  ${conv}`);
                    var roundedNum = (Math.round( conv * 100 ) / 100).toFixed(2);
                    console.log(`rounded it converts to  ${toCurrencyCode}`);
                    console.log(roundedNum);
                    resolve(roundedNum);
                });

            
        }).catch(function (err) {
            
            console.error(err);
            
        });
    });
}


export { getCurrencyExchangeRate, getCurrencyExchangeRates, convertAlgorithm };
