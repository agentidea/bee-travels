/**
 * Router for currency rate conversions
 */

import { Router } from 'express';
import {
  getCurrencyExchangeRate,
  getCurrencyExchangeRates,
  convertCurrency,
} from '../services/serviceHandler';

var router = Router();
/* GET list of currency locations */
router.get('/', async ()  => {
  const data = await getCurrencyExchangeRates();
  res.send(data);
});

/* POST
    /currency/search/:
    post:
    */

/* GET
/currency/{currencyFromAmount}/{currencyFromCode}/{currencyToCode}:
*/
router.get('/:currencyFromAmount/:currencyFromCode/:currencyToCode', async (req, res, next) => {
  const { currencyFromAmount, currencyFromCode, currencyToCode } = req.params;
  
  const data = await convertCurrency(
    currencyFromAmount,
    currencyFromCode,
    currencyToCode,
    'latest'
  );

  
  res.send({ result: data });
    
});



export default router;
