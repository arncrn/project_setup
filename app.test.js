const nock = require("nock");
const app = require("./app.js");
const request = require("supertest");

// makes request to API
describe("fetch inventory items and access API", () => {
  test("can fetch an item from the inventory and access API", async () => {
    const APIResponse = await fetch(`https://d1.supercook.com/dyn/dautoc?term=eggs&lang=en`);
    const parsed = await APIResponse.json();

    // without nock, this makes a request to the API
    // we know this because the API is returning the actual number of recipies we get using our app
    const response = await request(app)
      .get(`/inventory/eggs`)
      .expect(200)
      .expect("Content-Type", /json/);

    const eggs = {
      itemName: "eggs",
      quantity: 3,
    };

    expect(response.body).toEqual({
      ...eggs,
      info: `The API returned ${parsed.length} recipies`,
    });

    // hard coded for demonstration to show the number of recipies comes from API
    expect(response.body.info).toEqual(`The API returned 9 recipies`)
  });
});

// uses nock, does not make request to API
describe("fetch inventory items with Nock for API", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  // this shows that nock interceptor's array is empty, otherwise it will throw an error
  // because then the request didn't actually go through nock correctly
  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error("Not all mocked endpoints received requests.");
    }
  });

  test("can fetch an item from the inventory using Nock for API", async () => {
    const eggsResponse = ['omelet', 'eggs benedict'];

    const eggs = {
      itemName: "eggs",
      quantity: 3,
    };

    nock("https://d1.supercook.com")
      .get("/dyn/dautoc?term=eggs&lang=en")
      .reply(200, eggsResponse);

    // nock will prevent this from actually being requested
    const response = await request(app)
      .get('/inventory/eggs')
      .expect(200);

    // here the eggsResponse array is used in place of the data returned from the API
    expect(response.body).toEqual({
      ...eggs,
      info: `The API returned ${eggsResponse.length} recipies`
    });

    // hard coded for demonstration purposes to show the recipies come from eggsResponse and not API
    expect(response.body.info).toEqual(`The API returned 2 recipies`);
  });
});
