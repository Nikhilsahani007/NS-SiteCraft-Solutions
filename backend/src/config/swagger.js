const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NS SiteCraft Solutions API',
            version: '1.0.0',
            description: 'RESTful API for NS SiteCraft Solutions - A professional web development agency platform',
            contact: {
                name: 'NS SiteCraft Solutions',
                email: 'contact@nssitecraft.com',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
            {
                url: process.env.BACKEND_URL || 'https://api.nssitecraft.com',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token obtained from /api/v1/auth/login',
                },
            },
            schemas: {
                Inquiry: {
                    type: 'object',
                    required: ['name', 'email', 'message'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier',
                        },
                        name: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 100,
                            description: 'Client name',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Client email address',
                        },
                        phone: {
                            type: 'string',
                            pattern: '^[0-9]{10,15}$',
                            description: 'Client phone number (10-15 digits)',
                        },
                        message: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 1000,
                            description: 'Inquiry message',
                        },
                        sourcePage: {
                            type: 'string',
                            enum: ['contact', 'home', 'services', 'pricing'],
                            description: 'Page where inquiry was submitted',
                        },
                        status: {
                            type: 'string',
                            enum: ['new', 'contacted', 'in-progress', 'converted', 'closed'],
                            description: 'Inquiry status',
                        },
                        adminNotes: {
                            type: 'string',
                            maxLength: 500,
                            description: 'Internal admin notes',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                        },
                    },
                },
                Admin: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier',
                        },
                        name: {
                            type: 'string',
                            description: 'Admin name',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Admin email address',
                        },
                        role: {
                            type: 'string',
                            enum: ['admin', 'super-admin'],
                            description: 'Admin role',
                        },
                        isActive: {
                            type: 'boolean',
                            description: 'Account active status',
                        },
                        lastLogin: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last login timestamp',
                        },
                    },
                },
                Content: {
                    type: 'object',
                    required: ['key', 'value'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier',
                        },
                        key: {
                            type: 'string',
                            description: 'Content key (e.g., "homepage_hero_title")',
                        },
                        value: {
                            type: 'object',
                            description: 'Content value (flexible structure)',
                        },
                        description: {
                            type: 'string',
                            description: 'Content description for admin reference',
                        },
                    },
                },
                Pricing: {
                    type: 'object',
                    required: ['name', 'price', 'features'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier',
                        },
                        name: {
                            type: 'string',
                            description: 'Plan name (e.g., "Basic", "Pro")',
                        },
                        price: {
                            type: 'number',
                            description: 'Plan price',
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency code (e.g., "USD", "INR")',
                        },
                        features: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'List of plan features',
                        },
                        isPopular: {
                            type: 'boolean',
                            description: 'Highlight as popular plan',
                        },
                        isActive: {
                            type: 'boolean',
                            description: 'Plan active status',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            description: 'Error message',
                        },
                        error: {
                            type: 'string',
                            description: 'Error details (development only)',
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: 'Health',
                description: 'Health check and system status endpoints',
            },
            {
                name: 'Auth',
                description: 'Authentication and authorization',
            },
            {
                name: 'Inquiries',
                description: 'Client inquiry management',
            },
            {
                name: 'Content',
                description: 'Dynamic content management',
            },
            {
                name: 'Pricing',
                description: 'Pricing plan management',
            },
        ],
    },
    apis: ['./src/routes/**/*.js', './src/controllers/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
