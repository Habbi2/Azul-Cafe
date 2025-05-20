// Import initial menu data to Firebase
// Run this script after setting up your Firebase project
// Usage: node import-initial-data.js

const fs = require('fs');
const path = require('path');

// Check if firebase-admin is installed
try {
  require.resolve('firebase-admin');
} catch (e) {
  console.error('Firebase Admin SDK not found. Installing...');
  console.error('Please run: npm install firebase-admin');
  process.exit(1);
}

const admin = require('firebase-admin');

// You need to generate a private key file from Firebase console
// 1. Go to Project Settings > Service Accounts
// 2. Click "Generate New Private Key"
// 3. Save the file as "serviceAccountKey.json" in this directory
let serviceAccount;
try {
  serviceAccount = require('./serviceAccountKey.json');
} catch (e) {
  console.error('serviceAccountKey.json not found.');
  console.error('Please follow these steps:');
  console.error('1. Go to Firebase Console > Project Settings > Service Accounts');
  console.error('2. Click "Generate New Private Key"');
  console.error('3. Save the file as "serviceAccountKey.json" in this directory');
  process.exit(1);
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`
});

// Reference to the database
const db = admin.database();

// Read initial data
const initialDataPath = path.join(__dirname, 'initial-menu-data.json');
let initialData;

try {
  const rawData = fs.readFileSync(initialDataPath);
  initialData = JSON.parse(rawData);
  console.log('Initial data loaded successfully.');
} catch (e) {
  console.error('Error reading initial data:', e);
  process.exit(1);
}

// Import data to Firebase
console.log('Importing data to Firebase...');
db.ref('/').set(initialData)
  .then(() => {
    console.log('Data imported successfully!');
    console.log('You can now access your menu data in Firebase Realtime Database.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error importing data:', error);
    process.exit(1);
  });
