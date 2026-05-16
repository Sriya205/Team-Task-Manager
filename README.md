# Team Task Manager (Full Stack)

A production-ready team task management application with JWT authentication, role-based access control, project and task CRUD, dashboard analytics, dark mode, filtering, pagination, and Railway-ready deployment.

## Features

- Signup, login, logout, persisted JWT sessions
- Strong register password validation and email validation
- Admin and Member role-based access on frontend routes and backend APIs
- Admin project and task management
- Member assigned task view and task status updates
- Search tasks, filter by status and priority, pagination
- Dashboard metrics, charts, and recent activity
- Responsive sidebar dashboard UI with dark mode
- Toast notifications, loading states, empty states, and confirmation dialogs
- PostgreSQL database with Prisma ORM and seed data

## Tech Stack

Frontend: React, Vite, React Router, Tailwind CSS, Axios, Context API, React Toastify, Chart.js  
Backend: Node.js, Express, JWT, bcryptjs, Prisma ORM, Zod  
Database: PostgreSQL 
Deployment: Railway via `railway.json`

## Project Structure

```text
backend/
  prisma/
    migrations/
    schema.prisma
    seed.js
  src/
    config/
    controllers/
    middleware/
    routes/
    utils/
    validations/
frontend/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    services/
    utils/
```

## Local Installation

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Configure backend environment:

```bash
cp .env.example .env
```

3. Run Prisma migration and seed:

```bash
npx prisma migrate dev
npm run seed
```

4. Start backend:

```bash
npm run dev
```

5. Install and start frontend in another terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`. Backend runs at `http://localhost:5000`.

## Environment Variables

Backend `.env`:

```env
DATABASE_URL="postgresql://username:password@host:5432/railway"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="7d"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Demo Credentials

All seeded accounts must use the id and password provided 

- Admin: `sriya@gmail.com` Password: Sriya@4321          
- Member:`anshu@gmail.com` Password: Anshu@4321
- Member:`pooja@gmail.com` Password: Pooja@4321


## API Documentation

All protected routes require:

```http
Authorization: Bearer <jwt>
```

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Projects:

- `GET /api/projects`
- `POST /api/projects` Admin
- `PUT /api/projects/:id` Admin
- `DELETE /api/projects/:id` Admin

Tasks:

- `GET /api/tasks?search=&status=&priority=&page=&limit=`
- `POST /api/tasks` Admin
- `PUT /api/tasks/:id` Admin or assigned Member status update
- `DELETE /api/tasks/:id` Admin

Users:

- `GET /api/users` Admin
- `PUT /api/users/profile`

Dashboard:

- `GET /api/dashboard`

## Railway Deployment

The root `railway.json` builds the frontend, generates Prisma Client, and starts the Express server. In Railway, set:

```env
DATABASE_URL=<Railway PostgreSQL URL>
JWT_SECRET=<long-random-secret>
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

After deploy, run migrations and seed from Railway shell if needed:

```bash
cd backend
npx prisma migrate deploy
npm run seed
```

The backend serves `frontend/dist` in production, so one Railway service can host the full app.

DEMO VIDEO
https://drive.google.com/file/d/1o140Zl6qvchjCOpFI9f4ehQquYhSsoDp/view?usp=sharing
