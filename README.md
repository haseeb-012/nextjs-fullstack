# ShortVids - NextJS Short Video Application
A modern short video sharing application built with Next.js, MongoDB, and ImageKit integration for video processing and storage.
A modern short video sharing application built with Next.js, MongoDB, and ImageKit integration for video processing and storage.

## 🚀 Features

- User authentication with NextAuth
- Short video upload and streaming
- Responsive UI with Tailwind CSS
- Server and client components
- MongoDB database integration
- Protected routes with middleware
- Video player with controls
- Vertical video format optimized for mobile

## 📋 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Media Handling**: ImageKit for short video storage and processing
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🔧 Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/haseeb-012/nextjs-fullstack.git
    cd nextjs-fullstack
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env.local` file in the root directory:

    ```env
    # MongoDB
    MONGODB_URI=your_mongodb_connection_string

    # NextAuth
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret

    # ImageKit
    NEXT_PUBLIC_URI_ENDPOINT=https://your-imagekit-endpoint.imagekit.io
    NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

    Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📂 Project Structure

```
nextjs-fullstack/
├── app/                    # App router directory
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication routes
│   │   └── video/          # Short video API routes
│   ├── compoents/          # Shared components
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── upload/             # Video upload page
│   ├── videos/             # Short video pages
│   └── layout.tsx          # Root layout
├── lib/                    # Utility functions
│   ├── api-client.ts       # API client functions
│   ├── auth.ts             # Auth configuration
│   └── db.ts               # Database connection
├── models/                 # MongoDB schemas
│   ├── User.ts             # User model
│   └── Video.ts            # Short video model
├── public/                 # Static files
└── middleware.ts           # Authentication middleware
```

## 🔒 Authentication

Authentication is handled by NextAuth.js with credentials provider. The authentication flow includes:

1. User registration with email and password
2. Secure password hashing with bcryptjs
3. Login with credentials
4. Protected routes with NextAuth middleware
5. Session management

## 📹 Short Video Upload

Short videos are uploaded to ImageKit through:

1. Client-side file selection
2. Progress tracking during upload
3. Server-side authentication with ImageKit
4. Metadata storage in MongoDB
5. Vertical format (9:16 aspect ratio) optimization

## 🛣️ API Routes

- `/api/auth/[...nextauth]`: Authentication endpoints
- `/api/auth/register`: User registration
- `/api/auth/imagekit-auth`: ImageKit authentication
- `/api/video`: Short video CRUD operations

## 📱 Responsive Design

The UI is fully responsive and works on mobile, tablet, and desktop screens, with a mobile-first approach for optimal short video viewing experience.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

---

Developed with ❤️ by Haseeb