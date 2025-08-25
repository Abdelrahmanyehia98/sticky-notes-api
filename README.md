# 📝 Sticky Notes API

A RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** that manages **Users** and **Sticky Notes**.  
This project implements authentication with **JWT**, password hashing, phone encryption, and full CRUD operations for notes.  
It was developed as part of Assignment 8.

---

## 🚀 Features
### Users
- Signup with email uniqueness, password hashing, and phone encryption.
- Login with JWT authentication (1-hour expiry).
- Update user profile (except password).
- Delete logged-in user.
- Get logged-in user profile.

### Notes
- Create, update, replace, delete notes (only by the owner).
- Bulk update all notes' titles for a logged-in user.
- Paginated + sorted notes list.
- Search notes by ID or content.
- Delete all notes for the logged-in user.

### Validations
- User age must be between 18 and 60.
- Custom validator for `title`: must **not** be entirely uppercase.

---

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (JSON Web Tokens)**
- **bcryptjs** (password hashing)
- **crypto** (phone encryption)

--
link for postman documention---->https://documenter.getpostman.com/view/39777781/2sB3HetNwy

## 📂 Project Structure

