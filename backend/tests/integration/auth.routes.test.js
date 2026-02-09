const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/app');
const Admin = require('../../../src/models/Admin');

describe('Auth Routes', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/ns-sitecraft-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/v1/auth/login', () => {
        beforeEach(async () => {
            // Create test admin
            const admin = new Admin({
                name: 'Test Admin',
                email: 'admin@test.com',
                password: 'password123',
            });
            await admin.save();
        });

        it('should login with valid credentials', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'admin@test.com',
                    password: 'password123',
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.token).toBeDefined();
            expect(res.body.data.admin.email).toBe('admin@test.com');
            expect(res.body.data.admin.password).toBeUndefined(); // Password should not be returned
        });

        it('should fail with invalid email', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'wrong@test.com',
                    password: 'password123',
                });

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toContain('Invalid');
        });

        it('should fail with invalid password', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'admin@test.com',
                    password: 'wrongpassword',
                });

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should fail with missing credentials', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({});

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('should update lastLogin on successful login', async () => {
            await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'admin@test.com',
                    password: 'password123',
                });

            const admin = await Admin.findOne({ email: 'admin@test.com' });
            expect(admin.lastLogin).toBeDefined();
        });
    });

    describe('GET /api/v1/auth/me', () => {
        let authToken;

        beforeEach(async () => {
            // Create and login admin
            const admin = new Admin({
                name: 'Test Admin',
                email: 'admin@test.com',
                password: 'password123',
            });
            await admin.save();

            const loginRes = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'admin@test.com',
                    password: 'password123',
                });

            authToken = loginRes.body.data.token;
        });

        it('should get current admin with valid token', async () => {
            const res = await request(app)
                .get('/api/v1/auth/me')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.email).toBe('admin@test.com');
            expect(res.body.data.password).toBeUndefined();
        });

        it('should fail without token', async () => {
            const res = await request(app)
                .get('/api/v1/auth/me');

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should fail with invalid token', async () => {
            const res = await request(app)
                .get('/api/v1/auth/me')
                .set('Authorization', 'Bearer invalid-token');

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });
});
