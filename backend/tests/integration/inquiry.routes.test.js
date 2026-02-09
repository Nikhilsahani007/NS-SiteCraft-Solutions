const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/app');
const Inquiry = require('../../../src/models/Inquiry');
const Admin = require('../../../src/models/Admin');

describe('Inquiry Routes', () => {
    let authToken;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/ns-sitecraft-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Create admin and get token
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

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/v1/inquiries', () => {
        it('should create a new inquiry (public route)', async () => {
            const inquiryData = {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                message: 'I need a website for my business',
            };

            const res = await request(app)
                .post('/api/v1/inquiries')
                .send(inquiryData);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe(inquiryData.name);
            expect(res.body.data.email).toBe(inquiryData.email);
        });

        it('should fail with invalid email', async () => {
            const res = await request(app)
                .post('/api/v1/inquiries')
                .send({
                    name: 'Test User',
                    email: 'invalid-email',
                    message: 'Test message for inquiry',
                });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('should fail with missing required fields', async () => {
            const res = await request(app)
                .post('/api/v1/inquiries')
                .send({
                    name: 'Test User',
                });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    describe('GET /api/v1/inquiries', () => {
        beforeEach(async () => {
            // Create test inquiries
            await Inquiry.create([
                {
                    name: 'User 1',
                    email: 'user1@example.com',
                    message: 'Test message 1 for inquiry',
                },
                {
                    name: 'User 2',
                    email: 'user2@example.com',
                    message: 'Test message 2 for inquiry',
                },
            ]);
        });

        it('should get all inquiries (admin only)', async () => {
            const res = await request(app)
                .get('/api/v1/inquiries')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.inquiries).toBeInstanceOf(Array);
            expect(res.body.data.inquiries.length).toBeGreaterThan(0);
        });

        it('should fail without authentication', async () => {
            const res = await request(app)
                .get('/api/v1/inquiries');

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should support pagination', async () => {
            const res = await request(app)
                .get('/api/v1/inquiries?page=1&limit=1')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(200);
            expect(res.body.data.inquiries.length).toBe(1);
            expect(res.body.data.pagination).toBeDefined();
        });
    });

    describe('GET /api/v1/inquiries/:id', () => {
        let inquiryId;

        beforeEach(async () => {
            const inquiry = await Inquiry.create({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Test message for inquiry',
            });
            inquiryId = inquiry._id;
        });

        it('should get inquiry by ID (admin only)', async () => {
            const res = await request(app)
                .get(`/api/v1/inquiries/${inquiryId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data._id).toBe(inquiryId.toString());
        });

        it('should fail with invalid ID', async () => {
            const res = await request(app)
                .get('/api/v1/inquiries/invalid-id')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('should fail without authentication', async () => {
            const res = await request(app)
                .get(`/api/v1/inquiries/${inquiryId}`);

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });

    describe('PUT /api/v1/inquiries/:id', () => {
        let inquiryId;

        beforeEach(async () => {
            const inquiry = await Inquiry.create({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Test message for inquiry',
            });
            inquiryId = inquiry._id;
        });

        it('should update inquiry status (admin only)', async () => {
            const res = await request(app)
                .put(`/api/v1/inquiries/${inquiryId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status: 'contacted',
                    adminNotes: 'Called and discussed requirements',
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.status).toBe('contacted');
            expect(res.body.data.adminNotes).toBe('Called and discussed requirements');
        });

        it('should fail without authentication', async () => {
            const res = await request(app)
                .put(`/api/v1/inquiries/${inquiryId}`)
                .send({
                    status: 'contacted',
                });

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });

    describe('DELETE /api/v1/inquiries/:id', () => {
        let inquiryId;

        beforeEach(async () => {
            const inquiry = await Inquiry.create({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Test message for inquiry',
            });
            inquiryId = inquiry._id;
        });

        it('should delete inquiry (admin only)', async () => {
            const res = await request(app)
                .delete(`/api/v1/inquiries/${inquiryId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);

            // Verify deletion
            const inquiry = await Inquiry.findById(inquiryId);
            expect(inquiry).toBeNull();
        });

        it('should fail without authentication', async () => {
            const res = await request(app)
                .delete(`/api/v1/inquiries/${inquiryId}`);

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });
});
