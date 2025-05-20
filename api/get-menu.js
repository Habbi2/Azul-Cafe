// For Vercel serverless functions
const fs = require('fs');
const path = require('path');

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
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Path to the menu file
    const menuFilePath = path.join(process.cwd(), 'data', 'menu.json');
    
    // Check if the file exists
    if (!fs.existsSync(menuFilePath)) {
      return res.status(404).json({ error: 'Menu file not found' });
    }
    
    // Read the menu data
    const menuData = JSON.parse(fs.readFileSync(menuFilePath, 'utf8'));
    
    // Return the menu data
    return res.status(200).json(menuData);
  } catch (error) {
    console.error('Error getting menu:', error);
    return res.status(500).json({ error: 'Error retrieving menu' });
  }
}
