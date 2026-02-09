/**
 * Setup Script - Create Initial Admin User
 * Run this script once to create the first admin account
 * 
 * Usage: node scripts/createAdmin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const Admin = require('../src/models/Admin');
const logger = require('../src/config/logger');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdmin = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            console.log('\n⚠️  An admin user already exists!');
            console.log(`Email: ${existingAdmin.email}`);
            console.log(`Name: ${existingAdmin.name}`);

            const overwrite = await question('\nDo you want to create another admin? (yes/no): ');
            if (overwrite.toLowerCase() !== 'yes' && overwrite.toLowerCase() !== 'y') {
                console.log('Setup cancelled.');
                process.exit(0);
            }
        }

        console.log('\n📝 Create Admin User\n');

        // Get admin details
        const name = await question('Admin Name: ');
        const email = await question('Admin Email: ');
        const password = await question('Admin Password (min 6 characters): ');

        // Validate input
        if (!name || !email || !password) {
            console.error('❌ All fields are required!');
            process.exit(1);
        }

        if (password.length < 6) {
            console.error('❌ Password must be at least 6 characters!');
            process.exit(1);
        }

        // Create admin
        const admin = await Admin.create({
            name,
            email,
            password,
            role: 'admin',
        });

        console.log('\n✅ Admin user created successfully!');
        console.log(`\nName: ${admin.name}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Role: ${admin.role}`);
        console.log(`\nYou can now login with these credentials.`);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error creating admin:', error.message);
        if (error.code === 11000) {
            console.error('This email is already registered.');
        }
        process.exit(1);
    }
};

// Run the script
createAdmin();
