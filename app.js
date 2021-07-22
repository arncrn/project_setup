const middleware = require("./lib/middleware");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);


app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});