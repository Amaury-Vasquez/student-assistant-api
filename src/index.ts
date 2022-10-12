import cors from 'cors';
import express from 'express';

import { routerApi } from './routes';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/errorHandler';

const app = express();

const PORT = process.env.PORT || 5000;

//  Body parser
app.use(express.json());

// CORS
const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin: string, callback: Function) => {
    if (whitelist.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed'));
  },
};

// app.use(cors(options));

// Defines app router
routerApi(app);

// Error hanlders
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`App currently running on http://localhost:${PORT}/`)
);
