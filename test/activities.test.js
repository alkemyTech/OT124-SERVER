const { expect, assert } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
require("dotenv").config();

chai.should();

const activitiesPath = "/api/v1/activities";
const TOKEN_ADMIN_TEST = process.env.TOKEN_ADMIN_TEST;
const USER_ADMIN_TEST = process.env.TOKEN_ADMIN_TEST;

// Test get all
describe("GET api/v1/activities", () => {
  it("Respond with JSON containing a list of all activities where each should have a field image with a parsed s3 url or is null", async () => {
    const response = await request(app)
      .get(activitiesPath)
      .set("Accept", "application/json");

    expect(response.status).to.eql(200);
    assert.typeOf(response.body, "object");
    expect(response.body).to.have.property("activities");
    assert.typeOf(response.body.activities, "array");
    response.body.array.map((element) =>
      expect(element).to.satisfy(({ lastimage: parsedS3Url }) => {
        return typeof parsedS3Url === "object" || parsedS3Url === null;
      })
    );
  });
});

// Test get by ID

// Test delete by ID

// Test post

// Test put
