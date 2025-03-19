# TadkaAI

Discover the magic of South Asian cuisine with AI. TadkaAI helps you find recipes, identify ingredients, and explore local stores effortlessly.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation Instructions](#installation-instructions)
- [Usage Examples](#usage-examples)
- [API Keys Setup](#api-keys-setup)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview

TadkaAI is a modern web application that leverages artificial intelligence to enhance your South Asian culinary experience. It combines the power of Google's AI services (Vision API and Gemini Pro), Firebase authentication, and various other technologies to provide a seamless experience for recipe generation, ingredient identification, and local store discovery.

## Features

### 🤖 AI-Powered Features
- **Smart Recipe Generator**: Generate personalised South Asian recipes using Google's Gemini Pro AI
- **Ingredient Identification**: Upload images to identify ingredients using Google Cloud Vision API
- **Local Store Finder**: Find nearby stores that stock South Asian ingredients

### 👤 User Features
- **Authentication**: Secure user authentication powered by Firebase
- **Recipe Management**: Save and organise your favorite recipes

### 💻 Technical Features
- **Real-time Updates**: Server-Sent Events (SSE) for live recipe generation
- **Responsive Design**: Mobile-first approach using Bootstrap
- **Secure API Integration**: Protected routes with JWT authentication
- **Cloud Integration**: Google Cloud Services and Firebase integration

## Technology Stack

### Frontend
- **React.js**: UI framework
- **Bootstrap**: Styling and responsive design
- **Material-UI**: Additional UI components
- **Firebase Auth**: User authentication
- **Axios**: HTTP client

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **Firebase Admin**: Backend authentication
- **JWT**: Token-based authentication

### AI & External Services
- **Google Cloud Vision API**: Image recognition
- **Google Gemini Pro**: AI text generation
- **Google Places API**: Store location services
- **Unsplash API**: Image search integration

## Installation Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/TadkaAI.git
   cd TadkaAI
   ```

2. **Install Dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client/tadka-ai
   npm install
   ```

3. **Set Up Environment Variables**
   Create .env files in both server and client directories with the necessary API keys and configuration.

## API Keys Setup

You'll need to set up the following API keys and configurations:

1. **Firebase Configuration**
   - Create a Firebase project
   - Set up Authentication
   - Download service account key

2. **Google Cloud Services**
   - Enable Vision API
   - Enable Places API
   - Create API credentials

3. **Unsplash API**
   - Register for an Unsplash developer account
   - Create an application to get API access key

## Project Structure

```
TadkaAI/
├── client/                # React frontend
│   └── tadka-ai/
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── services/    # API services
│       │   └── assets/      # Static assets
├── server/                # Node.js backend
│   ├── server.js         # Main server file
│   └── uploads/          # File upload directory
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or suggestions, please reach out through:
- Email: yousoufpal7@gmail.com

## Acknowledgements

- Google Cloud Platform for AI services
- Firebase for authentication
- Unsplash for image services