# 📚 Personal Notes & Bookmark Manager (MERN Stack)

A full-stack application that allows users to manage personal **notes** and **bookmarks** with features like tagging, search, filtering, favorites, and inline editing via modals.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Context, React Toastify, MUI (Modals)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT-based user authentication

---

## 🔧 Project Setup

### 🔙 Backend Setup

cd backend
npm install

🔑 Create .env file

PORT=8000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

▶️ Start Backend Server

npm start
Runs on http://localhost:8000

🖼️ Frontend Setup

cd frontend
npm install

▶️ Start Frontend Server

npm start
Runs on http://localhost:3000

📖 Features

✅ Create, edit, delete Notes & Bookmarks

✅ Add tags (comma-separated)

✅ Search by content and title

✅ Filter by tags

✅ Toggle favorites ⭐

✅ Responsive UI using Tailwind CSS

✅ Edit in modal popup (no page reload)

🔌 API Documentation

🔐 Auth Routes

Method	Endpoint	Description
POST	/api/v1/register	Register new user
POST	/api/v1/login	Login & get JWT token

📝 Notes Routes

Method	Endpoint	Description
POST	/api/v1/notes	Create a new note
GET	/api/v1/notes	Get all notes and Get Filtered Notes
PUT	/api/v1/notes/favorite/:id	Toggle favorite status
PUT	/api/v1/notes/:id	Update a note
DELETE	/api/v1/notes/:id	Delete a note
GET	/api/v1/notes/favorite	Get all favorite notes
GET	/api/v1/notes/:id	Get single note


Query Parameters:

?q=search_text → Search notes by text

?tags=tag1,tag2 → Filter notes by tags

🔖 Bookmark Routes

Method	Endpoint	Description
POST	/api/v1/bookmarks	Create a new bookmark
GET	/api/v1/bookmarks	Get all bookmarks
PUT	/api/v1/bookmarks/favorite/:id	Toggle favorite status
PUT	/api/v1/bookmarks/:id	Update bookmark
DELETE	/api/v1/bookmarks/:id	Delete a bookmark
GET	/api/v1/bookmarks/favorite	Get favorite bookmarks
GET	/api/v1/bookmarks/:id	Get single bookmark

Query Parameters:

?q=search_text → Search bookmarks by title/description

?tags=tag1,tag2 → Filter bookmarks by tags

🧪 Sample cURL Requests

🔐 Login

curl -X POST http://localhost:8000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"yash@gmail.com", "password":"123456789"}'

📝 Create Note

curl -X POST http://localhost:8000/api/v1/notes \
  -H "Authorization: <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"This is a note.","tags":["tag1","tag2"]}'

🔖 Toggle Favorite Bookmark

curl -X PUT http://localhost:8000/api/v1/bookmarks/favorite/<id> \
  -H "Authorization: <your_token>"


🧠 Skills Demonstrated

RESTful API design

JWT Authentication

Search & Filter with Mongoose

React hooks, context, and state management

Modal-based editing with MUI

Responsive Tailwind UI

Clean, modular backend architecture

👨‍💻 Author

Developed with ❤️ by Yash Patel
Feel free to contribute or raise issues!


---

Let me know if you'd like:
- Your name or GitHub link added
- A hosted demo link section
- Example screenshots section for visual preview

