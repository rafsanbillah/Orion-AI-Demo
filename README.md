# MERN Industry Lead Capture MVP

A beginner-friendly 1-day MVP portfolio project built with the MERN stack.

This app shows how a small business website can collect customer leads, prepare WhatsApp follow-up messages, save leads to MongoDB, and let an admin manage those leads from a simple dashboard.

## Features

- Three demo industry websites: clinic, real estate, and home services
- Reusable industry configs for services, FAQs, lead fields, and WhatsApp copy
- Contact form that saves lead requests to the backend
- Simple chatbot-style lead collection flow
- WhatsApp message link generation
- Admin login with JWT authentication
- Protected admin dashboard
- Lead status and notes updates
- CSV export for saved leads
- MongoDB health status endpoint
- Responsive React UI with Tailwind CSS

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- Lucide React icons
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token authentication

## Folder Structure

```text
client/
  public/
  src/
    components/
    configs/
    pages/
    utils/
    App.jsx
    main.jsx
  .env.example
  package.json
  vite.config.js

server/
  controllers/
  middleware/
  models/
  routes/
  services/
  .env.example
  package.json
  server.js
```

## Environment Variables

Create `server/.env` from `server/.env.example`:

```text
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/mern_mvp
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your_secret
```

Create `client/.env` from `client/.env.example`:

```text
VITE_API_URL=http://localhost:5000/api
```

Use a stronger `JWT_SECRET` before deploying this project.

## Install Instructions

Install server dependencies:

```bash
cd server
npm install
copy .env.example .env
```

Install client dependencies:

```bash
cd client
npm install
copy .env.example .env
```

If PowerShell blocks `npm`, use `npm.cmd` instead.

## Run Instructions

Start MongoDB locally, or use a hosted MongoDB connection string in `server/.env`.

Start the backend:

```bash
cd server
npm.cmd run dev
```

The API runs at:

```text
http://localhost:5000
```

Start the frontend in another terminal:

```bash
cd client
npm.cmd run dev
```

The React app runs at:

```text
http://localhost:5173
```

Health check:

```text
GET http://localhost:5000/api/health
```

## Free Deployment Plan

Recommended free setup:

- MongoDB Atlas free cluster for the database
- Render free web service for the full app demo URL
- Optional Vercel free project if you prefer to host the React frontend separately

Your locally installed MongoDB is great for development, but a deployed backend cannot safely connect to a database running on your laptop. For the live portfolio demo, use MongoDB Atlas and put the Atlas connection string in Render as `MONGO_URI`.

## MongoDB Atlas Setup

1. Go to MongoDB Atlas and create a free `M0` cluster.
2. Create a database user with a username and password.
3. In Network Access, allow access for your deployment. For a beginner portfolio demo, you can use `0.0.0.0/0`. For production, restrict this.
4. Copy the Node.js connection string.
5. Replace `<password>` with your database user password.
6. Use a database name at the end of the URI, for example:

```text
mongodb+srv://USERNAME:PASSWORD@cluster-url.mongodb.net/orion_ai_demo?retryWrites=true&w=majority
```

## Deploy Full Demo on Render

1. Push this repo to GitHub.
2. Go to Render and create a new Web Service from the GitHub repo.
3. Use these settings:

```text
Name: orion-ai-demo
Build Command: npm install --prefix server && npm install --prefix client && npm run build --prefix client
Start Command: npm start --prefix server
```

4. Add these Render environment variables:

```text
NODE_ENV=production
CLIENT_URL=https://orion-ai-demo.onrender.com
MONGO_URI=your_mongodb_atlas_connection_string
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=a_long_random_secret
```

5. Deploy the service.
6. Open the Render URL and test:

```text
https://your-render-app.onrender.com/api/health
```

The `database` value should say `connected`.

The free demo domain will be Render's generated URL. If the service name is available, it will look like:

```text
https://orion-ai-demo.onrender.com
```

## Optional: Deploy Frontend on Vercel

1. Go to Vercel and import the same GitHub repo.
2. Set the project root directory to:

```text
client
```

3. Use the default Vite settings:

```text
Build Command: npm run build
Output Directory: dist
```

4. Add this Vercel environment variable:

```text
VITE_API_URL=https://your-render-app.onrender.com/api
```

5. Deploy the frontend.
6. Copy the final Vercel URL.
7. Go back to Render and update `CLIENT_URL` to the Vercel URL:

```text
CLIENT_URL=https://your-vercel-app.vercel.app
```

You can also keep local development allowed by using a comma-separated value:

```text
CLIENT_URL=http://localhost:5173,https://your-vercel-app.vercel.app
```

8. Redeploy the Render backend after changing `CLIENT_URL`.

## Demo Routes

```text
/                 Home page
/clinic           Clinic demo website
/real-estate      Real estate demo website
/home-services    Home services demo website
```

## Dashboard Routes

```text
/dashboard/demo    Static demo dashboard
/login             Admin login
/dashboard/admin   Protected lead dashboard
```

Default demo admin credentials are set in `server/.env`:

```text
admin@example.com
admin123
```

## Test User Flow

1. Start MongoDB.
2. Start the server with `npm.cmd run dev` from the `server` folder.
3. Start the client with `npm.cmd run dev` from the `client` folder.
4. Open `http://localhost:5173/clinic`.
5. Fill out and submit the contact form.
6. Confirm a WhatsApp message appears.
7. Open the chat button and choose `Appointment / Quote`.
8. Answer the chatbot questions and confirm the lead is sent.
9. Go to `http://localhost:5173/login`.
10. Log in with the admin credentials from `server/.env`.
11. Open `http://localhost:5173/dashboard/admin`.
12. Check that saved leads appear.
13. Update a lead status or notes.
14. Click `Export CSV` and confirm the CSV download starts.

## Future Upgrade Ideas

- Real OpenAI integration for smarter chatbot replies
- WhatsApp Business API for automatic message sending
- Full CRM with pipelines, filters, and lead ownership
- Email/SMS follow-up automation
- Calendar booking for appointments and service visits
- Client-specific subdomains
- Payment integration

## Portfolio Note

This is intentionally scoped as a 1-day MVP portfolio project. It focuses on showing a complete idea end-to-end without overengineering the codebase.
