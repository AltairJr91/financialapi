const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const [, token] = authHeader.split(" ")
  
  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = { authenticate };