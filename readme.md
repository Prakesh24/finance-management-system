# MERN-Finance-management-system

This project is a simple application that allows users to perform Create, Read, Update, and Delete (CRUD) operations on a user database. The application uses the MERN stack (MongoDB, Express.js, React.js, and Node.js).
#Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#Running-the-Application)
- [API Endpoints](#API-Endpoints)
- [Technologies Used](#Technologies-Used)
- [Contributing](#Contributing)

# Features

- User authentication with JWT
- Createm,Read, Update, and Delete operations on users
- Token-based protected routes
- Simple and clean user interface

# Requirements

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) installed
- [MongoDB](https://www.mongodb.com/) installed and running
- [Git](https://git-scm.com/) installed

# Installation

### Clone the Repository

```bash
git clone https://github.com/Prakesh24/finance-management-system.git
cd finance-management-mern
```

### Set up the Backend

```bash
cd server
npm install
```

### Set up the Frontend

```bash
cd ./frontend
npm install
```

### Environment Variables

Create a .env file in the backend directory and add the following:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

# Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start on http://localhost:5000.

### Start the Frontend Server

```bash
cd ../frontend
npm start
```

The frontend server will start on http://localhost:3000.

## API Endpoints

- **POST /api/user/login**: Log in a user and receive a token.
- **GET /api/user/mee**: Get the currently logged-in user.
- **GET /api/user**: Get all users (admin only).
- **GET /api/user/:id**: Get a user by ID.
- **POST /api/user**: Create a new user.
- **PUT /api/user/edit/:id**: Update a user by ID.
- **DELETE /api/user/:id**: Delete a user by ID.

## Technologies Used

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js, Mongoose, JWT
- **Database**: MongoDB

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.
