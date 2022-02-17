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
  
  // Test: post testimonial endpoint
  /*describe("POST api/v1/testimonials", () => {
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
  });*/