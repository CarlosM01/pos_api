// middleware/authenticateToken.js
import jwt from 'jsonwebtoken';

const { verify } = jwt;

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    req.user = null; // Si no hay token, indicamos que no hay usuario logueado
    return next();
  }

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.user = decoded; // Guardamos el usuario logueado en req.user
    next();
  });
};
