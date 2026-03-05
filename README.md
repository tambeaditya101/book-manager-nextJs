# 📚 Personal Book Manager

A full-stack web application that allows users to manage their personal book collection — track books they want to read, are currently reading, or have completed.

Built using **Next.js, MongoDB, and JWT authentication**.

---

## 🚀 Live Demo

Live URL: https://book-manager-next-js.vercel.app

---

## ✨ Features

- Secure **JWT authentication**
- User **signup / login / logout**
- Personal **book collection dashboard**
- Add new books with title, author, tags, and reading status
- Edit book details
- Delete books
- Filter books by **status** or **tags**
- Dashboard statistics:
  - Total books
  - Want to read
  - Reading
  - Completed
- Responsive and clean UI
- Modal-based book creation

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS

### Backend

- Next.js API Routes
- Node.js

### Database

- MongoDB Atlas

### Authentication

- JWT (stored in HTTP-only cookies)

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

- MONGODB_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- NEXT_PUBLIC_BASE_URL=http://localhost:3000

---

## 📈 Future Improvements

- Pagination for large collections
- Book search functionality
- Drag-and-drop status management
- User profile settings
- Reading progress tracking

---

## 📜 License

This project was built as part of a **technical assignment**.
