/*const { expect, assert } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const authRoute = "/api/v1/auth";

chai.should();

const correctRegisterData = {
  firstName: "Example",
  lastName: "example",
  email: "example21@example.com",
  password: "123456",
};

const incorrectRegisterData = {
  // data without name
  firstName: "",
  lastName: "Example",
  email: "example20@example.com",
  password: "password123",
};

const correctLoginData = {
  email: "example20@example.com",
  password: "123456",
};
const incorrectLoginData = {
  email: "example99@example.com",
  password: "123456",
};

describe(`POST ${authRoute}/register`, () => {
  // testing user registration
  it.skip("when users doesn't exists and email is not registered respond with 201 created", async () => {
    const response = await request(app)
      .post(`${authRoute}/register`)
      .send(correctRegisterData)
      .set("Accept", "application/json");

    expect(response.status).to.equal(201);
    expect(response.body).should.be.a("object");
    expect(response.body).to.have.property("token");
  });

  it("when exists users in database respond with 409 when user already exists", async () => {
    const response = await request(app)
      .post(`${authRoute}/register`)
      .send(correctRegisterData)
      .set("Accept", "application/json");

    expect(response.status).to.equal(409);
    expect(response.body).should.be.a("object");
    expect(response.body).to.have.property("errors");
    expect(response.body.errors).include("User already exists");
  });

  it("when users data is not complete respond with 400 bad request", async () => {
    const response = await request(app)
      .post(`${authRoute}/register`)
      .send(incorrectRegisterData)
      .set("Accept", "application/json");

    expect(response.status).to.equal(400);
    expect(response.body).should.be.a("object");
    expect(response.body).to.have.property("errors");
  });
});

describe(`${authRoute}/login`, () => {
  // testing user registration
  it("when user exist in database and credentials are correct, respond with 200 OK", async () => {
    const response = await request(app)
      .post(`${authRoute}/login`)
      .send(correctLoginData)
      .set("Accept", "application/json");

    expect(response.status).to.equal(200);
    expect(response.body).should.be.a("object");
    expect(response.body).to.have.property("token");
  });
  it("when users doesn't provide right credentials, respond with 404 Bad Request", async () => {
    const response = await request(app)
      .post(`${authRoute}/login`)
      .send(incorrectLoginData)
      .set("Accept", "application/json");

    expect(response.status).to.equal(401);
    expect(response.body).should.be.a("object");
    expect(response.body).to.have.property("errors");
    expect(response.body.errors).include("User does not exist");
  });
});*/
