# Company Registration & Verification — Starter App

This repository contains a minimal implementation of the "Company Registration & Verification" module described in the internship warm-up PDF.

Features included:
- Company registration form (frontend)
- File upload for supporting documents
- Admin dashboard to list companies and verify/reject them
- Backend API (Express + SQLite)
- SQLite DB with `users` and `company_profile` tables

Quick start (local):

1. Backend
   - cd backend
   - npm install
   - npm run init-db   # creates SQLite DB and tables
   - npm start         # starts server on http://localhost:4000

2. Frontend
   - cd frontend
   - npm install
   - npm start         # starts frontend on http://localhost:3000

API endpoints:
- POST /api/companies             -> create company (multipart/form-data)
- GET /api/companies              -> list companies
- GET /api/companies/:id          -> get company details
- PUT /api/companies/:id/verify   -> set company.status = "verified" or "rejected"

Notes:
- Uploaded files are stored in backend/uploads.
- This is a minimal starter; authentication, pagination, advanced validation, and production hardening are left for next steps.
