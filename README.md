# Project Description: React Native Mobile Chat App
A chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

## Key Features:
 - Customizable chat screen background
 - Image sharing
 - Location sharing
 - Offline message reading
 - Screen reader compatibility

## Technical Requirements:
 - React Native
 - Expo and ExpoGo App
 - Android Studio
 - Google Firestore Database
 - Firebase Cloud Storage

## Setup Instructions:
 1. Clone the repository:
    
    ```bash
    git clone https://github.com/sabwood/chat-app.git
    cd chat-app
    ```

2. Install dependencies:

   Make sure to have [Node.js v18.20.4 installed](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs). Then run this command in your terminal to install the dependencies in the project folder:

   ```bash
   npm install
   ```

   Then install the Expo CLI as a global dependency (if you haven't already):

   ```bash
   npm install -g expo-cli
   ```

3. Configure Firebase:

   Go to Firebase Console, create a new project, and add a web app. Then, copy your Firebase config credentials. Finally, add them to the "Firebase credentials" section of the "App.js" file:

   ```bash
   const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
   };
   ```
   
5. Run the app locally:

   ```bash
   npm run start
   ```

   Open the ExpoGo app on your mobile device or emulator.
   
   
