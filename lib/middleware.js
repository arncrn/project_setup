const config = require('./config');

const requestLogger = (req, res, next) => {
  if (config.NODE_ENV !== 'test') {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
  }
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };