const { expect, assert } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const contactsPath = "/api/v1/contacts";

require("dotenv").config();

chai.should();

let id

// Test: post contacts endpoint
describe("POST api/v1/contacts", () => {
    it("Respond with json containing a error if not found the token", async () => {
      const response = await request(app)
        .post(contactsPath)
        .set("Accept", "application/json")
  
      expect(response.status).to.eql(401);
      expect(response.body).to.have.property("errors");
      expect(response.body.errors).to.equal("Token not found");
    });
  });

  // Test: post contacts endpoint
describe("POST api/v1/contacts", () => {
    it("Respond with json containing a success message", async () => {
      const response = await request(app)
        .post(contactsPath)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.TOKEN_USER_TEST}`)        
        .field("name", "Nicolas Marsan")
        .field("phone", "1159445269")
        .field("email", "nicomar80@gmail.com")
        .field("message", "This is the message");   

      expect(response.status).to.eql(201);
      expect(response.body).that.includes({
        title: "Contacts",
        message: "contacto creado con exito!",
      });
      id=response.body.createContact.id
    });
  });


  // Test: get all contacts endpoints
describe("GET api/v1/contacts", () => {
  it("Respond with json containing a list of all contacts ", async () => {
    const response = await request(app)
      .get(contactsPath)
      .set("Accept", "application/json");

    expect(response.status).to.eql(200);
    assert.typeOf(response.body, "object");
    expect(response.body).to.have.property("contactList");
    assert.typeOf(response.body.contactList, "array");
    
  });
});
 