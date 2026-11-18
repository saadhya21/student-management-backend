# Student Management Backend

A beginner-friendly Node.js and Express backend API for managing student records.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   *(On Windows Command Prompt use `copy .env.example .env`)*

   Review the values in `.env`:
   - `PORT`: Server port (default: 5000)
   - `MONGODB_URI`: MongoDB connection string

## Running the Application

- **Production / Standard mode:**
  ```bash
  npm start
  ```

- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```

## Verification

Once running, visit or send a GET request:
```
http://localhost:5000/
```
Expected response:
```json
{
  "message": "Student Management API is running"
}
```
