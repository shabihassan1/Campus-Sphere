# Campus Sphere

**Campus Sphere** is a student society engagement platform designed to help university students register, explore, and participate in societies, view upcoming events, and submit feedback. It streamlines campus involvement through a user-friendly web application built with **NestJS** and **Next.js**.


## 🚀 Tech Stack

| Layer         | Technology              |
|---------------|--------------------------|
| **Frontend**  | Next.js + Tailwind CSS   |
| **Backend**   | NestJS (Node.js + TypeScript) |
| **Database**  | PostgreSQL (TypeORM)     |
| **Auth**      | JWT (with HTTP-only cookies) |
| **Testing**   | Jest (NestJS) + React Testing Library |
| **Deployment**| GitHub (local setup ready) |



## 🎯 Sprint 1 Features

- ✅ User Registration and Login
- ✅ Role-based account creation (member, president)
- ✅ Society Listing
- ✅ Join Society request flow
- 🔄 Feedback and Events (coming in Sprint 2)


## 📂 Folder Structure

```
CampusSphere_Sprint1/
├── backend/       # NestJS backend
│   └── src/
│       ├── auth/
│       ├── user/
│       ├── society/
│       ├── membership/
│       └── ...
├── frontend/      # Next.js frontend
│   └── pages/
│       ├── register.tsx
│       ├── login.tsx
│       ├── societies.tsx
│       └── ...
```



## 🧪 Running the Project Locally

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

> Ensure PostgreSQL is running and `DATABASE_URL` is properly set in `.env`.


