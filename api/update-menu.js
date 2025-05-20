// For Vercel serverless functions
const fs = require('fs');
const path = require('path');

// Use environment variable if available, fallback to hardcoded value
// In production, set this via Vercel environment variables
const API_KEY = process.env.API_KEY || 'azulcafe-admin-123'; 

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for API key in headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.replace('Bearer ', '') !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get the updated menu data from request body
    const menuData = req.body;
    
    // Validate the data
    if (!menuData || !menuData.categorias) {
      return res.status(400).json({ error: 'Datos de menú inválidos' });
    }
    
    // Path to the menu file
    const menuFilePath = path.join(process.cwd(), 'data', 'menu.json');
    
    // Write the updated menu to the file
    fs.writeFileSync(menuFilePath, JSON.stringify(menuData, null, 2), 'utf8');
    
    // Return success response
    return res.status(200).json({ success: true, message: 'Menú actualizado correctamente' });
  } catch (error) {
    console.error('Error updating menu:', error);
    return res.status(500).json({ error: 'Error al actualizar el menú' });
  }
}
