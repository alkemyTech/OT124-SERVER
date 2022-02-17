const { expect, assert } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const newsPath = "/api/v1/news";
const testFilePath = "./test/testFiles/logo-somos-mas.png"
require("dotenv").config();

chai.should();

let id

// PUT POST DELETE GET GET

// Test: post testimonial endpoint
describe( `POST ${newsPath}`, () => {
  it("Respond with json containing a token validation error (User is not admin)", async () => {
    const response = await request(app)
      .post(newsPath)
      .set("Accept", "application/json")

      expect(response.status).to.eql(401);
      expect(response.body).that.includes({
        errors: "Must be admin",
      });
  });
});

// Test: post testimonial endpoint
describe( `POST ${newsPath}`, () => {
  it("Respond with json containing a success message", async () => {
    const response = await request(app)
      .post(newsPath)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`)
      .attach("image", testFilePath)
      .field("name", "test 2")
      .field("content", "This is a post test")
      .field("type", "This is a post test.type")
      .field("categoryId", "This is a post test.categoryId");

    expect(response.status).to.eql(201);
    expect(response.body).that.includes({
      title: "News",
      message: "The New has been created successfully",
    });
    id=response.body.newCreated.id
  });
});

// Test: post testimonial endpoint
describe(`POST ${newsPath}`, () => {
  it("Respond with json containing a validation error, Content is required and Name is required", async () => {
    const response = await request(app)
      .post(testimonialPath)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`)
      .send({});

    expect(response.status).to.eql(400);
    expect(response.body).to.have.property("errors");
    expect(response.body.errors).to.have.lengthOf(2);
    expect(response.body.errors[0]).to.equal("Name is required");
    expect(response.body.errors[1]).to.equal("Content is required");
    expect(response.body.errors[2]).to.equal("Type is required");
    expect(response.body.errors[3]).to.equal("CategoryId is required");
  });
});

// Test: PUT testimonial endpoint
describe(`PUT ${newsPath}/:id`, () => {
  it("Respond with json containing a success message", async () => {
    const response = await request(app)
      .put(testimonialPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`)
      .attach("image", testFilePath)
      .field("name", "test 5")
      .field("content", "this is a put test")
      .field("type", "This is a post test.type")
      .field("categoryId", "This is a post test.categoryId");

    expect(response.status).to.eql(200);
    expect(response.body).that.includes({
      title: "News",
      message: "The new has been updated successfully",
    });
  });
});

// Test: PUT testimonial endpoint
describe(`PUT ${newsPath}/:id`, () => {
  it("Respond with json containing a token validation error (User is not admin)", async () => {
    const response = await request(app)
      .put(newsPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_USER_TEST}`)

    expect(response.status).to.eql(401);
    expect(response.body).that.includes({
      errors: "Must be admin",
    });
  });
});

describe(`GET ${newsPath}/:id`, () => {
  it("Respond with json containing a new not found error", async () => {
    const response = await request(app).get(newsPath+"/"+"notFile");

    expect(response.status).to.eql(404);
    expect(response.body).that.includes({
      errors: "New not found",
    });
  });
});

describe(`GET ${newsPath}/:id`, () => {
  it("Respond with json containing a new with parsedS3URL", async () => {
    const response = await request(app).get(newsPath + "/" + id);

    expect(response.status).to.eql(200);
    expect(response.body)
      .to.have.property("new")
      .to.have.property("lastimage")
      .to.satisfy(
        (parsedUrl) => typeof parsedUrl === "object" || parsedUrl === null
      );
  });
});

describe(`GET ${newsPath}`, () => {
  it("Respond with json containing a list of all news where each new have a field lastimage with a parsed s3 url or is null", async () => {
    const response = await request(app)
      .get(testimonialPath)
      .set("Accept", "application/json");

    expect(response.status).to.eql(200);
    assert.typeOf(response.body, "object");
    expect(response.body).to.have.property("news");
    assert.typeOf(response.body.news, "array");
    response.body.news.map((element) =>
      expect(element).to.satisfy(({ lastimage: parsedS3Url }) => {
        return typeof parsedS3Url === "object" || parsedS3Url === null;
      })
    );
  });
});

describe(`DELETE ${newsPath}/:id`, () => {
  it("respond with json containing a success message", async () => {
    const response = await request(app)
      .delete(newsPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`);

    expect(response.status).to.eql(200);
    expect(response.body).that.includes({
      title: "News",
      message: "The New has been deleted successfully",
    });
  });
});

// Test: delete testimonial endpoint
describe(`DELETE ${newsPath}/:id`, () => {
  it("Respond with json containing a not found error, News not fount", async () => {
    const response = await request(app)
      .delete(newsPath + "/" + "notFile")
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`);

    expect(response.status).to.eql(404);
    expect(response.body)
      .to.have.property("errors")
      .to.equal("News not found");
  });
});
