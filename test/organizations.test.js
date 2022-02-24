const { expect, assert } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const orgPath = "/api/v1/organizations";
const testFilePath = "./test/testFiles/logo-somos-mas.png"
require("dotenv").config();
let id

chai.should();

let user = {
  email: "example10@example.com",
  password: "123456"
}
let admin = {
  email: "example11@example.com",
  password: "123456"
}

async function login(isAdmin) {
  let type
  if(isAdmin) {  type = admin }
   else {  type = user}
  
  const responseLogin = await request(app)
    .post("/api/v1/auth/login")
    .set("Accept", "application/json")
    .send(type)
    return responseLogin
}


describe(` 1) responnds with 401 if must be an admin `, () => {
  it(" GET ORGANIZATION Respond with json containing a token validation error (User is not admin) ", async () => {
      let  resLogin = await  login()
      
     // console.log(resLogin.body)
    const response = await request(app)
      .get(`${orgPath}/${"1"}/public`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      

      //console.log(response.body,"<-- res body")
    expect(response.status).to.eql(401);
    expect(response.body).that.includes({
      errors: "Must be admin",
    });
  });
  it(" GET ORGANIZATIONS Respond with json containing a token validation error (User is not admin) ", async () => {
    let  resLogin = await  login()
    
   // console.log(resLogin.body)
  const response = await request(app)
    .get(`${orgPath}`)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${resLogin.body.token}`)
    

    //console.log(response.body,"<-- res body")
  expect(response.status).to.eql(401);
  expect(response.body).that.includes({
    errors: "Must be admin",
  });
});
  it(" POST ORGANIZATION Respond with json containing a token validation error (User is not admin) ", async () => {
    let  resLogin = await  login()
    
   // console.log(resLogin.body)
  const response = await request(app)
    .post(`${orgPath}`)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${resLogin.body.token}`)
    .send({})

    //console.log(response.body,"<-- res body")
  expect(response.status).to.eql(401);
  expect(response.body).that.includes({
    errors: "Must be admin",
  });
});
it(" PUT ORGANIZATION Respond with json containing a token validation error (User is not admin) ", async () => {
  let  resLogin = await  login()
  
 // console.log(resLogin.body)
const response = await request(app)
  .put(`${orgPath}/8000000000`)
  .set("Accept", "application/json")
  .set("Authorization", `Bearer ${resLogin.body.token}`)
  .send({})

  //console.log(response.body,"<-- res body")
expect(response.status).to.eql(401);
expect(response.body).that.includes({
  errors: "Must be admin",
});
});
it(" DELETE ORGANIZATION Respond with json containing a token validation error (User is not admin) ", async () => {
  let  resLogin = await  login()
  
 // console.log(resLogin.body)
const response = await request(app)
  .delete(`${orgPath}/800000000`)
  .set("Accept", "application/json")
  .set("Authorization", `Bearer ${resLogin.body.token}`)
  .send({})

  //console.log(response.body,"<-- res body")
expect(response.status).to.eql(401);
expect(response.body).that.includes({
  errors: "Must be admin",
});
});
});


describe(`2) responds with 404 if id doesnt found `, () => {
  it(" GET ORGANIZATION Respond with json containing a not found error id ", async () => {
      let  resLogin = await  login(true)
      let noValue
     // console.log(resLogin.body)
    const response = await request(app)
      .get(`${orgPath}/${noValue}/public`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${resLogin.body.token}`)


   //   console.log(response.body,"<-- res body")
    expect(response.status).to.eql(404);
    expect(response.body).that.includes({
      errors: "id is undefined",
    });
  });  
  it(" EDIT ORGANIZATION Respond with json containing a not found error id ", async () => {
    let  resLogin = await  login(true)
    let noValue
   // console.log(resLogin.body)
  const response = await request(app)
    .put(`${orgPath}/${noValue}`)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${resLogin.body.token}`)
    .send({})

   // console.log(response.body,"<-- res body")
  expect(response.status).to.eql(404);
  expect(response.body).that.includes({
    errors: "id is undefined",
  });
})

  it(" DELETE ORGANIZATION Respond with json containing a not found error id ", async () => {
    let  resLogin = await  login(true)
    let noValue
   // console.log(resLogin.body)
  const response = await request(app)
    .delete(`${orgPath}/${noValue}`)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${resLogin.body.token}`)
    .send({})

    //console.log(response.body,"<-- res body")
  expect(response.status).to.eql(404);
  expect(response.body).that.includes({
    errors: "id is undefined",
  });
})
});

describe(`3) correct responds of petitions ${orgPath}`, () => {
  
it(" CREATE ORGANIZATION needs to create my org ", async () => {
  let  resLogin = await  login(true)
  let noValue
  //CREATE NEW DATA, IF YOU DONT, WHEN YOU RUN AGAIN IT GOING TO FAIL
 // console.log(resLogin.body)
const response = await request(app)
  .post(`${orgPath}/`)
  .set("Accept", "application/json")
  .set("Authorization", `Bearer ${resLogin.body.token}`)
  .attach("image", testFilePath)
  .field("name", "test 12")
  .field("address", "This is a post test")
  .field("welcomeText", "genial")
  .field("phone", "48958815")
  .field("email", "new6@new.com")
  

  //console.log(response.body,"<-- res body")
expect(response.status).to.eql(201);
expect(response.body).that.includes({
  title: "Organizations",
message: "The Organization has been created successfully",
});
}); 


it(" GET ORGANIZATION needs to bring me info of an org  ", async () => {
  // IF YOU WANT YO RUN THIS TEST, you need at least an org in database
    let  resLogin = await  login(true)
    let noValue
   // console.log(resLogin.body)
  const response = await request(app)
    .get(`${orgPath}/${"1"}/public`)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${resLogin.body.token}`)

 //   console.log(response.body,"<-- res body")
  expect(response.status).to.eql(200);
  expect(response.body)
  .to.have.property("name")
  expect(response.body)
  .to.have.property("image")
  expect(response.body)
  .to.have.property("email")
  expect(response.body)
  .to.have.property("phone")
  expect(response.body)
  .to.have.property("address")
  expect(response.body)
  .to.have.property("welcomeText")

    
}); 


it(" EDIT ORGANIZATION needs to updated my org ", async () => {
  let  resLogin = await  login(true)
  let noValue
 // console.log(resLogin.body)
const response = await request(app)
  .put(`${orgPath}/${"1"}`)
  .set("Accept", "application/json")
  .set("Authorization", `Bearer ${resLogin.body.token}`)
  .attach("image", testFilePath)
  .field("name", "test 2")
  .field("address", "This is a put test")
  .field("welcomeText", "genial")
  .field("phone", "48958815")
  .field("email", "pulmamarca@pul.com")
  

  //console.log(response.body,"<-- res body")
expect(response.status).to.eql(200);
expect(response.body).that.includes({
  title: "Organization",
  message: "Organization updated successfully"
});

})
 



it(" DELETE ORGANIZATION needs to delete my org ", async () => {
  let  resLogin = await  login(true)
  let noValue
  //REMEMBER SET TO NULL DELETEDAT 
 // console.log(resLogin.body)
const response = await request(app)
  .delete(`${orgPath}/${"1"}`)
  .set("Accept", "application/json")
  .set("Authorization", `Bearer ${resLogin.body.token}`)

  

  //console.log(response.body,"<-- res body")
expect(response.status).to.eql(200);
expect(response.body).that.includes({
  title: "Organization",
  message: "The Organization has been deleted successfully"
});

})
})

