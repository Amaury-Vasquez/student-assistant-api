import express, { Express } from 'express';

import users from './users';
import schedule from './schedule';

export function routerApi(app: Express) {
  // Defines principal app route
  const router = express.Router();
  app.use('/api/v1', router);

  // Defines sub routes
  router.use('/users', users);
  router.use('/schedule', schedule);
}
