// API Test Script
// Run this in a browser console or with Node.js to test the API endpoints

const API_BASE_URL = 'https://azul-cafe.vercel.app'; // Change this to your deployed URL (remove trailing slash)
// For local testing use:
// const API_BASE_URL = 'http://localhost:3000'; 

async function testHealthEndpoint() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health.js`);
    const data = await response.json();
    console.log('Health endpoint response:', data);
    return data;
  } catch (error) {
    console.error('Health endpoint error:', error);
    return null;
  }
}

async function testGetMenuEndpoint() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/get-menu.js`);
    const data = await response.json();
    console.log('Get menu endpoint response:', data);
    return data;
  } catch (error) {
    console.error('Get menu endpoint error:', error);
    return null;
  }
}

async function testAuthEndpoint(password = 'admin123') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });
    const data = await response.json();
    console.log('Auth endpoint response:', data);
    return data;
  } catch (error) {
    console.error('Auth endpoint error:', error);
    return null;
  }
}

async function testUpdateMenuEndpoint(apiKey, menuData) {
  if (!apiKey) {
    console.error('API key is required for updating menu');
    return null;
  }
  
  if (!menuData) {
    // Get current menu data first
    try {
      const menuResponse = await fetch(`${API_BASE_URL}/api/get-menu.js`);
      menuData = await menuResponse.json();
    } catch (error) {
      console.error('Failed to get menu data:', error);
      return null;
    }
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/update-menu.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(menuData)
    });
    const data = await response.json();
    console.log('Update menu endpoint response:', data);
    return data;
  } catch (error) {
    console.error('Update menu endpoint error:', error);
    return null;
  }
}

// Run all tests
async function runAllTests() {
  console.log('Testing API endpoints...');
  
  await testHealthEndpoint();
  await testGetMenuEndpoint();
  
  const authResult = await testAuthEndpoint();
  if (authResult && authResult.apiKey) {
    await testUpdateMenuEndpoint(authResult.apiKey);
  }
  
  console.log('All tests completed!');
}

// To run all tests, uncomment the line below:
// runAllTests();

// Export functions for Node.js environment
if (typeof module !== 'undefined') {
  module.exports = {
    testHealthEndpoint,
    testGetMenuEndpoint,
    testAuthEndpoint,
    testUpdateMenuEndpoint,
    runAllTests
  };
}
