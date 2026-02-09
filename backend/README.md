# Backend API - NS SiteCraft Solutions

RESTful API for NS SiteCraft Solutions platform built with Express.js, MongoDB, and JWT authentication.

---

## 🏗️ Architecture

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # MongoDB connection
│   │   ├── logger.js    # Winston logger
│   │   ├── sentry.js    # Error tracking
│   │   └── swagger.js   # API documentation
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   ├── rateLimiter.middleware.js
│   │   └── validate.middleware.js
│   ├── models/          # Mongoose schemas
│   │   ├── Admin.js
│   │   ├── Inquiry.js
│   │   ├── Content.js
│   │   └── Pricing.js
│   ├── routes/          # API routes
│   │   ├── index.js
│   │   └── v1/          # Version 1 routes
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── tests/               # Test suites
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
├── scripts/             # Utility scripts
├── logs/                # Log files (auto-generated)
├── .env                 # Environment variables
├── jest.config.js       # Test configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 6.0
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Running Locally

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server runs on [http://localhost:5000](http://localhost:5000)

---

## 📚 API Documentation

### Interactive Docs

Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for Swagger UI

### Health Checks

- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - System information
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe

### Authentication

All admin routes require JWT token in `Authorization: Bearer <token>` header.

**Login:**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "admin": {
      "_id": "...",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Specific Test Suites

```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage

Current coverage: **60%+**

Coverage reports are generated in `coverage/` directory.

---

## 🗄️ Database Models

### Admin

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'super-admin']),
  isActive: Boolean,
  lastLogin: Date
}
```

### Inquiry

```javascript
{
  name: String,
  email: String,
  phone: String,
  message: String,
  sourcePage: String (enum),
  status: String (enum),
  adminNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Content

```javascript
{
  key: String (unique),
  value: Object,
  description: String
}
```

### Pricing

```javascript
{
  name: String,
  price: Number,
  currency: String,
  features: [String],
  isPopular: Boolean,
  isActive: Boolean
}
```

---

## 🔐 Security Features

- ✅ **Helmet** - Security HTTP headers
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Rate Limiting** - Prevent brute force attacks
- ✅ **NoSQL Injection Prevention** - Input sanitization
- ✅ **XSS Protection** - Cross-site scripting prevention
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcrypt with 12 rounds
- ✅ **Input Validation** - Joi schemas

---

## 📊 Monitoring

### Logging

Winston logger with multiple transports:
- Console (development)
- File rotation (production)
- Error logs: `logs/error.log`
- Combined logs: `logs/combined.log`

### Error Tracking

Sentry integration for production error monitoring:
- Automatic error capture
- Performance monitoring
- Request tracing

### Health Checks

Kubernetes-ready health endpoints:
- `/api/health/ready` - Database connection check
- `/api/health/live` - Application liveness

---

## 🔧 Environment Variables

See `.env.example` for all available configuration options.

**Required:**
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT (min 32 chars)
- `FRONTEND_URL` - Frontend URL for CORS

**Optional:**
- `SENTRY_DSN` - Sentry error tracking
- `SMTP_*` - Email configuration
- `RATE_LIMIT_*` - Rate limiting settings

---

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run all tests |
| `npm run test:unit` | Run unit tests only |
| `npm run test:integration` | Run integration tests only |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:watch` | Run tests in watch mode |

---

## 🐳 Docker

### Build Image

```bash
docker build -t ns-sitecraft-api .
```

### Run Container

```bash
docker run -p 5000:5000 --env-file .env ns-sitecraft-api
```

### Docker Compose

```bash
# Start all services (API + MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

---

## 🚀 Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
- **Render:** [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
- **Railway:** [Deploy to Railway](https://railway.app/new)

---

## 🤝 Contributing

1. Create feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Update documentation
5. Submit pull request

---

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details

---

**Made with ❤️ by NS SiteCraft Solutions**
