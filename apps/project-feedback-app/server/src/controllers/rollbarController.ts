import type { Request } from 'express';

import rateLimit from 'express-rate-limit';
import Rollbar from 'rollbar';

const rollbarClient = (req: Request) => {
  // NOTE:  Typescript has no type yet for fetch
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fetch('https://api.rollbar.com/api/1/item/', {
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json',
      'X-Rollbar-Access-Token': `${process.env['ROLLBAR_POST_CLIENT_ITEM']}`,
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error: Error) => console.log(error));
};

const rollbarConfig: Rollbar.Configuration = {
  accessToken: process.env['ROLLBAR_POST_SERVER_ITEM'],
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: !!process.env['ROLLBAR_ENABLED'],
  environment: process.env['NODE_ENV'],
};

const rollbarServer = new Rollbar(rollbarConfig);

const rollbarRateLimit = rateLimit({
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  windowMs: 60 * 60 * 1000, // 1 hour
});

export { rollbarClient, rollbarRateLimit, rollbarServer };
