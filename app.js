const middleware = require("./lib/middleware");
const express = require("express");
const app = express();
const fetch = require("isomorphic-fetch");
const nock = require("nock");

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
  const APIResponse = await fetch(`https://d1.supercook.com/dyn/dautoc?term=${item}&lang=en`);
  const parsed = await APIResponse.json();

  const inventoryItem = { itemName: "eggs", quantity: 3 }; // hard coding db result

  const body = {
    ...inventoryItem,
    info: `The API returned ${parsed.length} recipies`,
  };

  res.send(body);
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
