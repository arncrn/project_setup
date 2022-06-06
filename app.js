const middleware = require("./lib/middleware");
const express = require("express");
const app = express();
const fetch = require("isomorphic-fetch");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);

function sendRequest(req, res) {
  res.send("<h1>Hello World!</h1>");
}

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/inventory/:item", async (req, res) => {
  const { item } = req.params;
  const response = await fetch(`http://www.recipepuppy.com/api/?i=${item}`);
  const { title, href, results: recipes } = response;
  const inventoryItem = { itemName: "eggs", quantity: 3 }; // hard coding db result

  const body = {
    ...inventoryItem,
    info: `Data obtained from ${title} - ${href}`,
    recipes,
  };

  res.send(body);
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
