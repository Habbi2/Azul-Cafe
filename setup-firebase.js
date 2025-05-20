// Firebase Setup Script
// Run this after creating your Firebase project
// Helps you set up Firebase for Azul Café

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\x1b[36m%s\x1b[0m', '===== Azul Café Firebase Setup =====');
console.log('This script will help you set up Firebase for your Azul Café project.');
console.log('Make sure you have already created a Firebase project at https://console.firebase.google.com/\n');

// Step 1: Collect Firebase configuration
console.log('\x1b[33m%s\x1b[0m', 'STEP 1: Enter your Firebase configuration');
console.log('You can find this in your Firebase project settings > Your apps > Firebase SDK snippet > Config\n');

const config = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  databaseURL: ''
};

function askForConfig(key, callback) {
  const keyLabel = key.replace(/([A-Z])/g, ' $1').toLowerCase();
  
  rl.question(`Enter your Firebase ${keyLabel}: `, (answer) => {
    config[key] = answer.trim();
    callback();
  });
}

// Chain the questions
function askForApiKey() {
  askForConfig('apiKey', askForAuthDomain);
}

function askForAuthDomain() {
  askForConfig('authDomain', askForProjectId);
}

function askForProjectId() {
  askForConfig('projectId', askForStorageBucket);
}

function askForStorageBucket() {
  askForConfig('storageBucket', askForMessagingSenderId);
}

function askForMessagingSenderId() {
  askForConfig('messagingSenderId', askForAppId);
}

function askForAppId() {
  askForConfig('appId', askForDatabaseURL);
}

function askForDatabaseURL() {
  askForConfig('databaseURL', updateConfigFile);
}

// Update the firebase-config.js file
function updateConfigFile() {
  console.log('\n\x1b[33m%s\x1b[0m', 'STEP 2: Updating firebase-config.js file');
  
  const firebaseConfigPath = path.join(__dirname, 'js', 'firebase-config.js');
  let configContent = fs.readFileSync(firebaseConfigPath, 'utf8');
  
  // Replace the placeholder config with the actual one
  const configString = JSON.stringify(config, null, 2);
  const updatedContent = configContent.replace(
    /const firebaseConfig = \{[^}]*\};/s,
    `const firebaseConfig = ${configString};`
  );
  
  fs.writeFileSync(firebaseConfigPath, updatedContent);
  console.log('\x1b[32m%s\x1b[0m', 'Firebase configuration updated successfully!\n');
  
  // Ask about admin password
  updateAdminPassword();
}

// Update the admin password
function updateAdminPassword() {
  console.log('\x1b[33m%s\x1b[0m', 'STEP 3: Set your admin password');
  
  rl.question('Enter a secure admin password (default is "admin123"): ', (password) => {
    const adminJsPath = path.join(__dirname, 'js', 'admin.js');
    let adminJsContent = fs.readFileSync(adminJsPath, 'utf8');
    
    if (password && password.trim() !== '') {
      // Replace the default admin password with the new one
      adminJsContent = adminJsContent.replace(
        /const ADMIN_PASSWORD = ['"]admin123['"];/,
        `const ADMIN_PASSWORD = '${password.trim()}';`
      );
      
      fs.writeFileSync(adminJsPath, adminJsContent);
      console.log('\x1b[32m%s\x1b[0m', 'Admin password updated successfully!\n');
    } else {
      console.log('\x1b[33m%s\x1b[0m', 'Using default password "admin123" (not recommended for production)\n');
    }
    
    checkFirebaseCLI();
  });
}

// Check if Firebase CLI is installed
function checkFirebaseCLI() {
  console.log('\x1b[33m%s\x1b[0m', 'STEP 4: Checking Firebase CLI installation');
  
  exec('firebase --version', (error) => {
    if (error) {
      console.log('\x1b[31m%s\x1b[0m', 'Firebase CLI not found. You need to install it to continue.');
      console.log('Run: npm install -g firebase-tools');
      console.log('Then log in with: firebase login');
      
      finalInstructions(false);
    } else {
      console.log('\x1b[32m%s\x1b[0m', 'Firebase CLI is installed!\n');
      initializeFirebase();
    }
  });
}

// Initialize Firebase project
function initializeFirebase() {
  console.log('\x1b[33m%s\x1b[0m', 'STEP 5: Do you want to initialize Firebase in this directory?');
  console.log('This will create firebase.json and .firebaserc files');
  
  rl.question('Initialize Firebase now? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log('\nRunning firebase init...');
      console.log('Please select "Hosting" and "Realtime Database" when prompted');
      console.log('For the public directory, enter "."');
      console.log('For database rules, use the provided database.rules.json file\n');
      
      // Execute firebase init in a new terminal window
      const command = process.platform === 'win32' 
        ? 'start cmd /k firebase init' 
        : 'firebase init';
      
      exec(command, (error) => {
        if (error) {
          console.log('\x1b[31m%s\x1b[0m', 'Error running firebase init:', error);
        }
        
        finalInstructions(true);
      });
    } else {
      finalInstructions(false);
    }
  });
}

// Show final instructions
function finalInstructions(initialized) {
  console.log('\n\x1b[36m%s\x1b[0m', '===== Setup Complete =====');
  console.log('Your Firebase configuration has been updated in firebase-config.js');
  
  if (!initialized) {
    console.log('\nTo complete the setup:');
    console.log('1. Install Firebase CLI: npm install -g firebase-tools');
    console.log('2. Log in to Firebase: firebase login');
    console.log('3. Initialize Firebase: firebase init');
    console.log('   - Select "Hosting" and "Realtime Database"');
    console.log('   - Use "." as your public directory');
  }
  
  console.log('\nTo deploy your application:');
  console.log('1. Make sure you\'ve initialized your Firebase project');
  console.log('2. Run: firebase deploy');
  console.log('\nTo import the initial menu data:');
  console.log('1. Follow the instructions in FIREBASE-DEPLOYMENT.md to generate a Service Account Key');
  console.log('2. Run: node import-initial-data.js');
  
  console.log('\nRefer to FIREBASE-DEPLOYMENT.md for detailed instructions.');
  
  rl.close();
}

// Start the setup process
askForApiKey();
