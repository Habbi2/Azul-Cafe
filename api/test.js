// For Vercel serverless functions

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Return diagnostics information
    return res.status(200).json({
      message: 'API Test Endpoint',
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL ? 'vercel' : 'local',
      nodeEnv: process.env.NODE_ENV || 'development',
      endpoints: {
        health: '/api/health',
        getMenu: '/api/get-menu',
        auth: '/api/auth',
        updateMenu: '/api/update-menu'
      },
      note: 'For API testing, use the /api-test.html page or /js/api-test.js script'
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
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
    testGetMenuEndpoint,
    testAuthEndpoint,
    testUpdateMenuEndpoint,
    runAllTests
  };
}
