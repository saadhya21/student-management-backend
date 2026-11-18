# Student Management Backend

A beginner-friendly Node.js and Express backend REST API for managing student records using MongoDB and Mongoose.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB database

---

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
   - `PORT`: Server port (default: `5000`)
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `DNS_SERVERS`: *(Optional)* Custom DNS servers (e.g., `8.8.8.8,8.8.4.4`) to resolve SRV records if your network blocks default lookups.

---

## Running the Application

- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```

- **Production / Standard mode:**
  ```bash
  npm start
  ```

---

## API Documentation

**Base URL**: `http://localhost:5000`

### 1. Root Health Check
- **Endpoint**: `GET /`
- **Status**: `200 OK`
- **Response**:
  ```json
  {
    "message": "Student Management API is running"
  }
  ```

### 2. Create Student
- **Endpoint**: `POST /api/students`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "age": 21,
    "course": "Computer Science"
  }
  ```
- **Responses**:
  - `201 Created`: Student created successfully
  - `400 Bad Request`: Missing required fields or age < 1
  - `409 Conflict`: Email already exists
  - `500 Internal Server Error`: Unexpected database/server error

### 3. Get All Students
- **Endpoint**: `GET /api/students`
- **Status**: `200 OK`
- **Response**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 21,
        "course": "Computer Science",
        "createdAt": "2026-11-18T17:00:00.000Z",
        "updatedAt": "2026-11-18T17:00:00.000Z"
      }
    ]
  }
  ```

### 4. Get Student by ID
- **Endpoint**: `GET /api/students/:id`
- **Responses**:
  - `200 OK`: Returns student object
  - `400 Bad Request`: Invalid MongoDB ObjectId format
  - `404 Not Found`: Student does not exist

### 5. Update Student
- **Endpoint**: `PUT /api/students/:id`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Jane Smith",
    "age": 22,
    "course": "Software Engineering"
  }
  ```
- **Responses**:
  - `200 OK`: Student updated successfully
  - `400 Bad Request`: Invalid ObjectId or invalid field values
  - `404 Not Found`: Student does not exist
  - `409 Conflict`: Updated email already taken by another student

### 6. Delete Student
- **Endpoint**: `DELETE /api/students/:id`
- **Responses**:
  - `200 OK`: Student deleted successfully
  - `400 Bad Request`: Invalid MongoDB ObjectId format
  - `404 Not Found`: Student does not exist
