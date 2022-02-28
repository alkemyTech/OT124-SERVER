const { expect, assert } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const membersPath = "/api/v1/members";
const testFilePath = "./test/testFiles/logo-somos-mas.png"
require("dotenv").config();

chai.should();

let id

describe( `POST ${membersPath}`, () => {
  it("Respond with json containing a token validation error (User is not admin)", async () => {
    const response = await request(app)
      .post(membersPath)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${process.env.TOKEN_USER_TEST}`)

      expect(response.status).to.eql(401);
      expect(response.body).that.includes({
        errors: "Must be admin",
      });
  });
  it("Respond with json containing a success message", async () => {
    const response = await request(app)
      .post(membersPath)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`)
      .attach("image", testFilePath)
      .field("name", "LongTesting")

    expect(response.status).to.eql(201);
    expect(response.body).that.includes({
      title: "Members",
      message: "Member created succesfully",
    });
    id=response.body.newMember.id
  });
  it("Respond with json containing a validation error, Name is required", async () => {
    const response = await request(app)
      .post(membersPath)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`)
      .send({});

    expect(response.status).to.eql(400);
    expect(response.body).to.have.property("errors");
    expect(response.body.errors).to.have.lengthOf(1);
    expect(response.body.errors[0]).to.equal("Name is required");
  });
});


describe(`PUT ${membersPath}/:id`, () => {
  it("Respond with json containing a success message", async () => {
    const response = await request(app)
      .put(membersPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`)
      .attach("image", testFilePath)
      .field("name", "test 5")

    expect(response.status).to.eql(200);
    expect(response.body).that.includes({
      title: "Member",
      message: "Member updated successfully",
    });
  });
  it("Respond with json containing a token validation error (User is not admin)", async () => {
    const response = await request(app)
      .put(membersPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_USER_TEST}`)

    expect(response.status).to.eql(401);
    expect(response.body).that.includes({
      errors: "Must be admin",
    });
  });
});

describe(`GET ${membersPath}/:id`, () => {
  it("Respond with json containing a new with parsedS3URL", async () => {
    const response = await request(app).get(membersPath + "/" + id);

    expect(response.status).to.eql(200);
    expect(response.body)
      .to.have.property("member")
      .to.have.property("image")
      .to.satisfy(
        (parsedUrl) => typeof parsedUrl === "object" || parsedUrl === null
      );
  });
  it("Respond with json containing a new not found error", async () => {
    const response = await request(app).get(membersPath+"/"+"notFile");

    expect(response.status).to.eql(404);
    expect(response.body).that.includes({
      errors: "Member not found",
    });
  });
});

describe(`GET ${membersPath}`, () => {
  it("Respond with json containing a list of all members where each member have a field lastimage with a parsed s3 url or is null", async () => {
    const response = await request(app)
      .get(membersPath)
      .set("Accept", "application/json");

    expect(response.status).to.eql(200);
    assert.typeOf(response.body, "object");
    expect(response.body).to.have.property("Members");
    assert.typeOf(response.body.Members, "array");
    response.body.Members.map((element) =>
      expect(element).to.satisfy(({ image: parsedS3Url }) => {
        return typeof parsedS3Url === "object" || parsedS3Url === null;
      })
    );
  });
});

describe(`DELETE ${membersPath}/:id`, () => {
  it("respond with json containing a success message", async () => {
    const response = await request(app)
      .delete(membersPath + "/" + id)
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`);

    expect(response.status).to.eql(200);
    expect(response.body).that.includes({
        message: "Member deleted succesfully!",
    });
  });
  it("respond with json containing a token validation error (User is not admin)", async () => {
    const response = await request(app)
      .post(membersPath)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${process.env.TOKEN_USER_TEST}`)

      expect(response.status).to.eql(401);
      expect(response.body).that.includes({
        errors: "Must be admin",
      });
  });
  it("Respond with json containing a not found error, News not fount", async () => {
    const response = await request(app)
      .delete(membersPath + "/" + "notFile")
      .set("Authorization", `Bearer ${process.env.TOKEN_ADM_TEST}`);

    expect(response.status).to.eql(404);
    expect(response.body)
      .to.have.property("errors")
      .to.equal("Member not found");
  });
});
