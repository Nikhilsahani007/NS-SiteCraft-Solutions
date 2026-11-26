# NS SiteCraft Solutions

> **Professional Web Development Agency Platform** - A full-stack MERN application for managing client inquiries, content, and pricing.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D6.0-green.svg)

---

## ⚡ Run locally in 2 minutes (no database needed)

You need Node.js 18 or newer. Open two terminals in the project folder.

**Terminal 1, the API:**

```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev
```

With `MONGO_URI` left commented out, the API runs in local mode and saves every
enquiry to `backend/data/enquiries.jsonl`. Fill in the `SMTP_*` and `ADMIN_EMAIL`
values in `backend/.env` to also get each enquiry by email.

**Terminal 2, the website:**

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. The enquiry forms on the homepage and the contact page
post to the local API through Vite's proxy (`frontend/.env.development`).
Production builds keep using EmailJS until the API is deployed.

To check a production build: `cd frontend && npm run build && npm run preview`.

The full setup with MongoDB and admin routes is below.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Frontend
- ✅ Modern React + Vite application
- ✅ Dark/Light theme support with CSS variables
- ✅ Responsive design with mobile-first approach
- ✅ Framer Motion animations
- ✅ Component-based design system
- ✅ SEO optimized with meta tags
- ✅ Google Analytics integration
- ✅ EmailJS contact form

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Rate limiting & security middleware
- ✅ Error tracking with Sentry
- ✅ Comprehensive test suite (Jest + Supertest)
- ✅ API documentation with Swagger
- ✅ Health check endpoints
- ✅ Winston logging

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** CSS Modules + Styled Components
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Email:** EmailJS

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Security:** Helmet, CORS, XSS-Clean, Express-Mongo-Sanitize
- **Logging:** Winston
- **Testing:** Jest + Supertest
- **Monitoring:** Sentry
- **Documentation:** Swagger/OpenAPI

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **MongoDB** >= 6.0 ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ns-sitecraft-solutions.git
cd ns-sitecraft-solutions
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/ns-sitecraft

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=24h

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email (Optional - for inquiry notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Sentry (Optional - for error tracking)
SENTRY_DSN=your-sentry-dsn

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 4. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - update MONGO_URI in backend/.env
```

### 5. Create Admin User

```bash
cd backend
node scripts/createAdmin.js
```

Follow the prompts to create your first admin user.

### 6. Run the Application

#### Development Mode (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on [http://localhost:5000](http://localhost:5000)

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on [http://localhost:5173](http://localhost:5173)

#### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves frontend build)
cd ../backend
npm start
```

---

## 📁 Project Structure

```
ns-sitecraft-solutions/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files (DB, logger, Sentry, Swagger)
│   │   ├── controllers/     # Route controllers
│   │   ├── middlewares/     # Custom middleware (auth, error handling, validation)
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic layer
│   │   └── utils/           # Utility functions
│   ├── tests/               # Test files
│   │   ├── unit/            # Unit tests
│   │   └── integration/     # Integration tests
│   ├── logs/                # Log files (auto-generated)
│   ├── scripts/             # Utility scripts
│   ├── .env                 # Environment variables
│   ├── jest.config.js       # Jest configuration
│   └── package.json
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── design-system/   # Design tokens, hooks, utilities
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Root component
│   │   ├── index.css        # Global styles & CSS variables
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
├── DEPLOYMENT.md            # Deployment guide
├── README.md                # This file
└── .gitignore
```

---

## 🔐 Environment Variables

### Backend

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT | Yes | - |
| `JWT_EXPIRE` | JWT expiration time | No | 24h |
| `FRONTEND_URL` | Frontend URL for CORS | Yes | - |
| `SENTRY_DSN` | Sentry error tracking DSN | No | - |
| `SMTP_HOST` | Email server host | No | - |
| `SMTP_PORT` | Email server port | No | 587 |
| `SMTP_USER` | Email username | No | - |
| `SMTP_PASS` | Email password | No | - |

### Frontend

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | No |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | No |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | No |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics ID | No |

---

## 📚 API Documentation

### Interactive Documentation

Once the backend is running, visit:
- **Swagger UI:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **OpenAPI Spec:** [http://localhost:5000/api-docs.json](http://localhost:5000/api-docs.json)

### Health Checks

| Endpoint | Description | Auth Required |
|----------|-------------|---------------|
| `GET /api/health` | Basic health check | No |
| `GET /api/health/detailed` | Detailed system info | No |
| `GET /api/health/ready` | Readiness probe | No |
| `GET /api/health/live` | Liveness probe | No |

### Authentication

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/v1/auth/login` | POST | Admin login | No |
| `/api/v1/auth/me` | GET | Get current admin | Yes |

### Inquiries

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/v1/inquiries` | POST | Create inquiry | No |
| `/api/v1/inquiries` | GET | List all inquiries | Yes |
| `/api/v1/inquiries/:id` | GET | Get inquiry by ID | Yes |
| `/api/v1/inquiries/:id` | PUT | Update inquiry | Yes |
| `/api/v1/inquiries/:id` | DELETE | Delete inquiry | Yes |

### Content & Pricing

See [Swagger documentation](http://localhost:5000/api-docs) for complete API reference.

---

## 🧪 Testing

### Run All Tests

```bash
cd backend
npm test
```

### Run Unit Tests Only

```bash
npm run test:unit
```

### Run Integration Tests Only

```bash
npm run test:integration
```

### Generate Coverage Report

```bash
npm run test:coverage
```

Coverage reports are generated in `backend/coverage/` directory.

### Test Requirements

- MongoDB must be running locally on default port (27017)
- Tests use a separate test database (`ns-sitecraft-test`)
- All tests run in isolation with database cleanup

---

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- MongoDB Atlas setup
- Backend deployment (Render/Railway/Heroku)
- Frontend deployment (Vercel/Netlify)
- Environment configuration
- Post-deployment verification
- Troubleshooting

### Quick Deployment Links

- **Frontend (Vercel):** [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
- **Backend (Render):** [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**NS SiteCraft Solutions**

- Website: [https://nssitecraft.com](https://nssitecraft.com)
- Email: contact@nssitecraft.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB team
- All open-source contributors

---

## 📞 Support

For support, email contact@nssitecraft.com or open an issue on GitHub.

---

**Made with ❤️ by NS SiteCraft Solutions**
