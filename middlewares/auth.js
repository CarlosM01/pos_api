// middlewares/auth.js
import jwt from 'jsonwebtoken'; // Importamos el paquete completo

const { verify } = jwt; // Desestructuramos el método verify

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};
