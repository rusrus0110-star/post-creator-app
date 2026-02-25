# Post Creator App

A React application for creating and managing posts with pagination.

## 🚀 Features

### Create Post

Username field (minimum 1 character, must contain at least one letter)
Post title (3-100 characters)
Post content (10-1000 characters)
Avatar upload (max 5MB, image files only)
Auto-generated avatar based on username if not uploaded

### Post Display

User avatar and username
Post ID and creation date
Post title and full text content
Delete button with confirmation

### Pagination

3 posts per page
Previous/Next navigation
Current page indicator

## 📱 Responsive Design

The application uses relative units (rem, em, %) for full responsiveness:
Desktop - Two-column layout (posts + create form)
Tablet - Adaptive spacing and font sizes
Mobile - Single-column stacked layout

✅ Validation

Username: Required, min 1 character, must contain a letter, max 50 characters
Title: Required, min 3 characters, max 100 characters
Content: Required, min 10 characters, max 1000 characters
Avatar: Image files only, max 5MB
Browser Support
Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)

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

## 📸 Screenshot

![Application Screenshot](./screenshot.png)
