# API Testing Guide - NS SiteCraft Solutions Backend

Quick reference for testing all API endpoints manually.

## Base URL
```
http://localhost:5000/api
```

---

## 1. Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "NS SiteCraft API is running",
  "timestamp": "2026-02-01T...",
  "environment": "development"
}
```

---

## 2. Create Admin User

```bash
node scripts/createAdmin.js
```

**Follow prompts:**
- Name: Admin User
- Email: admin@nssitecraft.com
- Password: admin123

---

## 3. Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@nssitecraft.com",
    "password": "admin123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the token for protected routes!**

---

## 4. Submit Inquiry (Public)

```bash
curl -X POST http://localhost:5000/api/v1/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "message": "I need a website for my business. Please contact me.",
    "sourcePage": "contact"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 5. Get All Inquiries (Protected)

```bash
curl -X GET "http://localhost:5000/api/v1/inquiries?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Inquiries retrieved successfully",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

---

## 6. Get Inquiry Statistics (Protected)

```bash
curl -X GET http://localhost:5000/api/v1/inquiries/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "total": 1,
    "byStatus": {
      "new": 1
    }
  }
}
```

---

## 7. Update Inquiry Status (Protected)

```bash
curl -X PUT http://localhost:5000/api/v1/inquiries/INQUIRY_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "adminNotes": "Called and discussed requirements"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Inquiry updated successfully",
  "data": { ... }
}
```

---

## 8. Get Current Admin (Protected)

```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 9. Get All Content (Public)

```bash
curl http://localhost:5000/api/v1/content
```

---

## 10. Update Content (Protected)

```bash
curl -X PUT http://localhost:5000/api/v1/content/footer_cta \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "value": "Ready to build something amazing? Let'\''s talk."
  }'
```

---

## 11. Get Visible Pricing (Public)

```bash
curl http://localhost:5000/api/v1/pricing
```

---

## 12. Create Pricing Package (Protected)

```bash
curl -X POST http://localhost:5000/api/v1/pricing \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Basic Package",
    "priceRange": "Starting from ₹25,000",
    "description": "Perfect for small businesses",
    "features": [
      "5-page website",
      "Responsive design",
      "Contact form",
      "Basic SEO"
    ],
    "isVisible": true,
    "displayOrder": 1
  }'
```

---

## Testing Validation Errors

### Missing Required Field
```bash
curl -X POST http://localhost:5000/api/v1/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com"
  }'
```

**Expected:** 400 Bad Request with validation errors

### Invalid Email
```bash
curl -X POST http://localhost:5000/api/v1/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "message": "Test message"
  }'
```

**Expected:** 400 Bad Request

---

## Testing Rate Limiting

### Spam Inquiry Endpoint
Run this 101 times quickly:
```bash
for i in {1..101}; do
  curl -X POST http://localhost:5000/api/v1/inquiries \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","message":"Test message"}' &
done
```

**Expected:** 429 Too Many Requests after 100 requests

---

## Testing Authentication

### Access Protected Route Without Token
```bash
curl -X GET http://localhost:5000/api/v1/inquiries
```

**Expected:** 401 Unauthorized

### Access Protected Route With Invalid Token
```bash
curl -X GET http://localhost:5000/api/v1/inquiries \
  -H "Authorization: Bearer invalid-token"
```

**Expected:** 401 Unauthorized

---

## Using Postman

### Import Collection

1. Create new collection: "NS SiteCraft API"
2. Set base URL variable: `{{baseUrl}}` = `http://localhost:5000/api`
3. Set token variable: `{{token}}` = (from login response)

### Collection Structure

```
NS SiteCraft API/
├── Health
│   └── GET /health
├── Auth
│   ├── POST /v1/auth/login
│   ├── GET /v1/auth/me
│   └── POST /v1/auth/logout
├── Inquiries
│   ├── POST /v1/inquiries (Public)
│   ├── GET /v1/inquiries (Protected)
│   ├── GET /v1/inquiries/:id
│   ├── PUT /v1/inquiries/:id
│   ├── DELETE /v1/inquiries/:id
│   └── GET /v1/inquiries/stats
├── Content
│   ├── GET /v1/content
│   ├── GET /v1/content/:key
│   ├── PUT /v1/content/:key
│   └── DELETE /v1/content/:key
└── Pricing
    ├── GET /v1/pricing
    ├── GET /v1/pricing/all
    ├── POST /v1/pricing
    ├── PUT /v1/pricing/:id
    ├── PATCH /v1/pricing/:id/toggle
    └── DELETE /v1/pricing/:id
```

---

## Quick Test Sequence

1. ✅ Health check
2. ✅ Create admin (script)
3. ✅ Login (save token)
4. ✅ Submit inquiry (public)
5. ✅ Get inquiries (protected)
6. ✅ Update inquiry status
7. ✅ Get stats
8. ✅ Test validation errors
9. ✅ Test rate limiting
10. ✅ Test auth errors

---

## Expected Logs

Check `logs/combined.log` for:
- Server start
- MongoDB connection
- API requests
- Errors (if any)

Check `logs/error.log` for:
- Error details
- Stack traces

---

## Common Issues

### MongoDB Connection Failed
- Check if MongoDB is running
- Verify MONGO_URI in .env

### Email Not Sending
- Email is optional in development
- Check SMTP configuration if needed

### JWT Errors
- Ensure JWT_SECRET is set in .env
- Check token format: `Bearer {token}`

---

## Success Criteria

✅ All endpoints respond correctly
✅ Validation works
✅ Authentication works
✅ Rate limiting works
✅ Logs are created
✅ No errors in console

---

**Ready to test? Start with the health check!**
