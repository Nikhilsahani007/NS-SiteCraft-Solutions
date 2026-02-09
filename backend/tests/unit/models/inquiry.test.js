const mongoose = require('mongoose');
const Inquiry = require('../../../src/models/Inquiry');
const { INQUIRY_STATUS, SOURCE_PAGES } = require('../../../src/utils/constants');

describe('Inquiry Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/ns-sitecraft-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Schema Validation', () => {
        it('should create a valid inquiry', async () => {
            const validInquiry = {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                message: 'I need a website for my business',
            };

            const inquiry = new Inquiry(validInquiry);
            const savedInquiry = await inquiry.save();

            expect(savedInquiry._id).toBeDefined();
            expect(savedInquiry.name).toBe(validInquiry.name);
            expect(savedInquiry.email).toBe(validInquiry.email);
            expect(savedInquiry.status).toBe(INQUIRY_STATUS.NEW);
            expect(savedInquiry.sourcePage).toBe(SOURCE_PAGES.CONTACT);
        });

        it('should fail without required name', async () => {
            const inquiry = new Inquiry({
                email: 'test@example.com',
                message: 'Test message',
            });

            let error;
            try {
                await inquiry.save();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
            expect(error.errors.name).toBeDefined();
        });

        it('should fail without required email', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                message: 'Test message',
            });

            let error;
            try {
                await inquiry.save();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
            expect(error.errors.email).toBeDefined();
        });

        it('should fail with invalid email format', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                email: 'invalid-email',
                message: 'Test message',
            });

            let error;
            try {
                await inquiry.save();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
            expect(error.errors.email).toBeDefined();
        });

        it('should fail with invalid phone format', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                email: 'test@example.com',
                phone: '123', // Too short
                message: 'Test message',
            });

            let error;
            try {
                await inquiry.save();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
            expect(error.errors.phone).toBeDefined();
        });

        it('should fail with message too short', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Short', // Less than 10 characters
            });

            let error;
            try {
                await inquiry.save();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
            expect(error.errors.message).toBeDefined();
        });

        it('should convert email to lowercase', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                email: 'TEST@EXAMPLE.COM',
                message: 'Test message for inquiry',
            });

            const savedInquiry = await inquiry.save();
            expect(savedInquiry.email).toBe('test@example.com');
        });

        it('should trim whitespace from fields', async () => {
            const inquiry = new Inquiry({
                name: '  John Doe  ',
                email: '  john@example.com  ',
                message: '  Test message for inquiry  ',
            });

            const savedInquiry = await inquiry.save();
            expect(savedInquiry.name).toBe('John Doe');
            expect(savedInquiry.email).toBe('john@example.com');
            expect(savedInquiry.message).toBe('Test message for inquiry');
        });
    });

    describe('Default Values', () => {
        it('should set default status to NEW', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Test message for inquiry',
            });

            const savedInquiry = await inquiry.save();
            expect(savedInquiry.status).toBe(INQUIRY_STATUS.NEW);
        });

        it('should set default sourcePage to CONTACT', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Test message for inquiry',
            });

            const savedInquiry = await inquiry.save();
            expect(savedInquiry.sourcePage).toBe(SOURCE_PAGES.CONTACT);
        });
    });

    describe('Timestamps', () => {
        it('should add createdAt and updatedAt timestamps', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Test message for inquiry',
            });

            const savedInquiry = await inquiry.save();
            expect(savedInquiry.createdAt).toBeDefined();
            expect(savedInquiry.updatedAt).toBeDefined();
        });
    });

    describe('Virtual Fields', () => {
        it('should format date correctly', async () => {
            const inquiry = new Inquiry({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Test message for inquiry',
            });

            const savedInquiry = await inquiry.save();
            expect(savedInquiry.formattedDate).toBeDefined();
            expect(typeof savedInquiry.formattedDate).toBe('string');
        });
    });
});
