const { expect, assert } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const testimonialPath = "/api/v1/testimonials";
const testFilePath = "./test/testFiles/logo-somos-mas.png"
require("dotenv").config();

chai.should();

let id

// Test: post testimonial endpoint
describe("POST api/v1/testimonials", () => {
  it("Respond with json containing a error if not found the token", async () => {
    const response = await request(app)
      .post(testimonialPath)
      .set("Accept", "application/json")

    expect(response.status).to.eql(401);
    expect(response.body).to.have.property("errors");
    expect(response.body.errors).to.equal("Token not found");
  });
});

// Test: post testimonial endpoint
describe("POST api/v1/testimonials", () => {
  it("Respond with json containing a success message", async () => {
    const response = await request(app)
      .post(testimonialPath)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`)
      .attach("image", testFilePath)
      .field("name", "test 2")
      .field("content", "This is a post test");

    expect(response.status).to.eql(201);
    expect(response.body).that.includes({
      title: "Testimonials",
      message: "The Testimonial has been created successfully",
    });
    id=response.body.testimonialCreated.id
  });
});

// Test: post testimonial endpoint
describe("POST api/v1/testimonials", () => {
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
  });
});

// Test: PUT testimonial endpoint
describe("PUT api/v1/testimonials/:id", () => {
  it("Respond with json containing a success message", async () => {
    const response = await request(app)
      .put(testimonialPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`)
      .attach("image", testFilePath)
      .field("name", "test 5")
      .field("content", "this is a put test");

    expect(response.status).to.eql(200);
    expect(response.body).that.includes({
      title: "Testimonials",
      message: "The Testimonial has been updated successfully",
    });
  });
});

// Test: PUT testimonial endpoint
describe("PUT api/v1/testimonials/:id", () => {
  it("Respond with json containing a token validation error (User is not admin)", async () => {
    const response = await request(app)
      .put(testimonialPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_USER_TEST}`)

    expect(response.status).to.eql(401);
    expect(response.body).that.includes({
      errors: "Must be admin",
    });
  });
});

// Test: get by id testimonial endpoints
describe("GET api/v1/testimonials/:id", () => {
  it("Respond with json containing a testimonial not found error", async () => {
    const response = await request(app).get(testimonialPath+"/"+"notFile");

    expect(response.status).to.eql(404);
    expect(response.body).that.includes({
      errors: "Testimonial not found",
    });
  });
});

// Test: get by id testimonial endpoints
describe("GET api/v1/testimonials/:id", () => {
  it("Respond with json containing a testimonial with parsedS3URL", async () => {
    const response = await request(app).get(testimonialPath + "/" + id);

    expect(response.status).to.eql(200);
    expect(response.body)
      .to.have.property("testimonial")
      .to.have.property("lastimage")
      .to.satisfy(
        (parsedUrl) => typeof parsedUrl === "object" || parsedUrl === null
      );
  });
});

// Test: get all testimonial endpoints
describe("GET api/v1/testimonials", () => {
  it("Respond with json containing a list of all testimonials where each testmonial have a field lastimage with a parsed s3 url or is null", async () => {
    const response = await request(app)
      .get(testimonialPath)
      .set("Accept", "application/json");

    expect(response.status).to.eql(200);
    assert.typeOf(response.body, "object");
    expect(response.body).to.have.property("testimonials");
    assert.typeOf(response.body.testimonials, "array");
    response.body.testimonials.map((element) =>
      expect(element).to.satisfy(({ lastimage: parsedS3Url }) => {
        return typeof parsedS3Url === "object" || parsedS3Url === null;
      })
    );
  });
});

// Test: delete testimonial endpoint
describe("DELETE api/v1/testimonials/:id", () => {
  it("respond with json containing a success message", async () => {
    const response = await request(app)
      .delete(testimonialPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`);

    expect(response.status).to.eql(200);
    expect(response.body).that.includes({
      title: "Testimonials",
      message: "The Testimonial has been deleted successfully",
    });
  });
});

// Test: delete testimonial endpoint
describe("DELETE api/v1/testimonials/:id", () => {
  it("Respond with json containing a not found error, Testimonial not fount", async () => {
    const response = await request(app)
      .delete(testimonialPath + "/" + "notFile")
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`);

    expect(response.status).to.eql(404);
    expect(response.body)
      .to.have.property("errors")
      .to.equal("Testimonial not found");
  });
});
