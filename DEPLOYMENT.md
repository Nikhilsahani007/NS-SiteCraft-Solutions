# Deployment Guide - NS SiteCraft Solutions

This guide provides step-by-step instructions for deploying the NS SiteCraft Solutions platform to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] MongoDB Atlas account (or production MongoDB instance)
- [ ] Vercel/Netlify account (for frontend)
- [ ] Render/Railway/Heroku account (for backend)
- [ ] Domain name (optional)
- [ ] Sentry account for error tracking (optional but recommended)
- [ ] All environment variables documented
- [ ] Admin user credentials ready

---

## 🗄️ Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project named "NS SiteCraft"

### 1.2 Create Database Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (choose closest to your users)
4. Name your cluster (e.g., "ns-sitecraft-prod")
5. Click "Create"

### 1.3 Configure Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `nssitecraft-admin`
5. Generate a strong password (save it securely!)
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### 1.4 Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note:** For better security, add only your backend server's IP after deployment
4. Click "Confirm"

### 1.5 Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://nssitecraft-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before the `?`:
   ```
   mongodb+srv://nssitecraft-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ns-sitecraft-prod?retryWrites=true&w=majority
   ```

---

## 🚀 Step 2: Deploy Backend

### Option A: Deploy to Render (Recommended)

#### 2.1 Create Render Account

