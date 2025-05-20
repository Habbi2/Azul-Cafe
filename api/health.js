module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
    res.status(200).json({ 
    status: 'ok',
    message: 'Azul Café API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? 'vercel' : 'local',
    nodeEnv: process.env.NODE_ENV,
    apis: {
      getMenu: '/api/get-menu.js',
      auth: '/api/auth.js',
      updateMenu: '/api/update-menu.js'
    }
  });
}
