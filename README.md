# GVPCWorld Platform

GVPCWorld is a web-based platform designed to connect graduates with potential employers in the tech industry. The application provides a seamless user experience through modern web technologies and intuitive design.

##  Features

- **User Authentication**: Secure login with Google OAuth 2.0
- **Personalized Dashboard**: View and manage your profile and activities
- **Product Browsing**: Explore and search for products
- **Custom PC Builder**: Create and customize your PC
- **Shopping Cart**: Add and manage items in your cart
- **Responsive Design**: Access the platform from any device

## 🛠 Technology Stack

### Frontend
- **React.js**: For building dynamic and responsive user interfaces
- **Material-UI**: For modern and consistent UI components
- **Axios**: For API requests
- **React Router**: For navigation

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **Passport.js**: Authentication middleware
- **JWT**: For secure authentication

## 🏗 Project Structure

```
GVPCWorld-mern/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # Source files
│       ├── Components/     # Reusable UI components
│       ├── pages/          # Page components
│       └── ...
├── server/                 # Backend Node.js application
│   └── server/             # Server code
│       ├── controllers/    # Business logic
│       ├── models/         # Database models
│       ├── routes/         # API routes
│       └── ...
└── ...
```

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google OAuth credentials

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/GVPCWorld-mern.git
cd GVPCWorld-mern
```

2. Install dependencies
```
# Install server dependencies
cd server/server
npm install

# Install client dependencies
cd ../../client
npm install
```

3. Set up environment variables
Create a `.env` file in the server/server directory with the following variables:
```
JWT_SECRET=your_jwt_secret
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
and a mock db json file or your db uri
```

4. Start the development servers
```
# Start the backend server
cd server/server
npm start

# Start the frontend server
cd ../../client
npm run dev # i am using nodemon here 
```

5. Access the application
Open your browser and navigate to `http://localhost:4500` for api and Navigste to port 5173 for frontend

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Contributors

- gouranshvaishnavji #and will always be me only

## 🙏 Acknowledgments

- Google OAuth for authentication
- MongoDB for database
- will be updating the code style to align with test driven development and work on decoupling the logic for testing and using mock data easily