1. Go to [Render](https://render.com)
2. Sign up with GitHub

#### 2.2 Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `ns-sitecraft-api`
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

#### 2.3 Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://nssitecraft-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ns-sitecraft-prod?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-production-jwt-key-min-32-chars
JWT_EXPIRE=24h
FRONTEND_URL=https://your-frontend-domain.vercel.app
SENTRY_DSN=your-sentry-dsn-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Important:**
- Generate a strong `JWT_SECRET` (min 32 characters): `openssl rand -base64 32`
- Update `FRONTEND_URL` after deploying frontend
- SMTP settings are optional

#### 2.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Your backend will be available at: `https://ns-sitecraft-api.onrender.com`

#### 2.5 Verify Backend

Test health check:
```bash
curl https://ns-sitecraft-api.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "NS SiteCraft API is running",
  "timestamp": "2026-02-10T...",
  "environment": "production"
}
```

### Option B: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as Render)
6. Deploy

---

## 🌐 Step 3: Deploy Frontend

### Option A: Deploy to Vercel (Recommended)

#### 3.1 Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

#### 3.2 Import Project

1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### 3.3 Add Environment Variables

Click "Environment Variables" and add:

```env
VITE_API_URL=https://ns-sitecraft-api.onrender.com/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### 3.4 Deploy

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Your frontend will be available at: `https://your-project.vercel.app`

#### 3.5 Update Backend CORS

Go back to Render and update `FRONTEND_URL`:
```env
FRONTEND_URL=https://your-project.vercel.app
```

Redeploy backend for changes to take effect.

### Option B: Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select repository
4. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. Add environment variables
6. Deploy

---

## 👤 Step 4: Create Admin User

### 4.1 Connect to Production Database

Update your local `backend/.env` temporarily:
```env
MONGO_URI=mongodb+srv://nssitecraft-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ns-sitecraft-prod?retryWrites=true&w=majority
```

### 4.2 Run Admin Script

```bash
cd backend
node scripts/createAdmin.js
```

Follow prompts:
- **Name:** Your Name
- **Email:** admin@yourdomain.com
- **Password:** Strong password (min 6 chars)

### 4.3 Verify Admin Login

1. Go to your deployed frontend
2. Navigate to `/admin/login`
3. Login with admin credentials
4. Verify you can access admin dashboard

---

## ✅ Step 5: Post-Deployment Verification

### 5.1 Test All Endpoints

```bash
# Health check
curl https://your-backend.onrender.com/api/health

# Detailed health
curl https://your-backend.onrender.com/api/health/detailed

# API docs
open https://your-backend.onrender.com/api-docs
```

### 5.2 Test Frontend Features

- [ ] Homepage loads correctly
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Admin can view inquiries
- [ ] Theme toggle works (dark/light mode)
- [ ] All pages are responsive

### 5.3 Test Admin Features

- [ ] Login to admin panel
- [ ] View all inquiries
- [ ] Update inquiry status
- [ ] Add admin notes
- [ ] Delete inquiry
- [ ] Update content
- [ ] Manage pricing

### 5.4 Monitor Errors

1. Go to [Sentry Dashboard](https://sentry.io)
2. Check for any errors
3. Verify error tracking is working

---

## 🔧 Step 6: Optional Configurations

### 6.1 Custom Domain (Vercel)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for DNS propagation (up to 48 hours)

### 6.2 Custom Domain (Render)

1. Go to Render dashboard
2. Select your web service
3. Click "Settings" → "Custom Domain"
4. Add your domain
5. Update DNS records

### 6.3 SSL Certificate

Both Vercel and Render provide free SSL certificates automatically.

### 6.4 Email Notifications

If using SMTP for inquiry notifications:

1. Create Gmail App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
2. Update `SMTP_USER` and `SMTP_PASS` in backend env vars

---

## 📊 Step 7: Monitoring & Maintenance

### 7.1 Set Up Uptime Monitoring

Use [UptimeRobot](https://uptimerobot.com) (free):

1. Create account
2. Add monitor for: `https://your-backend.onrender.com/api/health`
3. Set alert email
4. Monitor interval: 5 minutes

### 7.2 Database Backups

MongoDB Atlas provides automatic backups on paid tiers. For free tier:

1. Manually export data periodically:
   ```bash
   mongodump --uri="mongodb+srv://..." --out=./backup
   ```

### 7.3 Log Monitoring

Check logs regularly:

**Render:**
- Dashboard → Your service → Logs

**Vercel:**
- Dashboard → Your project → Deployments → View Function Logs

---

## 🐛 Troubleshooting

### Issue: Backend not connecting to MongoDB

**Solution:**
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure password doesn't contain special characters (URL encode if needed)

### Issue: CORS errors on frontend

**Solution:**
- Verify `FRONTEND_URL` in backend matches exact frontend URL
- Include protocol (`https://`)
- No trailing slash

### Issue: Build fails on Vercel

**Solution:**
- Check build logs for specific error
- Verify all dependencies are in `package.json`
- Ensure `VITE_API_URL` is set in environment variables

### Issue: 502 Bad Gateway on Render

**Solution:**
- Check if backend is listening on correct PORT
- Verify `PORT` env var is set to `5000`
- Check backend logs for startup errors

### Issue: JWT token invalid

**Solution:**
- Ensure `JWT_SECRET` is same on all backend instances
- Check token expiration time
- Verify token is being sent in `Authorization: Bearer <token>` header

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Use `.gitignore`
2. **Use strong JWT secret** - Minimum 32 characters
3. **Enable 2FA** on all deployment platforms
4. **Restrict MongoDB IP access** to backend server IP only
5. **Use HTTPS** for all production URLs
6. **Rotate secrets** periodically
7. **Monitor Sentry** for security issues
8. **Keep dependencies updated** - Run `npm audit` regularly

---

## 📈 Scaling Considerations

### When to Upgrade

- **Free tier limits reached** (Render: 750 hours/month)
- **Response times > 2 seconds**
- **Database size > 512MB** (MongoDB Atlas free tier)
- **Traffic > 100 requests/minute**

### Upgrade Path

1. **Render:** Upgrade to Starter ($7/month)
2. **MongoDB Atlas:** Upgrade to M2 ($9/month)
3. **Add Redis caching** for frequently accessed data
4. **Enable CDN** for static assets
5. **Implement load balancing** for multiple backend instances

---

## 📞 Support

If you encounter issues:

1. Check logs first (Render/Vercel dashboards)
2. Review this guide
3. Check [GitHub Issues](https://github.com/yourusername/ns-sitecraft-solutions/issues)
4. Contact support: contact@nssitecraft.com

---

**Deployment Complete! 🎉**

Your NS SiteCraft Solutions platform is now live and ready to accept client inquiries!
