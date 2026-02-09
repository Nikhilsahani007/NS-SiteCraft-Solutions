const mongoose = require('mongoose');
const Admin = require('../../../src/models/Admin');
const { USER_ROLES } = require('../../../src/utils/constants');

describe('Admin Model', () => {
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
        it('should create a valid admin', async () => {
            const validAdmin = {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
            };

            const admin = new Admin(validAdmin);
            const savedAdmin = await admin.save();

            expect(savedAdmin._id).toBeDefined();
            expect(savedAdmin.name).toBe(validAdmin.name);
            expect(savedAdmin.email).toBe(validAdmin.email);
            expect(savedAdmin.password).not.toBe(validAdmin.password); // Should be hashed
            expect(savedAdmin.role).toBe(USER_ROLES.ADMIN);
            expect(savedAdmin.isActive).toBe(true);
        });

        it('should fail without required name', async () => {
            const admin = new Admin({
                email: 'admin@example.com',
                password: 'password123',
            });

            let error;
            try {
                await admin.save();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
            expect(error.errors.name).toBeDefined();
        });

        it('should fail without required email', async () => {
            const admin = new Admin({
                name: 'Admin User',
                password: 'password123',
            });

            let error;
            try {
                await admin.save();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
            expect(error.errors.email).toBeDefined();
        });

        it('should fail with duplicate email', async () => {
            const admin1 = new Admin({
                name: 'Admin 1',
                email: 'duplicate@example.com',
                password: 'password123',
            });
            await admin1.save();

            const admin2 = new Admin({
                name: 'Admin 2',
                email: 'duplicate@example.com',
                password: 'password456',
            });

            let error;
            try {
                await admin2.save();
            } catch (e) {
                error = e;
            }

            expect(error).toBeDefined();
            expect(error.code).toBe(11000); // Duplicate key error
        });

        it('should convert email to lowercase', async () => {
            const admin = new Admin({
                name: 'Test Admin',
                email: 'TEST@EXAMPLE.COM',
                password: 'password123',
            });

            const savedAdmin = await admin.save();
            expect(savedAdmin.email).toBe('test@example.com');
        });
    });

    describe('Password Hashing', () => {
        it('should hash password before saving', async () => {
            const plainPassword = 'mySecurePassword123';
            const admin = new Admin({
                name: 'Test Admin',
                email: 'hash@example.com',
                password: plainPassword,
            });

            const savedAdmin = await admin.save();

            // Password should be hashed
            expect(savedAdmin.password).not.toBe(plainPassword);
            expect(savedAdmin.password).toMatch(/^\$2[aby]\$/); // bcrypt hash pattern
        });

        it('should not rehash password if not modified', async () => {
            const admin = new Admin({
                name: 'Test Admin',
                email: 'nohash@example.com',
                password: 'password123',
            });

            const savedAdmin = await admin.save();
            const originalHash = savedAdmin.password;

            // Update name only
            savedAdmin.name = 'Updated Name';
            await savedAdmin.save();

            expect(savedAdmin.password).toBe(originalHash);
        });
    });

    describe('Password Comparison', () => {
        it('should correctly compare valid password', async () => {
            const plainPassword = 'testPassword123';
            const admin = new Admin({
                name: 'Test Admin',
                email: 'compare@example.com',
                password: plainPassword,
            });

            const savedAdmin = await admin.save();

            // Need to fetch with password field (it's excluded by default)
            const adminWithPassword = await Admin.findById(savedAdmin._id).select('+password');
            const isMatch = await adminWithPassword.comparePassword(plainPassword);

            expect(isMatch).toBe(true);
        });

        it('should reject invalid password', async () => {
            const admin = new Admin({
                name: 'Test Admin',
                email: 'reject@example.com',
                password: 'correctPassword',
            });

            const savedAdmin = await admin.save();
            const adminWithPassword = await Admin.findById(savedAdmin._id).select('+password');
            const isMatch = await adminWithPassword.comparePassword('wrongPassword');

            expect(isMatch).toBe(false);
        });
    });

    describe('JWT Token Generation', () => {
        it('should generate valid JWT token', () => {
            const admin = new Admin({
                name: 'Test Admin',
                email: 'jwt@example.com',
                password: 'password123',
                _id: new mongoose.Types.ObjectId(),
            });

            const token = admin.generateAuthToken();

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
        });

        it('should include admin data in token payload', () => {
            const jwt = require('jsonwebtoken');
            const admin = new Admin({
                name: 'Test Admin',
                email: 'payload@example.com',
                password: 'password123',
                _id: new mongoose.Types.ObjectId(),
            });

            const token = admin.generateAuthToken();
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            expect(decoded.id).toBe(admin._id.toString());
            expect(decoded.email).toBe(admin.email);
            expect(decoded.role).toBe(admin.role);
        });
    });

    describe('Last Login Update', () => {
        it('should update lastLogin timestamp', async () => {
            const admin = new Admin({
                name: 'Test Admin',
                email: 'lastlogin@example.com',
                password: 'password123',
            });

            const savedAdmin = await admin.save();
            expect(savedAdmin.lastLogin).toBeUndefined();

            await savedAdmin.updateLastLogin();
            const updatedAdmin = await Admin.findById(savedAdmin._id);

            expect(updatedAdmin.lastLogin).toBeDefined();
            expect(updatedAdmin.lastLogin).toBeInstanceOf(Date);
        });
    });

    describe('Default Values', () => {
        it('should set default role to ADMIN', async () => {
            const admin = new Admin({
                name: 'Test Admin',
                email: 'defaultrole@example.com',
                password: 'password123',
            });

            const savedAdmin = await admin.save();
            expect(savedAdmin.role).toBe(USER_ROLES.ADMIN);
        });

        it('should set default isActive to true', async () => {
            const admin = new Admin({
                name: 'Test Admin',
                email: 'defaultactive@example.com',
                password: 'password123',
            });

            const savedAdmin = await admin.save();
            expect(savedAdmin.isActive).toBe(true);
        });
    });
});
