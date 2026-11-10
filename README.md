
# Law Firm Management System

A full-stack MERN law firm management platform designed to manage law firm information, legal professionals, practice areas, client stories, and blog content through an administrative interface.

## Features

- Admin authentication and authorization
- Member account management
- Dynamic law firm information management
- Practice areas and services management
- Lawyer profiles and professional information
- Client stories management
- Dynamic blog creation and editing
- Rich text content editor
- Image and video media management
- Responsive public-facing website

## Tech Stack

**Frontend**
- React.js
- Material UI
- React Router
- Redux Toolkit
- TanStack Query
- React Hook Form
- Zod
- Tiptap

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JWT Authentication

**Media Management**
- Cloudinary
- AWS S3

**Tools**
- Git & GitHub
- Socket.IO (if applicable)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jibran-shah/law-firm-management-system.git
cd law-firm-management-system
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Configure environment variables

Create `.env` files in the required directories.

Refer to `.env.example` files for the required environment variables.

### 4. Run the application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

## Project Structure

```text
law-firm-management-system/
├── backend/
│   ├── src/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

## License & Copyright

Copyright (c) 2026 Jibran Shah.

All Rights Reserved.

This project is provided for viewing and educational purposes only. No permission is granted to copy, modify, distribute, or use this code without prior written permission from the copyright owner.
