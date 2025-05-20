// For Vercel serverless functions
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get credentials from request body
    const { password } = req.body;
      // In a production environment, you would use a secure authentication system
    // and store passwords securely (hashed with salt)
    // This is just for demonstration
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const apiKey = process.env.API_KEY || 'azulcafe-admin-123';
    
    if (password === adminPassword) {
      // In a real application, generate a proper JWT token here
      return res.status(200).json({ 
        success: true, 
        message: 'Autenticación exitosa',
        apiKey: apiKey
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
}
