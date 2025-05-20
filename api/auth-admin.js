// API handler for admin authentication
const admin_password = process.env.ADMIN_PASSWORD || 'admin123';

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { password } = req.body;
    
    // Validate the password
    if (password === admin_password) {
      return res.status(200).json({ 
        success: true,
        message: 'Authentication successful'
      });
    } else {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid password'
      });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
}
