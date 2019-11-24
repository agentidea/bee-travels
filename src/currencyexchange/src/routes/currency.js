/**
 * Router for currency rate conversions
 */

import { Router } from 'express';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import { getCurrencyExchangeRates, convertCurrency } from '../services/serviceHandler';

var router = Router();
/* GET list of currency locations */
router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const data = await getCurrencyExchangeRates();
    res.json(data);
  })
);

/* POST
/currency/search/:
post:
*/

/* GET
/currency/{currencyFromAmount}/{currencyFromCode}/{currencyToCode}:
*/
router.get(
  '/:currencyFromAmount/:currencyFromCode/:currencyToCode',
  asyncMiddleware(async (req, res) => {
    const { currencyFromAmount, currencyFromCode, currencyToCode } = req.params;

    const data = await convertCurrency(
      parseFloat(currencyFromAmount.trim()),
      currencyFromCode.trim(),
      currencyToCode.trim(),
      'latest'
    );

    res.json({ result: data });
  })
);

export default router;
