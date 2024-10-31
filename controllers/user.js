import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Determinar el rol del nuevo usuario según quién esté logueado
    let role = 'user'; // Por defecto, rol de cliente

    if (req.user && req.user.role === 'admin') {
      role = 'seller'; // Si es un admin quien registra, asignamos rol de vendedor
    }

    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el nuevo usuario
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'Usuario registrado', userId: newUser.id, role: newUser.role });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const profile =  (req, res) => {
  if (req.user){
    res.json({ 
      message: 'Acceso permitido', 
      username: req.user.username,
      role: req.user.role
    });
  }
};