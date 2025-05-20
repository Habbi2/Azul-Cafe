// Firebase configuration for Azul Café
// HOW TO SET UP YOUR FIREBASE PROJECT:
// 1. Go to https://console.firebase.google.com/
// 2. Click "Add project" and follow the steps to create a new project
// 3. Once created, click "Web" (</>) to add a web app to your project
// 4. Register your app with a nickname like "Azul Café"
// 5. Copy the firebaseConfig object below and replace this placeholder
// 6. Go to "Realtime Database" in the Firebase console and create a database
// 7. Start in test mode for now (you can adjust security rules later)

const firebaseConfig = {
  apiKey: "AIzaSyCthl8kP0coraPamXmOKaoDFjSVvtJJFig",
  authDomain: "azul-cafe.firebaseapp.com",
  projectId: "azul-cafe",
  storageBucket: "azul-cafe.firebasestorage.app",
  messagingSenderId: "923934050668",
  appId: "1:923934050668:web:f66fcca742b7c99ae40b49",
  databaseURL: "https://azul-cafe-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const db = firebase.database();
const auth = firebase.auth();

// Menu data reference
const menuRef = db.ref('menu');

// Export Firebase services to use in other scripts
window.db = db;
window.auth = auth;
window.menuRef = menuRef;
window.auth = auth;
window.menuRef = menuRef;
