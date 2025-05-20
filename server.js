const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// API key for authentication
const API_KEY = process.env.API_KEY || 'azulcafe-admin-123';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Path to the menu data file
const menuFilePath = path.join(__dirname, 'data', 'menu.json');

// Ensure the data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Initialize menu data if file doesn't exist
if (!fs.existsSync(menuFilePath)) {
  const initialMenuData = {
    "categorias": [
      {
        "id": "sin-leche",
        "nombre": "Sin Leche",
        "items": [
          {
            "id": "cafe-1",
            "nombre": "ESPRESSO",
            "descripcion": "",
            "precio": 1.50
          },
          {
            "id": "cafe-2",
            "nombre": "ESPRESSO EN AEROPRESS",
            "descripcion": "",
            "precio": 2.50
          }
          // Add more initial items as needed
        ]
      }
      // Add more categories as needed
    ]
  };
  fs.writeFileSync(menuFilePath, JSON.stringify(initialMenuData, null, 2), 'utf8');
}

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'Azul Café API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Get menu endpoint
app.get('/api/get-menu', (req, res) => {
  try {
    // Read the menu data
    const menuData = JSON.parse(fs.readFileSync(menuFilePath, 'utf8'));
    
    // Return the menu data
    return res.status(200).json(menuData);
  } catch (error) {
    console.error('Error getting menu:', error);
    return res.status(500).json({ error: 'Error retrieving menu' });
  }
});

// Authentication endpoint
app.post('/api/auth', (req, res) => {
  try {
    // Get credentials from request body
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
      return res.status(200).json({ 
        success: true, 
        message: 'Autenticación exitosa',
        apiKey: API_KEY
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales incorrectas' 
      });
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(500).json({ error: 'Error de autenticación' });
  }
});

// Update menu endpoint
app.post('/api/update-menu', (req, res) => {
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
    
    // Write the updated menu to the file
    fs.writeFileSync(menuFilePath, JSON.stringify(menuData, null, 2), 'utf8');
    
    console.log(`Menu updated at ${new Date().toISOString()}`);
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Menú actualizado correctamente',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating menu:', error);
    return res.status(500).json({ error: 'Error al actualizar el menú' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  try {
    // Return diagnostics information
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsage: process.memoryUsage(),
      },
      filesystem: {
        dataFolderExists: fs.existsSync(path.join(__dirname, 'data')),
        menuFileExists: fs.existsSync(menuFilePath),
      },
      env: {
        port: PORT,
        apiKeyConfigured: !!process.env.API_KEY,
        adminPasswordConfigured: !!process.env.ADMIN_PASSWORD,
      }
    };
    
    return res.status(200).json(diagnostics);
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return res.status(500).json({ error: 'Error in test endpoint', details: error.message });
  }
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`View the menu at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin.html`);
});
