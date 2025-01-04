// middleware/authenticateToken.js
import jwt from 'jsonwebtoken';

const { verify } = jwt;

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    req.user = null; // If there's no token, indicate that no user is logged in
    return next();
  }

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = decoded; // Store the logged-in user in req.user
    next();
  });
};
