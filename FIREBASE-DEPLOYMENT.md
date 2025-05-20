# Firebase Deployment Guide for Azul Café

This guide will help you deploy the Azul Café menu application using Firebase, replacing the previous Vercel deployment approach.

## Why Firebase?

Firebase offers several advantages for this application:
- Real-time database that automatically syncs data across clients
- Simple authentication system
- Free hosting with custom domain support
- No need for custom API endpoints/serverless functions

## Prerequisites

- Node.js installed on your computer
- A Google account to create a Firebase project

## Step 1: Set Up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the instructions to create a new project
   - Name it "Azul Café" or something similar
   - Enable Google Analytics if you want analytics data
   - Follow the setup wizard to complete project creation

## Step 2: Register Your Web App

1. From the Firebase project dashboard, click the Web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "Azul Café Web")
3. Firebase will generate configuration information. Copy the `firebaseConfig` object

## Step 3: Update Configuration Files

1. Open `js/firebase-config.js` in your code editor
2. Replace the placeholder `firebaseConfig` object with your actual Firebase configuration
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     databaseURL: "https://your-project-id-default-rtdb.firebaseio.com"
   };
   ```

## Step 4: Set Up Firebase Realtime Database

1. In the Firebase console, navigate to "Realtime Database"
2. Click "Create Database"
3. Start in test mode for now (you can adjust security rules later)
4. Select a database location close to your target users

## Step 5: Import Initial Menu Data

1. Install Firebase tools and admin SDK:
   ```
   npm install -g firebase-tools
   npm install firebase-admin
   ```

2. Generate a Service Account Key:
   - In Firebase Console, go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the file as `serviceAccountKey.json` in the project root directory

3. Run the import script:
   ```
   node import-initial-data.js
   ```

4. Verify in the Firebase Console that your data has been imported correctly

## Step 6: Set Up Firebase Hosting

1. Initialize Firebase in your project directory:
   ```
   firebase login
   firebase init
   ```

2. Choose the following options during initialization:
   - Select "Hosting" when prompted for features
   - Select your Firebase project
   - Use "." as your public directory
   - Configure as a single-page app: No
   - Set up automatic GitHub deployments: Your choice

3. Create a firebase.json file if it wasn't created automatically:
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**",
         "api/**",
         "*.md",
         "vercel.json",
         "package.json",
         "import-initial-data.js",
         "serviceAccountKey.json"
       ]
     }
   }
   ```

4. Deploy your application:
   ```
   firebase deploy
   ```

5. Your site will be deployed to a URL like: `https://your-project-id.web.app`

## Step 7: Testing the Deployed Application

1. Visit your deployed URL to verify that the menu displays correctly
2. Go to `/admin.html` and test the admin functionality:
   - Default login password is "admin123" (change this in the admin.js file)
   - Test adding, editing, and removing menu items

## Securing Your Firebase Application

For a production deployment, you should improve security:

1. Update Realtime Database Rules:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": "auth != null"
     }
   }
   ```

2. Change the default admin password in admin.js:
   ```javascript
   // Find this line in admin.js
   const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
   
   // Change it to something secure
   const ADMIN_PASSWORD = 'your-secure-password-here';
   ```

3. Consider adding additional authentication methods in Firebase console:
   - Navigate to Authentication > Sign-in method
   - Enable email/password authentication for more secure login

## Custom Domain Setup (Optional)

1. In Firebase Console, go to Hosting > Add custom domain
2. Follow the steps to verify domain ownership and set up DNS records
3. Wait for DNS propagation (can take up to 24-48 hours)

## Monitoring and Maintenance

- Check Firebase Console regularly to monitor usage
- Set up Firebase alerts for critical events
- Regularly backup your database data using the import/export functionality

## Troubleshooting

If you encounter issues:

1. Check the JavaScript console in your browser for errors
2. Verify that your Firebase configuration in `firebase-config.js` is correct
3. Make sure the database permissions in Firebase allow read and write operations
4. Ensure that all required Firebase SDK scripts are loaded in your HTML

## Comparison with Previous Vercel Deployment

The Firebase deployment offers several advantages over the previous Vercel setup:
- Real-time updates across all clients without refreshing
- Simplified authentication without custom API endpoints
- No need to manage environment variables for storing menu data
- Better offline support and faster initial loading

Note that the API folder is no longer needed, as Firebase handles all data operations directly from the client.
