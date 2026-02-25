# Post Creator App

A React application for creating and managing posts with pagination.

## 🚀 Features

- ✅ Create posts with title and content
- ✅ View posts with pagination (3 posts per page)
- ✅ Delete posts
- ✅ Form validation with react-hook-form
- ✅ Integration with MockAPI backend
- ✅ Responsive design

## 📦 Installation

```bash
npm install
```

🛠️ Technologies
React
Axios
React Hook Form
CSS Modules
MockAPI
src/
├── assets/images/ # Static resources (logo)
├── components/ # React components
│ ├── header/
│ ├── postList/
│ ├── postItem/
│ ├── createPost/
│ └── pagination/
├── services/ # API integration
└── utils/ # Helper functions
Backend: https://699eb2fe78dda56d396b07da.mockapi.io/posts

📝 Validation Rules
Title: 3-100 characters, required
Content: 10-1000 characters, required
