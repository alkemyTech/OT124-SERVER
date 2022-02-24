/*const { expect, assert } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
require("dotenv").config();

chai.should();

const activitiesPath = "/api/v1/activities";
const TOKEN_ADM_TEST = process.env.TOKEN_ADM_TEST;
const TOKEN_USER_TEST = process.env.TOKEN_USER_TEST;

let id;

// Test post
describe("POST /activities", () => {
  it("respond with success message", async () => {
    const response = await request(app)
      .post(activitiesPath)
      .set("Authorization", `Bearer ${TOKEN_ADM_TEST}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .field("name", "Actividad 1")
      .field("content", "Soy un contenido")
      .expect(201);

    id = response.body.newActivity.id;
  });

  it("respond with 400 if no name is passed", async () => {
    const response = await request(app)
      .post(activitiesPath)
      .set("Authorization", `Bearer ${TOKEN_ADM_TEST}`)
      .set("Accept", "application/json")
      .field("content", "Soy un contenido")
      .expect(400);
  });

  it("respond with 400 if no content is passed", async () => {
    const response = await request(app)
      .post(activitiesPath)
      .set("Authorization", `Bearer ${TOKEN_ADM_TEST}`)
      .set("Accept", "application/json")
      .field("name", "Actividad")
      .expect(400);
  });

  it("respond with 401 and error message if token not found", async () => {
    const response = await request(app)
      .post(activitiesPath)
      .set("Accept", "application/json")
      .field("name", "Actividad")
      .expect(401);

    expect(response.body).that.includes({
      errors: "Token not found",
    });
  });

  it("respond with 401 and error message if user not admin", async () => {
    const response = await request(app)
      .post(activitiesPath)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN_USER_TEST}`)
      .field("name", "Actividad")
      .expect(401);

    expect(response.body).that.includes({
      errors: "Must be admin",
    });
  });
});

// Test get all
describe("GET /activities", () => {
  it("Respond with JSON containing a list of all activities", async () => {
    const response = await request(app)
      .get(activitiesPath)
      .set("Accept", "application/json")
      .expect(200);

    assert.typeOf(response.body, "object");
    expect(response.body).to.have.property("activities");
    assert.typeOf(response.body.activities, "array");
  });

  it("Each activity found contains an image with a parsed s3 url or is null", async () => {
    const response = await request(app)
      .get(activitiesPath)
      .set("Accept", "application/json");

    response.body.activities.map((element) =>
      expect(element).to.satisfy(({ image: parsedS3Url }) => {
        return typeof parsedS3Url === "object" || parsedS3Url === null;
      })
    );
  });
});

// Test get by ID
describe("GET /activities/:id", () => {
  it("Respond with JSON containing a single activity", async () => {
    const response = await request(app)
      .get(activitiesPath + "/" + id)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    assert.typeOf(response.body, "object");
    expect(response.body).to.have.property("activity");
    assert.typeOf(response.body.activity, "object");
  });

  it("Activity contains an image with a parsed s3 url or is null", async () => {
    const response = await request(app)
      .get(activitiesPath + "/" + id)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.activity).to.satisfy(({ image: parsedS3Url }) => {
      return typeof parsedS3Url === "object" || parsedS3Url === null;
    });
  });

  it("respond with status 404 if activity not found and error message", async () => {
    const response = await request(app)
      .get(activitiesPath + "/notvalidid")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    assert.equal(response.body.errors, "Activity not found");
  });
});

// Test put by ID
describe("PUT /activities/:id", () => {
  it("respond with success message", async () => {
    const response = await request(app)
      .put(activitiesPath + "/" + id)
      .set("Authorization", `Bearer ${TOKEN_ADM_TEST}`)
      .set("Accept", "application/json")
      .field("name", "Nombre nuevo")
      .field("content", "Contenido nuevo")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).that.includes({
      title: "Activities",
      message: "The activity has been updated successfully",
    });
  });

  it("respond with error if activity not found", async () => {
    const response = await request(app)
      .put(activitiesPath + "/notvalidid")
      .set("Authorization", `Bearer ${TOKEN_ADM_TEST}`)
      .set("Accept", "application/json")
      .field("name", "Nombre nuevo")
      .field("content", "Contenido nuevo")
      .expect("Content-Type", /json/)
      .expect(404);

    assert.equal(response.body.errors, "Activity not found");
  });

  it("respond with error message if user is not admin", async () => {
    const response = await request(app)
      .put(activitiesPath + "/" + id)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN_USER_TEST}`)
      .field("name", "Nombre nuevo")
      .field("content", "Contenido nuevo")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).that.includes({
      errors: "Must be admin",
    });
  });

  it("respond with error message if token not found", async () => {
    const response = await request(app)
      .put(activitiesPath + "/" + id)
      .set("Accept", "application/json")
      .field("name", "Nombre nuevo")
      .field("content", "Contenido nuevo")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).that.includes({
      errors: "Token not found",
    });
  });
});

// Test delete by ID
describe("DELETE /activities/:id", () => {
  it("respond with success message", async () => {
    const response = await request(app)
      .delete(activitiesPath + "/" + id)
      .set("Authorization", `Bearer ${TOKEN_ADM_TEST}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).that.includes({
      title: "Activities",
      message: "The activity has been deleted successfully",
    });
  });

  it("respond with error if activity not found", async () => {
    const response = await request(app)
      .delete(activitiesPath + "/notvalidid")
      .set("Authorization", `Bearer ${TOKEN_ADM_TEST}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    assert.equal(response.body.errors, "Activity not found");
  });

  it("respond with error message if user is not admin", async () => {
    const response = await request(app)
      .delete(activitiesPath + "/" + id)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN_USER_TEST}`)
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).that.includes({
      errors: "Must be admin",
    });
  });

  it("respond with error message if token not found", async () => {
    const response = await request(app)
      .delete(activitiesPath + "/" + id)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).that.includes({
      errors: "Token not found",
    });
  });
});*/
