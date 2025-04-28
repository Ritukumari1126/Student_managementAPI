📚 Student Management API
A simple and scalable Student Management System API built with Node.js, Express.js, MongoDB (via Mongoose), and custom middleware.
This API allows you to perform CRUD operations on student data.

✨ Features
Create, Read, Update, and Delete (CRUD) students.

Properly structured project using routes, controllers, and middleware.

MongoDB database integration using Mongoose.

Error handling middleware.

Validation middleware for student data.

Organized and scalable codebase.

🛠 Technologies Used
Node.js

Express.js

MongoDB + Mongoose

Body-parser (optional if not using built-in express.json)

dotenv (for environment variables)

Custom Middlewares

Project structure : 


student-management-api/
│
├── config/
│   └── db.js          # Database connection file
│
├── controllers/
│   └── studentController.js   # Logic for handling requests
│
├── middleware/
│   ├── errorMiddleware.js     # Error handling
│   └── validateMiddleware.js  # Request validation
│
├── models/
│   └── studentModel.js        # Mongoose schema/model
│
├── routes/
│   └── studentRoutes.js       # API Routes
│
├── .env               # Environment variables
├── server.js          # Entry point of the application
├── package.json
└── README.md          # Project documentation
