const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const { APP_URL, ENV } = require('./constants/envVariables');
const session = require('./middlewares/session');
const router = require('./routes');

const errorHandler = require('./middlewares/errorHandler');

const NotFoundError = require('./constants/errors/notFoundError');

const app = express();
if (ENV !== 'test')
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    environment: ENV,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
  });

app.use(morgan('dev'));
app.use(
  cors({
    //  allow cookies (or other user credentials) to be included on cross-origin requests
    credentials: true,
    origin: APP_URL,
  })
);

app.use(bodyParser.json());
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

module.exports = { app };
