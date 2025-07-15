require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sneha@220',
  database: 'user_auth'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'snehavanka2006@gmail.com',
    pass: 'xixd tbip yuyp eclr'
  }
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hash],
    (err) => {
      if (err) return res.send('User already exists or error occurred.');
      res.send('Signup successful! <a href="/login.html">Login</a>');
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.send('Invalid email or password');
    const match = await bcrypt.compare(password, results[0].password);
    if (match) res.send('Login successful!');
    else res.send('Incorrect password.');
  });
});



app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 3600000); // 1 hour

  const resetLink = `http://localhost:3000/reset-password.html?token=${token}&email=${email}`;

  
  db.query(
    'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
    [token, expiry, email],
    (err, result) => {
      if (err || result.affectedRows === 0) {
        return res.send('Email not found.');
      }

      
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        html: `
          <p>Hello,</p>
          <p>Click the button below to reset your password:</p>
          <p>
            <a href="${resetLink}" style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            ">Reset Password</a>
          </p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p><a href="${resetLink}">${resetLink}</a></p>
        `
      }, (error, info) => {
        if (error) {
          console.error('Email error:', error);
          return res.send('Failed to send email.');
        }
        res.send('Password reset link sent to your email.');
      });
    }
  );
});



app.post('/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;
  const hash = await bcrypt.hash(newPassword, 10);

  db.query('SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiry > NOW()',
    [email, token], (err, results) => {
      if (err || results.length === 0) return res.send('Invalid or expired link.');

      db.query('UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?',
        [hash, email], (err2) => {
          if (err2) return res.send('Error updating password.');
          res.send('Password reset successful. <a href="/login.html">Login</a>');
        });
    });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000/signup.html'));
