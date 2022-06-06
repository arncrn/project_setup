const nock = require("nock");
const app = require("./app.js");
const request = require("supertest");

// makes request to API
describe("fetch inventory items", () => {
  test("can fetch an item from the inventory", async () => {
    const thirdPartyResponse = await fetch(
      "http://www.recipepuppy.com/api/?i=eggs"
    );
    const { title, href, results: recipes } = thirdPartyResponse;

    // without nock, this is making a request to the API
    // find way to show this compared to nock - see if we can log to console like when running app.js
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
      info: `Data obtained from ${title} - ${href}`,
      recipes,
    });
  });
});

// // uses nock, does not make request to API
// describe("fetch inventory items", () => {
//   const eggs = { itemName: "eggs", quantity: 3 };

//   beforeEach(() => {
//     nock.cleanAll();
//   });

//   // this shows that nock interceptor's array is empty, otherwise it will throw an error
//   // because then the request didn't actually go through nock correctly
//   afterEach(() => {
//     if (!nock.isDone()) {
//       throw new Error("Not all mocked endpoints received requests.");
//     }
//   });

//   test("can fetch an item from the inventory", async () => {
//     const eggsResponse = {
//       title: "FakeAPI",
//       href: "example.org",
//       results: [{ name: "Omelette du Fromage" }]
//     };

//     nock("http://recipepuppy.com")
//       .get("/api?i=eggs")
//       .reply(200, eggsResponse);

//     // nock will prevent this from actually being requested, but will set the reply to 200 and the eggsResponse
//     const response = await request(app)
//       .expect(200)
//       .expect("Content-Type", /json/);

//     // is this showing that the response body really is what we set it to with nock?
//     expect(response.body).toEqual({
//       ...eggs,
//       info: `Data obtained from ${eggsResponse.title} - ${eggsResponse.href}`,
//       recipes: eggsResponse.results
//     });
//   });
// });
