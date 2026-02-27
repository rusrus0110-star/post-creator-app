Post Creator App

A React application for user registration and post management with real-time validation and pagination.

🚀 Core Features
User Registration

4–20 character username (unique, async validation)

Email with uniqueness check

Password validation (min 6 chars, uppercase + number)

Age (18–100)

Phone format: +65XXXXXX XX-XX

Required terms agreement with timestamp

Post Management

Only registered users can create posts

Title (3–100 characters)

Content (10–1000 characters)

Optional avatar upload (max 5MB)

Post deletion with confirmation

Pagination

3 posts per page

Previous / Next navigation

🛠 Tech Stack

React

React Hook Form

Axios

CSS Modules

MockAPI

📂 Architecture
src/
├── components/
│ ├── header/
│ ├── postList/
│ ├── postItem/
│ ├── createPost/
│ ├── registrationForm/
│ └── pagination/
├── services/
│ ├── api.js
│ └── userApi.js
├── utils/
│ └── dateFormatter.js
├── App.js
└── index.js
🔗 API

Posts:
https://699eb2fe78dda56d396b07da.mockapi.io/posts

Users:
https://699eb2fe78dda56d396b07da.mockapi.io/users

📌 Key Highlights

Real-time form validation

Async uniqueness checks

Clean modular architecture

Responsive layout

Separation of UI and API layer

## 📸 Screenshot

![Application Screenshot](./screenshot.png)
