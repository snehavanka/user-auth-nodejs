# user-auth-nodejs
Node.js authentication system with signup, login, and forgot password via Gmail.
NAME : V . SNEHA 
DOMAIN : WEB DEVELOPMENT 
DURATION : JUNE 2025 TO JULY 2025 
MENTOR : DR . G. RAMAKRISHNA (IIT Tirupati)

->Overview of the user-auth-nodejs
🎯 Objective
To build a secure and efficient authentication system that supports:
- User registration with encrypted passwords
- Login authentication using bcrypt
- Password recovery via email with token verification
- Backend integration with MySQL database
- Email notifications using Gmail SMTP through Nodemailer
3. Features
markdown
Copy
Edit
✨ Features

- User registration (Signup)
- User login with bcrypt password hashing
- Forgot password via Gmail-based email reset
- Password reset token system with expiry
- MySQL database integration
- Frontend pages using basic HTML/CSS

4. Tech Stack

 🛠 Tech Stack

- Node.js
- Express.js
- MySQL
- Nodemailer
- Bcrypt
- dotenv
  
5. Project Setup (How to Run Locally)

 Getting Started

### Step 1: Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
Step 2: Install dependencies
npm install
Step 3: Setup .env file
Create a .env file and add your credentials:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=user_auth

EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
BASE_URL=http://localhost:3000
 Use a Gmail App Password if 2FA is enabled.

Step 4: Setup MySQL Database
Run this SQL in your MySQL server:

CREATE DATABASE IF NOT EXISTS user_auth;
USE user_auth;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  reset_token VARCHAR(64),
  reset_token_expiry DATETIME
);
Step 5: Start the server
node server.js
Step 6: Open in browser
Visit: http://localhost:3000/signup.html


 6. **Folder Structure **
## 📁 Project Structure

project-root/
├── public/
│ ├── signup.html
│ ├── login.html
│ ├── forgot-password.html
│ └── reset-password.html
├── server.js
├── schema.sql
├── .env.example
├── package.json
└── README.md

7. API Endpoints

## 📬 API Endpoints

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | /signup            | Create a new user      |
| POST   | /login             | Login user             |
| POST   | /forgot-password   | Send reset email link  |
| POST   | /reset-password    | Reset the user password |


🔁 How It Works

This system handles **user signup, login, and password reset** using Node.js, Express, MySQL, bcrypt, and Nodemailer.

## 1. User Signup (`/signup`)
- User enters username, email, and password.
- Password is hashed using bcrypt and stored in MySQL.
- Displays “Signup successful” or error if user exists.

## 2. User Login (`/login`)
- User enters email and password.
- Server compares hashed password.
- Displays success or failure message.

## 3. Forgot Password (`/forgot-password`)
- User submits email.
- Server generates a secure token + expiry.
- Sends reset link via Gmail using Nodemailer.

## 4. Reset Password (`/reset-password`)
- User clicks reset link from email.
- Enters new password.
- Server validates token, hashes new password, updates database.

##5. Database (MySQL)
- `users` table includes: id, username, email, hashed password, reset_token, token_expiry.

## 6. Security
- Passwords are hashed with bcrypt.
- Tokens expire in 1 hour.
- `.env` used for Gmail and MySQL credentials.

