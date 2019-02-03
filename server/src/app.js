const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ora = require('ora');
const compression = require('compression');
const history = require('connect-history-api-fallback');

// import routes
const apiRouter = require('./routes/apiRouter');
const userRoutes = require('./routes/user');

// Start spinner
const spinner = ora('Starting server.').start();

// get express app instance
const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/ninjago', {
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
  app.use(history({
    rewrites: [{
      from: /^\/api\/.*$/,
      to(context) {
        return context.parsedUrl.path;
      },
    }],
  }));
}
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json({
  limit: '500mb',
}));
app.use(bodyParser.urlencoded({
  limit: '500mb',
  extended: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

// Add routes
app.use('/api', apiRouter);
app.use('/user', userRoutes);

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../public`));
  app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/../public/index.html`));
}

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});

const port = process.env.PORT || 3344;

app.listen(port, () => {
  spinner.text = 'Running on locahost:3344';
  spinner.color = 'green';
  spinner.succeed();
});
