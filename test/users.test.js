const assert = require('assert');
const request = require("supertest");
const app = require('../src/app');
require("dotenv").config();

const endpoint = '/api/v1/users';
const userToken = process.env.TOKEN_USER_TEST;
const adminToken = process.env.TOKEN_ADM_TEST;
const testUserId = 999999992;
const invalidUserId = 10002000;

describe('api/v1/users', () => {
    after(async () => {
        const restoreUserTest = await request(app)
            .put(`${endpoint}/restore/${testUserId}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${adminToken}`);

        const deleteUserTest = await request(app)
            .delete(`${endpoint}/${testUserId}?force=true`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${adminToken}`);
    });

    describe('GET', () => {
        it('Should return status 401 unauthorized without a token', async () => {
            // Setup
            const expectedStatus = 401;
            const expectedMessageStatus = 'Token not found';
            
            // Exercise
            const response = await request(app)
                .get(endpoint)
                .set("Accept", "application/json");
    
            // Verify
            assert.strictEqual(response.status, expectedStatus);
            assert.strictEqual(response.body.errors, expectedMessageStatus);
        });

        it('Should return status 401 unauthorized with a user token', async () => {
            const expectedStatus = 401;
            const expectedMessageStatus = 'Must be admin';

            const response = await request(app)
                .get(endpoint)
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${userToken}`);

            assert.strictEqual(response.status, expectedStatus);
            assert.strictEqual(response.body.errors, expectedMessageStatus);
        });

        it('Should return users with a valid admin token', async () => {
            const expectedStatus = 200;

            const response = await request(app)
                .get(endpoint)
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${adminToken}`);

            assert.strictEqual(response.status, expectedStatus);
            assert.ok('users' in response.body);
        });
    });

    describe('/:id', () => {
        describe('POST', () => {
            it('Should return status 401 unauthorized without a token', async () => {
                const expectedStatus = 401;
                const expectedMessageStatus = 'Token not found';

                const response = await request(app)
                    .post(endpoint)
                    .set("Accept", "application/json")
                    .send({
                        id: testUserId,
                        firstName: 'PROBE',
                        lastName: 'PROBE',
                        email: 'probe@gmail.com',
                        password: 'probeasd123',
                        role: 'user'
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return status 401 unauthorized with a user token', async () => {
                const expectedStatus = 401;
                const expectedMessageStatus = 'Must be admin';
    
                const response = await request(app)
                    .post(endpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${userToken}`)
                    .send({
                        id: testUserId,
                        firstName: 'PROBE',
                        lastName: 'PROBE',
                        email: 'probe@gmail.com',
                        password: 'probeasd123',
                        role: 'user'
                    });
    
                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return 201 created with a valid admin token', async () => {
                const expectedStatus = 201;
                const expectedMessageStatus = 'The User has been created successfully';

                const response = await request(app)
                    .post(endpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({
                        id: testUserId,
                        firstName: 'PROBE',
                        lastName: 'PROBE',
                        email: 'probe@gmail.com',
                        password: 'probeasd123',
                        role: 'user'
                    });
                
                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.message, expectedMessageStatus);
            });

            it('Should return 400 is required with incompleted fields but with an admin token', async () => {
                const expectedStatus = 400;
                const expectedMessageStatus = [ 'Email is required', 'Password is required' ];

                const response = await request(app)
                    .post(endpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({
                        firstName: 'PROBE',
                        lastName: 'PROBE',
                        role: 'user'
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.deepStrictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return 400 invalid role with an invalid role but with an admin token', async () => {
                const expectedStatus = 400;
                const expectedMessageStatus = [ 'Invalid role' ];
                const invalidRole = 'invalidRole';

                const response = await request(app)
                    .post(endpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({
                        firstName: 'PROBE',
                        lastName: 'PROBE',
                        email: 'probe@gmail.com',
                        password: 'probeasd123',
                        role: invalidRole
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.deepStrictEqual(response.body.errors, expectedMessageStatus);
            });
        });

        describe('GET', () => {
            it('Should return status 401 unauthorized without a token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 401;
                const expectedMessageStatus = 'Token not found';

                const response = await request(app)
                    .get(finalEndpoint)
                    .set("Accept", "application/json");

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return status 401 unauthorized with a user token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 401;
                const expectedMessageStatus = 'Must be admin';
    
                const response = await request(app)
                    .get(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${userToken}`);
    
                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return the user with a valid admin token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 200;

                const response = await request(app)
                    .get(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`);

                assert.strictEqual(response.status, expectedStatus);
                assert.ok('user' in response.body);
            });

            it('Should return 404 user not found with an invalid id', async () => {
                const finalEndpoint = `${endpoint}/${invalidUserId}`;
                const expectedStatus = 404;
                const expectedMessageStatus = 'User not found';

                const response = await request(app)
                    .get(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`);

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });
        });

        describe('PUT', () => {
            it('Should return status 401 unauthorized without a token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 401;
                const expectedMessageStatus = 'Token not found';

                const response = await request(app)
                    .put(finalEndpoint)
                    .set("Accept", "application/json")
                    .send({
                        firstName: 'Probeupdate',
                        lastName: 'Probeupdate',
                        email: 'probeupdate@gmail.com',
                        password: 'probeupdate123',
                        role: 'admin'
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return status 401 unauthorized with a user token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 401;
                const expectedMessageStatus = 'Must be admin';

                const response = await request(app)
                    .put(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${userToken}`)
                    .send({
                        firstName: 'Probeupdate',
                        lastName: 'Probeupdate',
                        email: 'probeupdate@gmail.com',
                        password: 'probeupdate123',
                        role: 'admin'
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should update the user with a valid admin token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 200;
                const expectedMessageStatus = 'The User has been updated successfully';

                const response = await request(app)
                    .put(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({
                        firstName: 'Probeupdate',
                        lastName: 'Probeupdate',
                        email: 'probeupdate@gmail.com',
                        password: 'probeupdate123',
                        role: 'admin'
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.message, expectedMessageStatus);
            });

            it('Should return 404 user not found with an invalid id but valid admin token', async () => {
                const finalEndpoint = `${endpoint}/${invalidUserId}`;
                const expectedStatus = 404;
                const expectedMessageStatus = 'User not found';

                const response = await request(app)
                    .put(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({
                        firstName: 'Probeupdate',
                        lastName: 'Probeupdate',
                        email: 'probeupdate@gmail.com',
                        password: 'probeupdate123',
                        role: 'admin'
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return 400 invalid role with an invalid role but with a valid admin token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 400;
                const expectedMessageStatus = [ 'Invalid role' ];
                const invalidRole = 'invalidRole';

                const response = await request(app)
                    .put(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({
                        firstName: 'Probeupdate',
                        lastName: 'Probeupdate',
                        email: 'probeupdate@gmail.com',
                        password: 'probeupdate123',
                        role: invalidRole
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.deepStrictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return ... with incompleted fields but with a valid admin token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 400;
                const expectedMessageStatus = [ 'Email is required', 'Password is required' ];

                const response = await request(app)
                    .put(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({
                        firstName: 'Probeupdate',
                        lastName: 'Probeupdate',
                        role: 'admin'
                    });

                assert.strictEqual(response.status, expectedStatus);
                assert.deepStrictEqual(response.body.errors, expectedMessageStatus);
            });
        });

        describe('DELETE', () => {
            it('Should return status 401 unauthorized without a token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 401;
                const expectedMessageStatus = 'Token not found';

                const response = await request(app)
                    .delete(finalEndpoint)
                    .set("Accept", "application/json");

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should return status 401 unauthorized with a user token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 401;
                const expectedMessageStatus = 'Must be admin';

                const response = await request(app)
                    .delete(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${userToken}`);

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });

            it('Should delete the user with a valid admin token', async () => {
                const finalEndpoint = `${endpoint}/${testUserId}`;
                const expectedStatus = 200;
                const expectedMessageStatus = 'the user was successfully deleted';

                const response = await request(app)
                    .delete(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`);

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.message, expectedMessageStatus);
            });

            it('Should return 404 user not found, id invalid with an invalid id', async () => {
                const finalEndpoint = `${endpoint}/${invalidUserId}`;
                const expectedStatus = 404;
                const expectedMessageStatus = 'user not found, id invalid';

                const response = await request(app)
                    .delete(finalEndpoint)
                    .set("Accept", "application/json")
                    .set("Authorization", `Bearer ${adminToken}`);

                assert.strictEqual(response.status, expectedStatus);
                assert.strictEqual(response.body.errors, expectedMessageStatus);
            });
        });
    });
});