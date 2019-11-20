/**
 * Router for currency rate conversions
 */

import { Router } from 'express';
import {
  getCurrencyExchangeRate,
  getCurrencyExchangeRates,
  convertAlgorithm,
} from '../services/serviceHandler';

var router = Router();
/* GET list of currency locations */
router.get('/', function(req, res, next) {
  var currencyData = getCurrencyExchangeRates();
  currencyData
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.sendStatus(500);
      next(err);
    });
});

/* POST
    /currency/search/:
    post:
    */

/* GET
/currency/{currencyFromAmount}/{currencyFromCode}/{currencyToCode}:
*/
router.get('/:currencyFromAmount/:currencyFromCode/:currencyFromCode', (req, res, next) => {
  var convertAlgorithmRef = convertAlgorithm(fromValue, fromCurrencyCode, toCurrencyCode, 'latest');
  convertAlgorithmRef
    .then(data => {
      res.send({ result: data });
    })
    .catch(err => {
      res.sendStatus(500);
      next(err);
    });
});

/* GET exchange rate for currency code */
router.get('/:code', function(req, res, next) {
  console.log(req.params.code);
  var currencyData = getCurrencyExchangeRate(req.params.code);

  currencyData
    .then(function(data) {
      console.log(data);
      res.send({ result: data });
    })
    .catch(function(err) {
      res.sendStatus(500);
      next(err);
    });
});

export default router;
