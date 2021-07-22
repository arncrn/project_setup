const config = require('./lib/config');
const app = require('./app');
const PORT = config.PORT;
const HOST = config.HOST;


app.listen(PORT, () => {
  console.log(HOST);
  console.log(`App running on port ${PORT}`);
});