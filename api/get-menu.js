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
    // Path to the menu file - handle both local development and Vercel deployment
    let menuFilePath;
    
    // First try relative to the function file
    if (process.env.VERCEL) {
      // In Vercel environment, use a hardcoded menu data for now
      // This is a workaround since accessing files might be challenging in serverless
      return res.status(200).json({
        "categorias": [
          {
            "id": "sin-leche",
            "nombre": "Sin Leche",
            "items": [
              {"id": "cafe-1", "nombre": "ESPRESSO", "descripcion": "", "precio": 1.50},
              {"id": "cafe-2", "nombre": "ESPRESSO EN AEROPRESS", "descripcion": "", "precio": 2.50},
              {"id": "cafe-3", "nombre": "LUNGO", "descripcion": "Espresso + agua", "precio": 1.80},
              {"id": "cafe-4", "nombre": "DOPPIO", "descripcion": "Doble espresso", "precio": 2.80},
              {"id": "cafe-5", "nombre": "AMERICANO", "descripcion": "", "precio": 1.80},
              {"id": "cafe-6", "nombre": "FILTRADO", "descripcion": "Café de filtro (250 g) orgánico", "precio": 2.50}
            ]
          },
          {
            "id": "con-leche",
            "nombre": "Con Leche",
            "items": [
              {"id": "conleche-1", "nombre": "CORTADO", "descripcion": "", "precio": 1.80},
              {"id": "conleche-2", "nombre": "MACCHIATO", "descripcion": "Espresso + espuma de leche", "precio": 1.90},
              {"id": "conleche-3", "nombre": "CAPPUCCINO", "descripcion": "Espresso + leche", "precio": 2.80}
            ]
          },
          {
            "id": "para-picar",
            "nombre": "Para Picar",
            "items": [
              {"id": "picar-1", "nombre": "MEDIALUNAS", "descripcion": "", "precio": 1.80},
              {"id": "picar-2", "nombre": "MEDIALUNAS RELLENAS", "descripcion": "Jamón york y queso", "precio": 2.50},
              {"id": "picar-3", "nombre": "CINNAMON ROLL", "descripcion": "", "precio": 2.80}
            ]
          }
        ]
      });
    } else {
      // In local development
      menuFilePath = path.join(process.cwd(), 'data', 'menu.json');
      
      // Check if the file exists
      if (!fs.existsSync(menuFilePath)) {
        return res.status(404).json({ error: 'Menu file not found' });
      }
      
      // Read the menu data
      const menuData = JSON.parse(fs.readFileSync(menuFilePath, 'utf8'));
      
      // Return the menu data
      return res.status(200).json(menuData);
    }
  } catch (error) {
    console.error('Error getting menu:', error);
    return res.status(500).json({ error: 'Error retrieving menu' });
  }
}
