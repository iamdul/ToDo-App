
# README

## Project Overview
This project is a full-stack application using Next.js 15 for the frontend and Laravel 11 for the backend. It allows users to:

- Create accounts and log in/logout using JWT authentication.
- Manage a to-do list with CRUD functionality (Create, Read, Update, Delete).

The backend is a Laravel-based API, while the frontend is a Next.js application that communicates with the API.

## Prerequisites

### General Requirements
- **Node.js** (v18+)
- **Composer** (v2+)
- **PHP** (v8.2+)
- **MySQL** 

### Dependencies

#### Frontend (Next.js):
- React

#### Backend (Laravel):
- Laravel Sanctum
- Database migration tools

---

## Setup Instructions

### Backend (Laravel 11)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iamdul/Todo-App.git
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Set up environment variables:**
   - Duplicate the `.env.example` file as `.env`.
   - Update database connection settings (e.g., DB_DATABASE, DB_USERNAME, DB_PASSWORD).
   
4. **Generate the application key:**
   ```bash
   php artisan key:generate
   ```

5. **Run migrations:**
   ```bash
   php artisan migrate
   ```

6. **Run the development server:**
   ```bash
   php artisan serve
   ```
   The server will be available at `http://127.0.0.1:8000`.

---

### Frontend (Next.js 15)

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Duplicate the `.env.local.example` file as `.env.local`.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

---

## How to Use

1. **Create an Account:**
   - Navigate to the registration page on the frontend and provide the required details.
   - The data will be sent to the backend API for validation and storage.

2. **Log in:**
   - Enter your credentials on the login page.
   - Upon successful login, a JWT will be stored in the browser’s local storage.

3. **Manage To-Do List:**
   - Add, view, update, and delete tasks using the to-do list interface.
   - All actions are authorized using the JWT.


---

## Notes

- Ensure that the backend server is running before testing the frontend.
- Use Postman or a similar tool to test API endpoints during development.
- Refer to the respective `package.json` and `composer.json` files for additional dependencies.

## Troubleshooting

- **Frontend not connecting to API:**
  - Verify that the API URL in `.env.local` matches the backend’s URL.

- **Database errors:**
  - Ensure migrations have been run and the database credentials are correct in the `.env` file.

---

## Contribution

Feel free to submit issues or pull requests to improve the project. For major changes, please open an issue first to discuss your ideas.

